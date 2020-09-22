const Party = require('../helpers/Party');


module.exports = function (app, db) {
  app.post('/get-action', async (req, res) => {
    try {
      const room_id = req.body.room_id;
      const game_action = await Party.getStatus(app, db, room_id);

      res.json({
        success: true,
        game_action
      });
    } catch (error) {

      return res.json({
        success: false,
        error: error,
      });
    }
  })
};
