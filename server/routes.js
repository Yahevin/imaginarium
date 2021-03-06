const addCard = require('./router/add-card');
const cardGuess = require('./router/card-guess');
const getMarks = require('./router/get-marks');
const getMyCards = require('./router/get-my-cards');
const getNewCards = require('./router/get-new-cards');
const getQuestion = require('./router/get-question');
const leaderBoard = require('./router/leader-board');
const partyCreate = require('./router/party-create');
const setQuestion = require('./router/set-question');
const setStyle = require('./router/set-style');
const getTableCards = require('./router/get-table-cards');
const userJoin = require('./router/user-join');
const putCard = require('./router/put-card');
const registration = require('./router/registration');
const authentication = require('./router/authentication');
const authVerify = require('./router/auth-verify');
const getPlayers = require('./router/get-players');
const getPlayer = require('./router/get-player');
const getAction = require('./router/get-action');

const getRecentGames = require('./router/get-recent-games');

module.exports = (app, db, roomsMap) => {
  getRecentGames(app, db, roomsMap);
  getAction(app, db);
  getPlayer(app, db);
  getPlayers(app, db, roomsMap);
  authentication(app, db);
  registration(app, db);
  addCard(app, db);
  cardGuess(app, db, roomsMap);
  getMarks(app, db, roomsMap);
  getMyCards(app, db);
  getNewCards(app, db);
  getQuestion(app, db);
  leaderBoard(app, db);
  partyCreate(app, db);
  setQuestion(app, db, roomsMap);
  setStyle(app, db);
  getTableCards(app, db);
  userJoin(app, db);
  putCard(app, db, roomsMap);
  authVerify(app, db);
};
