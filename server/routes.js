const addCard = require('./router/add-card');
const cardGuess = require('./router/card-guess');
const getMarks = require('./router/get-marks');
const getMyCards = require('./router/get-my-cards');
const getNewCards = require('./router/get-new-cards');
const getQuestion = require('./router/get-question');
const leaderBoard = require('./router/leader-board');
const partyCreate = require('./router/party-create');
const setAction = require('./router/set-action');
const setDistribution = require('./router/set-distribution');
const setQuestion = require('./router/set-question');
const setStyle = require('./router/set-style');
const getTableCards = require('./router/get-table-cards');
const tableClear = require('./router/table-clear');
const userJoin = require('./router/user-join');
const putCard = require('./router/put-card');
const registration = require('./router/registration');
const authentication = require('./router/authentication');
const getPlayers = require('./router/get-players');
const getRole = require('./router/get-role');
const getAction = require('./router/get-action');

const getRecentGames = require('./router/get-recent-games');

module.exports = function (app, db) {
  getRecentGames(app, db);

  getAction(app, db);
  getRole(app, db);
  getPlayers(app, db);
  authentication(app, db);
  registration(app, db);
  addCard(app, db);
  cardGuess(app, db);
  getMarks(app, db);
  getMyCards(app, db);
  getNewCards(app, db);
  getQuestion(app, db);
  leaderBoard(app, db);
  partyCreate(app, db);
  setAction(app, db);
  setDistribution(app, db);
  setQuestion(app, db);
  setStyle(app, db);
  getTableCards(app, db);
  tableClear(app, db);
  userJoin(app, db);
  putCard(app, db);
};
