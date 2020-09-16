const Party = require('../helpers/Party');
const User = require('../helpers/User');

module.exports = function (app, db) {
  app.post('/get-players', async function (req, res) {
    try {
      const room_id = req.body.room_id;

      const playersList = await Party.getPlayersList(app, db, room_id);
      const usersIdList = await Party.getUsersIdList(app, db, room_id);
      const usersList   = await User.getList(app, db, usersIdList);


      const List = playersList.map((player) => {

        const userIndex = usersList.findIndex((user)=>{
          return user.id === player.user_id;
        });
        if (userIndex < 0) {
           throw ({desc: 'One in users not found'});
        }
        const user = usersList[userIndex];

        return {
          score: player.score,
          nick_name: user.nick_name,
          experience: user.experience,
          game_master: player.game_master
        }
      });

      return res.json({
        success: true,
        List
      })
    } catch (error) {
      return res.json({
        success: false,
        error: error,
      });
    }
  });
};
