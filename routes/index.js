const addCard = require('./router/add-card');
const cradGuess = require('./router/card-guess');
const countScore = require('./router/count-score');
const createNewCards = require('./router/create-new-cards');
const getMarks = require('./router/get-marks');
const getMyCards = require('./router/get-my-cards');
const getNewCards = require('./router/get-new-cards');
const getQuestion = require('./router/get-question');
const leaderBoard  = require('./router/leader-board');
const partyCreate  = require('./router/party-create');
const ping = require('./router/ping');
const setAction  = require('./router/set-action');
const setDistribution  = require('./router/set-distribution');
const setQuestion  = require('./router/set-question');
const setStyle  = require('./router/set-style');
const tableCards  = require('./router/table-cards');
const tableClear  = require('./router/table-clear');
const turnEnd  = require('./router/turn-end');
const userJoin  = require('./router/user-join');
const putCard = require('./router/put-card');

module.exports = function(app, db) {
	addCard(app,db);
	cradGuess(app,db);
	countScore(app,db);
	createNewCards(app,db);
	getMarks(app,db);
	getMyCards(app,db);
	getNewCards(app,db);
	getQuestion(app,db);
	leaderBoard(app,db);
	partyCreate(app,db);
	ping(app,db);
	setAction(app,db);
	setDistribution(app,db);
	setQuestion(app,db);
	setStyle(app,db);
	tableCards(app,db);
	tableClear(app,db);
	turnEnd(app,db);
	userJoin(app,db);
	putCard(app, db);
};