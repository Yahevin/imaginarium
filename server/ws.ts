import {DB_card, DB_guess, DB_user_room, IMessage} from "@my-app/interfaces";
import {COMMANDS} from "@my-app/commands";
import {EVENTS} from "@my-app/client-events";

const User = require('./helpers/User');
const Party = require('./helpers/Party');
const Score = require('./helpers/Score');
const Guess = require('./helpers/Guess');
const Table = require('./helpers/Table');
const Cards = require('./helpers/Cards');
const Basket = require('./helpers/Basket');
const gameStatus = require('./mixins/gameStatus');


class SocketClient {
    room_id: number | null;
    user_id: number | null;
    player_id: number | null;
}

module.exports = class SocketController extends SocketClient{
    private readonly app: any;
    private readonly wss: any;
    private readonly db: any;

    constructor(app: any, db: any, wss: any) {
        super();
        this.app = app;
        this.db = db;
        this.wss = wss;
        this.user_id = null;
        this.room_id = null;
        this.player_id = null;
    }

    async reduce(message: IMessage) {
        switch (message.type) {
            case EVENTS.AUTH: {
                this.user_id = parseInt(message.payload);
                break;
            }
            case EVENTS.JOIN: {
                try {
                    const room_id = parseInt(message.payload);
                    this.room_id = room_id;
                    this.player_id = await User.getPlayerId(this.app, this.db, this.user_id, room_id);
                } catch (error) {
                    console.log(error);
                    // TODO send alert to re-auth;
                }

                this.makeUpdateParty();
                break;
            }
            case EVENTS.LEAVE: {
                this.room_id = null;
                this.player_id = null;

                this.makeUpdateParty();
                break;
            }
            case EVENTS.PUT_THE_ORIGIN: {
                this.sendToMyRoom(COMMANDS.UPDATE_QUESTION, message.payload);
                break;
            }
            case EVENTS.PUT_THE_FAKE: {
                this.maybeStartToGuess();
                break;
            }
            case EVENTS.MAKE_GUESS: {
                this.maybeCountResults();
                break;
            }
            case EVENTS.START_NEW_ROUND: {
                this.newRound();
                break;
            }
            default: {
                return;
            }
        }
    }

    sendToMyRoom(type: COMMANDS, payload?:any) {
        const command = JSON.stringify({type, payload});

        this.wss.clients.forEach((ws:any) => {
            if (ws.controller.room_id === this.room_id) {
                ws.send(command);
            }
        })
    }

    async terminate() {
        if (this.room_id !== null) {
            try {
                await Party.playerLeave(this.app, this.db, this.player_id);

                const new_count = await Party.getPlayersCount(this.app, this.db, this.room_id);

                await Party.countUpdate(this.app, this.db, this.room_id, new_count);
                await this.maybeStartToGuess();
                this.makeUpdateParty();
            } catch (error) {
                console.log(error);
            }
        }
    }

    async makeUpdateParty() {
        await this.checkGameMaster();
        this.sendToMyRoom(COMMANDS.UPDATE_PARTY);
    }

    async checkGameMaster() {
        console.log('checkGameMaster()');
        try {
            const active_players: DB_user_room[] = await Party.getActivePlayersList(this.app, this.db, this.room_id);
            if (active_players.length < 3) return;
            // Players count is enough

            const gm_player = active_players.findIndex((item) => {
                return item.game_master;
            });
            if (gm_player !== -1) return;
            // Game master is not active player

            const new_gm_player_id = active_players[0].id;

            await Party.demoteGM(this.app, this.db, this.room_id);
            await User.setGM(this.app, this.db, new_gm_player_id);

            this.wss.clients.forEach(({controller, send}: {controller: SocketClient, send:(arg:string)=>void}) => {
                if (controller.player_id === active_players[0].id) {
                    send('UPDATE_ROLE');
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    async maybeStartToGuess() {
        console.log('maybeStartToGuess()');
        try {
            const game_action = await Party.getStatus(this.app, this.db, this.room_id);
            if (game_action !== gameStatus.gmCardSet) return;

            const players_count = await Party.getPlayersCount(this.app, this.db, this.room_id);
            const basket_id = await Basket.getSelf(this.app, this.db, this.room_id);
            const table_cards = await Table.getCardsList(this.app, this.db, basket_id);

            if (parseInt(players_count) === parseInt(table_cards.length)) {
                console.log('set status! ', gameStatus.allCardSet);

                await Party.setStatus(this.app, this.db, this.room_id, gameStatus.allCardSet);

                this.sendToMyRoom(COMMANDS.START_GUESS);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async maybeCountResults() {
        console.log('maybeCountResults()');
        try {
            const users_id_list = await Party.getActivePlayersIdList(this.app, this.db, this.room_id);
            const users_voted = await Guess.getVoteList(this.app, this.db, users_id_list);
            const voted_count = users_voted.length;
            const user_count = users_id_list.length;
            const last_vote = voted_count === (user_count - 1);

            if (last_vote) {
                await Party.setStatus(this.app, this.db, this.room_id, gameStatus.allGuessDone);
                console.log('set status! ', gameStatus.allGuessDone);
                await this.countResults();
                this.sendToMyRoom(COMMANDS.SHOW_SCORE);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async countResults() {
        console.log('countResults');
        try {
            const players_list: DB_user_room[] = await Party.getActivePlayersList(this.app, this.db, this.room_id);
            const players_id_list = players_list.map((player) => {
                return player.id;
            });
            const marks: DB_guess[] = await Guess.getVoteList(this.app, this.db, players_id_list);
            const table_cards: DB_card[] = await Table.getPlayersCards(this.app, this.db, players_id_list);
            const max = marks.length;

            const rewards = table_cards.map((card) => {
                let score = 0;
                marks.forEach((mark) => {
                    if (card.hasOwnProperty('id') && card.id === mark.card_id) {
                        score++;
                    }
                });
                if (card.hasOwnProperty('is_main') && card.is_main) {
                    score = score === 0 || score === max
                        ? score = -3
                        : score += 3;
                }
                return {
                    player_id: card.player_id,
                    score: score,
                };
            });

            rewards.forEach((reward) => {
                players_list.forEach((player) => {
                    if (player.id === reward.player_id) {
                        reward.score = +player.score + reward.score;
                    }
                });
            });

            console.log('updated rewards', rewards);

            await Score.updateLocal(this.app, this.db, this.room_id, rewards);
        } catch (error) {
            console.log(error);
        }
    }

    async newRound() {
        console.log('newRound()');
        try {
            await this.changeGM();

            const basket_id = await Basket.getSelf(this.app, this.db, this.room_id);

            await Guess.clearGuess(this.app, this.db, basket_id);
            await Guess.clearQuestion(this.app, this.db, this.room_id);
            await Cards.moveToBasket(this.app, this.db, basket_id);
            await Party.setStatus(this.app, this.db, this.room_id, gameStatus.start);

            this.sendToMyRoom(COMMANDS.UPDATE_ALL);
        } catch (error) {
            console.log(error);
        }
    }

    async changeGM() {
        try {
            const players_id_list: number[] = await Party.getActivePlayersIdList(this.app, this.db, this.room_id);
            const gm_id: number = await User.findGM(this.app, this.db, this.room_id);
            const new_gm_id: number = findNewGM(players_id_list, gm_id);

            await User.demoteGM(this.app, this.db, gm_id);
            await User.setGM(this.app, this.db, new_gm_id);
        } catch (error) {
            console.log(error);
        }
    }
};

function findNewGM(id_list: number[], gm_id: number) {
    let current = 0;
    id_list.forEach((item, index) => {
        if (item === gm_id) {
            current = index;
        }
    });
    if (current < (id_list.length - 1)) {
        return id_list[current + 1];
    } else {
        return id_list[0];
    }
}
