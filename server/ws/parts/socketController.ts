// eslint-disable-next-line max-classes-per-file
import { IMessage } from '@my-app/interfaces';
import { CLIENT_EVENTS, COMMANDS } from '@my-app/constants';
import { Client, RoomControllersPull } from '../../types';
import { Player } from '../../queries';
import { TRoomController } from './roomController';

export class SocketController {
  private room_id: number | null;

  private user_id: number | null;

  private player_id: number | null;

  private game_master: boolean;

  private current_party: null | TRoomController;

  private rooms: RoomControllersPull;

  private readonly client: any;

  private readonly wss: any;

  private readonly app: any;

  private readonly db: any;

  constructor(app: any, db: any, ws: Client, wss: any, roomsMap: RoomControllersPull) {
    this.app = app;
    this.db = db;
    this.wss = wss;
    this.client = ws;
    this.rooms = roomsMap;

    this.user_id = null;
    this.room_id = null;
    this.player_id = null;
    this.game_master = false;
    this.current_party = null;
  }

  async reduce(message: IMessage) {
    // eslint-disable-next-line default-case
    switch (message.type) {
      case CLIENT_EVENTS.AUTH: {
        this.user_id = parseInt(message.payload);
        break;
      }
      case CLIENT_EVENTS.JOIN: {
        try {
          const { app, db, user_id } = this.extract();
          const room_id = parseInt(message.payload);
          const player = await Player.get({
            app,
            db,
            room_id,
            user_id,
            by: 'room',
          });
          this.room_id = room_id;
          this.player_id = player.id;
          this.game_master = player.game_master;

          this.current_party?.addPlayer(this.client);
        } catch (error) {
          console.log(error);
          // TODO send alert to re-auth;
        }
        break;
      }
      case CLIENT_EVENTS.LEAVE: {
        await this.current_party?.playerLeave(this.player_id as number);
        this.room_id = null;
        this.player_id = null;
        break;
      }
      case CLIENT_EVENTS.PUT_THE_ORIGIN: {
        this.current_party?.send(COMMANDS.UPDATE_QUESTION, message.payload);
        break;
      }
      case CLIENT_EVENTS.PUT_THE_FAKE: {
        await this.current_party?.maybeStartToGuess();
        break;
      }
      case CLIENT_EVENTS.MAKE_GUESS: {
        await this.current_party?.maybeCountResults();
        break;
      }
      case CLIENT_EVENTS.START_NEW_ROUND: {
        await this.current_party?.removeNewRoundTimeout();
        await this.current_party?.newRound();
        break;
      }
    }
  }

  async terminate() {
    if (this.room_id !== null) {
      try {
        await this.current_party?.playerLeave(this.player_id as number);
        await this.current_party?.maybeStartToGuess();
        await this.current_party?.maybeCountResults();
      } catch (error) {
        console.log(error);
      }
    }
  }

  extract() {
    return {
      app: this.app,
      db: this.db,
      room_id: this.room_id as number,
      user_id: this.user_id as number,
      player_id: this.player_id as number,
    };
  }
}
