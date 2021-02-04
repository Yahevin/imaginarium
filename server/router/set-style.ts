import { TResponseFunc } from '@my-app/types';
import { Player } from '../helpers/Player';

module.exports = (app: any, db: any) => {
  app.post('/set-style', async (req: any, res: TResponseFunc<unknown>) => {
    const style = req.body.player_style;
    const { user_id } = req.body;
    const { room_id } = req.body;

    try {
      const { id: player_id } = await Player.get({ app, db, user_id, room_id, by: 'room' });
      const style_set = await Player.setStyle({ app, db, style, player_id });

      return res.json({ success: style_set.success });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
