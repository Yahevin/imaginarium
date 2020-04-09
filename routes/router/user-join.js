const Party = require('../models/Party');
const User = require('../models/User');

module.exports = function(app, db) {
app.post('/user-join', async function(req, res) {
	let roomId = req.body.roomId,
		nickName = req.body.nickName;

  try {
    const roomExist   =   await Party.exist(app, db, roomId);

    if(roomExist) {
      const players   =   await Party.getUsersIdList (app, db, roomId);
      const newCount  =   await Party.getPlayersCount (app, db, roomId) + 1;
      const user      =   await User.find (app, db, nickName);

      if(user.exist) {
        if(!players.includes(user.data.id)) {
          // note the player to user__room table
          // if he at first time enter to this room
          await Party.addPlayer(app, db, roomId, user.data.id);
        }
      } else {
        //  player create
        const user_id = await User.create(app, db, nickName);
        await Party.addPlayer(app, db, roomId, user_id);
      }

      await Party.countUpdate(app, db, newCount, roomId);

      return res.json({
        success: true,
      })
    } else {
      return res.json({
        success: false,
        error: 'Room not exist',
      })
    }
  }
  catch(error) {
    return res.json({
      success: false,
      error: error,
    });
  }
});
};
