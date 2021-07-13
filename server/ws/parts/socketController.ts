// eslint-disable-next-line max-classes-per-file
import { IMessage } from '@imaginarium/packages/interfaces';
import { CLIENT_EVENTS, COMMANDS } from '@imaginarium/packages/constants';
import { Client, RoomControllersPull } from '../../types';
import { Player } from '../../queries';
import { RoomController, TRoomController } from './roomController';

export class SocketController {
  private room_id: number | null;

  private user_id: number | null;

  private player_id: number | null;

  private game_master: boolean;

  private current_party: null | TRoomController;

  private roomsMap: RoomControllersPull;

  private readonly client: Client;

  private readonly wss: any;

  private readonly app: any;

  private readonly db: any;

  constructor(app: any, db: any, ws: Client, wss: any, roomsMap: RoomControllersPull) {
    this.app = app;
    this.db = db;
    this.wss = wss;
    this.client = ws;
    this.roomsMap = roomsMap;

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
          const { app, db, wss, user_id } = this.extract();
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

          this.current_party = this.roomsMap.get(room_id) || null;

          if (this.current_party === null) {
            // create controller, if room is empty or just created
            this.roomsMap.set(room_id, new RoomController(app, db, wss, room_id, this.roomsMap));
            this.current_party = this.roomsMap.get(room_id) || null;
          }

          this.current_party?.addPlayer(this.client);
        } catch (error) {
          console.log(error);
          // TODO send alert to re-create party;
        }
        break;
      }
      case CLIENT_EVENTS.LEAVE: {
        await this.current_party?.playerLeave(this.player_id as number);
        this.room_id = null;
        this.player_id = null;
        break;
      }
      case CLIENT_EVENTS.START_NEW_ROUND: {
        await this.current_party?.newRound();
        break;
      }
      case CLIENT_EVENTS.SEND_MESSAGE: {
        this.current_party?.sendMessage(message.payload);
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
      wss: this.wss,
      room_id: this.room_id as number,
      user_id: this.user_id as number,
      player_id: this.player_id as number,
    };
  }
}
