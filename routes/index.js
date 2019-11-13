const testRoute = require('./note_routes');


module.exports = function(app, db) {
	testRoute(app, db);
	// Тут, позже, будут и другие обработчики маршрутов
};