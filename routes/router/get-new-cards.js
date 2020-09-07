const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
app.post('/get-new-cards', async (req, res) => {
	let userId = req.body.user_id,
		roomId = req.body.room_id,
		cardsIds = [],
		resp = [],
		handCardIds = [];
	
	
	function getCardsId(resolve) {
		let getCardsIdReq = db.format(sql.sfw, ['new_cards', 'user_id', userId]);
		
		db.query(getCardsIdReq, function(err, results) {
			if (err) throw err;
			results.forEach((item)=>{
				cardsIds.push({id: item.card_id});
			});
			return resolve();
		})
	}
	function getImages(resolve) {
		cardsIds.forEach((item,index)=>{
			let getImagesReq = db.format(sql.sfw, ['cards', 'id', item.id]);
			
			db.query(getImagesReq, function(err, results) {
				if (err) throw err;
				item.img_url = results[0].img_url;
				
				if(index === (cardsIds.length - 1)) {
					return resolve();
				}
			})
		});
	}
	function deleteTheCopy() {
		let getCardsIdReq = db.format(sql.dfw, ['new_cards', 'user_id', userId]);
		
		db.query(getCardsIdReq, function(err, results) {
			if (err) throw err;
		})
	}
	function createHandCards(resolve) {
		cardsIds.forEach((item,index)=>{
			let createHandCardsReq = db.format(sql.ii2, ['cards_in_hand', 'card_id', 'img_url',  item.id, item.img_url]);
			
			db.query(createHandCardsReq, function(err, results) {
				if (err) throw err;
				handCardIds.push(results.insertId);
				
				if(index === (cardsIds.length - 1)) {
					return resolve();
				}
			})
		});
	}
	function chainWithRoom() {
		handCardIds.forEach((currentId)=>{
			let chainWithRoomReq = db.format(sql.ii2, ['room__hand', 'room_id', 'hand_card_id', roomId, currentId]);
			
			db.query(chainWithRoomReq, function(err, results) {
				if (err) throw err;
			});
		});
	}
	function chainWithUser() {
		handCardIds.forEach((currentId)=> {
			let chainWithUserReq = db.format(sql.ii2, ['user__hand', 'user_id', 'hand_card_id', userId, currentId]);
			
			db.query(chainWithUserReq, function (err, results) {
				if (err) throw err;
			});
		});
	}
	function getCards() {
		handCardIds.forEach((currentId,index)=>{
			let getCardsReq = db.format(sql.sfw, ['cards_in_hand', 'id', currentId]);
			
			db.query(getCardsReq, function(err, results) {
				if (err) throw err;
				resp.push(results[0]);
				
				if(index === (handCardIds.length - 1)) {
					res.json(resp);
				}
			})
		});
	}
	
	new Promise(resolve => {
		getCardsId(resolve)
	}).then(()=>{
		new Promise(resolve => {
			getImages(resolve)
		}).then(()=>{
			new Promise(resolve => {
				createHandCards(resolve);
			}).then(()=>{
				chainWithRoom();
				chainWithUser();
				deleteTheCopy();
				getCards();
			})
		})
	})
});
};