const Party = require('../helpers/Party');
const User = require('../helpers/User');

module.exports = function(app, db) {
app.post('/user-join', async function(req, res) {
	let room_id = req.body.room_id,
		  nick_name = req.body.nick_name;

  try {
    const roomExist   =   await Party.exist(app, db, room_id);

    if(roomExist) {
      const players   =   await Party.getUsersIdList (app, db, room_id);
      const newCount  =   await Party.getPlayersCount (app, db, room_id) + 1;
      const user      =   await User.find (app, db, nick_name);

      if(user.exist) {
        if(!players.includes(user.data.id)) {
          // note the player to user__room table
          // if he at first time enter to this room
          await Party.addPlayer(app, db, room_id, user.data.id);
        }
      } else {
        //  player create
        const user_id = await User.create(app, db, nick_name);
        await Party.addPlayer(app, db, room_id, user_id);
      }

      await Party.countUpdate(app, db, newCount, room_id);

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
