const sql = require('./sqlCommands');

module.exports = async function(app, db) {
	let gameSt = {
		start: 'game-start',
		gmCardSet: 'gm-card-set',
		allCardSet: 'all-card-set',
		allGuessDone: 'all-guess-done',
		getNewCards: 'get-new-cards',
	};
	
	//POST
	app.post('/party-create', async (req, res) => {
		let nickName = req.body.nickName,
				userId,
				roomId;
		
		function roomCreate(resolve) {
			let roomCreateReq = db.format(sql.ii2, ["room", "game_action",'player_count', gameSt.start, 1]);
			db.query(roomCreateReq, function (err, results) {
				if (err) throw err;
				roomId = results.insertId;
				return resolve();
			});
		}
		function playerCreate(resolve) {
			let playerCreateReq = db.format(sql.ii2, ['users', 'nick_name', 'game_master', nickName, true]);
			db.query(playerCreateReq, function (err, results) {
				if (err) throw err;
				userId = results.insertId;
				return resolve();
			});
		}
		function chainPlayer() {
			let chainPlayerReq = db.format(sql.ii2, ['user__room', 'room_id', 'user_id', roomId, userId]);
			db.query(chainPlayerReq, function (err, results) {
				if (err) throw err;
				res.json({success: true});
			});
		}
		
		new Promise(resolve => {
			roomCreate(resolve);
		}).then(() => {
			new Promise(resolve => {
				playerCreate(resolve)
			}).then(() => {
				chainPlayer()
			})
		})
	});
	
	
	app.post('/user-join', async (req, res) => {
		let roomId = req.body.gameId,
				nickName = req.body.nickName,
			  userExist = false,
				newCount,
				userId;
		
		function getPlayersCount(resolve) {
			let getPlayersCountReq = db.format(sql.sfw, ['room', 'id', roomId]);
			db.query(getPlayersCountReq, function (err, results) {
				if (err) throw err;
				newCount = +results[0].player_count + 1;
				return resolve();
			});
		}
		function userJoin(resolveMain) {
			new Promise(resolve => {
				checkNickName(resolve);
			}).then(()=>{
				if (userExist) {
					return resolveMain();
				} else {
					new Promise(resolve => {
						playerCreate(resolve);
					}).then(()=>{
						new Promise(resolve => {
							checkNickName(resolve);
						}).then(()=>{
							if (userExist) {
								return resolveMain();
							} else {
								res.json({success: false});
							}
						})
					})
				}
			})
		}
		function checkNickName(resolve) {
			let playerCreateReq = db.format(sql.sfw, ['users', 'nick_name', nickName]);
			db.query(playerCreateReq, function (err, results) {
				if (err) throw err;
				userExist = results.length > 0;
				if (userExist) {
					res.json(results[0]);
				}
				return resolve();
			});
		}
		function playerCreate(resolve) {
			let playerCreateReq = db.format(sql.ii1, ['users', 'nick_name', nickName]);
			db.query(playerCreateReq, function (err, results) {
				if (err) throw err;
				userId = results.insertId;
				return resolve();
			});
		}
		function playerCountUpdate() {
			let playerCountUpdateReq = db.format(sql.usw, ['room', 'player_count', newCount, 'id', roomId]);
			db.query(playerCountUpdateReq, function (err, results) {
				if (err) throw err;
			});
		}
		function chainPlayer() {
			let chainPlayerReq = db.format(sql.ii2, ['user__room', 'room_id', 'user_id', roomId, userId]);
			db.query(chainPlayerReq, function (err, results) {
				if (err) throw err;
			});
		}
		
		new Promise(resolve => {
			getPlayersCount(resolve);
		}).then(()=>{
			new Promise(resolve => {
				userJoin(resolve)
			}).then(()=>{
				playerCountUpdate();
				chainPlayer();
			});
		})
	});
	
	
	app.post('/card-main', async (req, res) => {
		let cardId = req.body.cardId,
				roomId = req.body.gameId,
				imgUrl = req.body.imgUrl,
				playerStyle = null,
				tableCard;
		
		function addMainCard (resolve) {
			let addMainCardReq = db.format(sql.ii5,
				['cards_on_table','img_url', 'card_id', 'is_main', 'has_mark', 'player_style',
					imgUrl, cardId, true, false, playerStyle]);
			db.query(addMainCardReq, function (err, results) {
				if (err) throw err;
				tableCard = results.insertId;
				return resolve();
			});
		}
		function noteTableCard (resolve) {
			let noteTableCardReq = db.format(sql.ii2,
				['room__table', 'room_id', 'table_card_id', roomId, tableCard]);
			db.query(noteTableCardReq, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		function changeGameStatus() {
			let changeGameStatusReq = db.format(sql.usw,
				['room', 'game_action', gameSt.gmCardSet, 'id', roomId]);
			db.query(changeGameStatusReq, function(err, results) {
				if (err) throw err;
				res.json({success: true});
			});
		}
		function removeFromHand(resolve) {
			let removeFromHandReq = db.format(sql.dfw,
				['cards_in_hand', 'card_id', cardId]);
			db.query(removeFromHandReq, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		
		new Promise(resolve => {
			addMainCard(resolve);
		}).then(() => {
			new Promise(resolve => {
				noteTableCard(resolve);
			}).then(()=>{
				new Promise(resolve => {
					removeFromHand(resolve);
				}).then(()=>{
					changeGameStatus();
				})
			})
		});
	});
	
	
	app.post('/card-fake', async (req, res) => {
		let cardId = req.body.cardId,
			roomId = req.body.gameId,
			imgUrl = req.body.imgUrl,
			playerStyle = null,
			playersCount,
			cardsCount,
			tableCard;
		
		function addFakeCard(resolve) {
			let addFakeCardReq = db.format(sql.ii5,
				['cards_on_table','img_url', 'card_id', 'is_main', 'has_mark', 'player_style',
					imgUrl, cardId, false, false, playerStyle]);
			db.query(addFakeCardReq, function (err, results) {
				if (err) throw err;
				tableCard = results.insertId;
				return resolve();
			});
		}
		function noteTableCard(resolve) {
			let noteTableCardReq = db.format(sql.ii2,
				['room__table', 'room_id', 'table_card_id', roomId, tableCard]);
			db.query(noteTableCardReq, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		function removeFromHand(resolve) {
			let removeFromHandReq = db.format(sql.dfw,
				['cards_in_hand', 'card_id', cardId]);
			db.query(removeFromHandReq, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		function getCounts(resolveMain) {
			let getPlayersCount = db.format(sql.sfw, ['room', 'id', roomId]),
				getCardsCount = db.format(sql.sfw, ['room__table', 'room_id', roomId]);
			
			new Promise(resolve => {
				db.query(getPlayersCount, function(err, results) {
					if (err) throw err;
					playersCount = results.player_count;
					return resolve();
				});
			}).then(()=>{
				db.query(getCardsCount, function (err, results) {
					if (err) throw err;
					cardsCount = results.length;
					res.json({success: true});
					return resolveMain();
				});
			});
		}
		function iAmLast() {
			return cardsCount === playersCount;
		}
		function changeGameStatus() {
			let changeGameStatusReq = db.format(sql.usw,
				['room', 'game_action', gameSt.allCardSet, 'id', roomId]);
			db.query(changeGameStatusReq, function(err, results) {
				if (err) throw err;
				res.json({success: true});
			});
		}
		
		new Promise(resolve => {
			addFakeCard(resolve)
		}).then(() => {
			new Promise(resolve => {
				noteTableCard(resolve)
			}).then(()=>{
				new Promise(resolve => {
					removeFromHand(resolve)
				}).then(()=>{
					new Promise(resolve => {
						getCounts(resolve);
					}).then(()=>{
						if (iAmLast()) {
							changeGameStatus();
						}
					})
				})
			})
		});
	});
	
	
	app.post('/card-guess', async (req, res) => {
		let style = req.body.playerStyle,
			tableCardId = req.body.cardId,
			roomId = req.body.gameId,
			iAmLast = false,
			cardIds = [],
			marked = [];
		
		function makeGuessCard(resolve) {
			let makeGuessCardReq = db.format(sql.ussw,
				['cards_on_table', 'has_mark', true, 'player_style', style, 'id', tableCardId]);
			db.query(makeGuessCardReq, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		function getCounts(resolveMain) {
			new Promise(resolve => {
				getCardsId(resolve);
			}).then(()=>{
				getCardsCount(resolveMain)
			});
		}
		function getCardsId(resolve) {
			let getCardsIdReq = db.format(sql.sfw, ['room__table', 'room_id', roomId]);
			db.query(getCardsIdReq, function (err, results) {
				if (err) throw err;
				cardIds = results.map((item)=>{
					return item.table_card_id;
				});
				return resolve();
			});
		}
		function getCardsCount(resolve) {
			cardIds.forEach((currentId, index)=>{
				let getCardsCountReq = db.format(sql.sfw, ['cards_on_table', 'id', currentId]);
				db.query(getCardsCountReq, function (err, results) {
					if (err) throw err;
					if(results[0].has_mark) {
						marked.push(results)
					}
					if (index === (cardIds.length - 1)) {
						iAmLast = marked.length === cardIds.length;
						return resolve();
					}
				});
			});
		}
		function changeGameStatus() {
			let changeGameStatusReq = db.format(sql.usw,
				['room', 'game_action', gameSt.allGuessDone, 'id', roomId]);
			db.query(changeGameStatusReq, function(err, results) {
				if (err) throw err;
				res.json({success: true, iAmLast:true});
			});
		}
		
		new Promise(resolve => {
			makeGuessCard(resolve);
		}).then(()=>{
			new Promise(resolve => {
				getCounts(resolve);
			}).then(()=>{
				if (iAmLast) {
					changeGameStatus();
				} else {
					res.json({success: true, iAmLast: false});
				}
			})
		});
	});
	
	
	app.post('/table-clear', async (req, res) => {
		let tableCards=[],
				roomId = req.body.gameId,
				distribution = {};
		
		function getTableCards(resolve) {
			let getTableCardsReq = db.format(sql.sfw,
				['room__table','room_id', roomId]);
			db.query(getTableCardsReq, function (err, results) {
				if (err) throw err;
				tableCards = results.map((item) => {
					if (item.hasOwnProperty('table_card_id')) {
						return item.table_card_id
					}
				});
				return resolve();
			});
		}
		function getDistribution(resolve) {
			let getDistributionReq = db.format(sql.sfw,
				['distribution', 'room_id', roomId]);
			db.query(getDistributionReq, function (err, results) {
				if (err) throw err;
				distribution = results[0];
				return resolve();
			});
		}
		function moveToBasket(resolve) {
			tableCards.forEach((currentId,index)=> {
				let moveToBasketReq = db.format(sql.ii2,
					['in_basket', 'distribution_id', 'card_id', distribution.id, currentId]);
				db.query(moveToBasketReq, function (err, results) {
					if (err) throw err;
					if(index >= (tableCards.length - 1)) {
						return resolve();
					}
				});
			});
		}
		function cleanTableCards() {
			tableCards.forEach((currentId,index)=>{
				let cleanTableCardsReq = db.format(sql.dfw,
					['cards_on_table', 'id', currentId]);
				db.query(cleanTableCardsReq, function (err, results) {
					if (err) throw err;
					if(index >= (tableCards.length - 1)) {
						res.json({success: true});
					}
				});
			});
		}
		
		new Promise(resolve => {
			getTableCards(resolve)
		}).then(()=>{
			new Promise(resolve => {
				getDistribution(resolve);
			}).then(()=>{
				new Promise(resolve => {
					moveToBasket(resolve);
				}).then(()=>{
					cleanTableCards()
				});
			})
		})
		
	});
	
	
	app.post('/set-distribution', async (req,res) => {
		let roomId = req.body.gameId,
				setDistributionReq = db.format(sql.ii1,
				['distribution', 'room_id', roomId]);
		
		db.query(setDistributionReq, function (err, results) {
			if (err) throw err;
			res.json({success:true});
		});
	});
	
	
	app.post('/new-cards', async (req, res) => {
		let roomId = req.body.gameId,
				cardsCount = req.body.cardsCount,
				playersCount,
				distributionId,
				handCards = [],
				inBasketCards = [],
				cardsShelter = [];
		
		function getPlayersCount(resolve) {
			let getPlayersCountReq = db.format(sql.sfw,['room', 'id', roomId]);
			db.query(getPlayersCountReq, function (err, results) {
				if (err) throw err;
				playersCount = results[0].player_count;
				return resolve();
			});
		}
		function getHandCards(resolveMain) {
			let handCardsId = [];
			
			new Promise(resolve => {
				let getHandCardsIdReq = db.format(sql.sfw,['room__hand', 'room_id', roomId]);
				db.query(getHandCardsIdReq, function (err, results) {
					if (err) throw err;
					if(results.length > 0) {
						results.forEach((item,index)=>{
							handCardsId.push(item.hand_card_id);
							if(index >= (results.length - 1)) {
								return resolve();
							}
						});
					} else {
						return resolve();
					}
				});
			}).then(()=>{
				if (handCardsId.length > 0) {
					handCardsId.forEach((currentId, index) => {
						let getHandCardsReq = db.format(sql.sfw, ['cards_in_hand', 'id', currentId]);
						db.query(getHandCardsReq, function (err, results) {
							if (err) throw err;
							handCards.push(item.card_id);
							if (index >= (handCardsId.length - 1)) {
								return resolveMain();
							}
						});
					})
				} else {
					return resolveMain();
				}
			});
		}
		function getBasketCards(resolveMain) {
			new Promise(resolve => {
				let distributionReq = db.format(sql.sfw,['distribution', 'room_id', roomId]);
				db.query(distributionReq, function (err, results) {
					if (err) throw err;
					distributionId = results[0].id;
					return resolve();
				});
			}).then(()=>{
				let getBasketCardsReq = db.format(sql.sfw,['in_basket', 'distribution_id', distributionId]);
				db.query(getBasketCardsReq, function (err, results) {
					if (err) throw err;
					if (results.length > 0) {
						results.forEach((item,index)=>{
							inBasketCards.push(item.card_id);
							if(index >= (results.length - 1)) {
								return resolveMain();
							}
						});
					} else {
						return resolveMain();
					}
				});
			});
		}
		function getCardsShelter(resolve) {
			let getCardsShelterReq = db.format(sql.sf,['cards']);
			db.query(getCardsShelterReq, function (err, results) {
				if (err) throw err;
				results.forEach((item)=>{
					cardsShelter.push(item.id);
				});
				return resolve();
			});
		}
		function basketIsFull() {
			let diff = cardsShelter.length - handCards.length - inBasketCards.length - playersCount * cardsCount;
			return diff > 0;
		}
		function clearBasket(resolveMain) {
			new Promise(resolve => {
				let clearReq = db.format(sql.dfw,['distribution','id',distributionId]);
				db.query(clearReq, function (err, results) {
					if (err) throw err;
					return resolve();
				});
			}).then(()=>{
				let clearReq = db.format(sql.ii1,['distribution','room_id',roomId]);
				db.query(clearReq, function (err, results) {
					if (err) throw err;
					return resolveMain();
				});
			});
		}
		function getRandomCards() {
			let less = handCards.concat(inBasketCards),
					deletable;
			
			less.forEach((id)=>{
				deletable = cardsShelter.indexOf(id);
				cardsShelter.splice(deletable,(deletable + 1));
			});
			let j, temp;
			for(let i = cardsShelter.length - 1; i > 0; i--){
				j = Math.floor(Math.random()*(i + 1));
				temp = cardsShelter[j];
				cardsShelter[j] = cardsShelter[i];
				cardsShelter[i] = temp;
			}
		}
		function setCards() {
			let users = [];
			
			new Promise(resolve => {
				let getUsersReq = db.format(sql.sfw,['user__room','room_id',roomId]);
				db.query(getUsersReq, function (err, results) {
					if (err) throw err;
					results.forEach((user,index)=>{
						users.push(user.id);
						if(index >= (results.length - 1)) {
							return resolve();
						}
					});
				});
			}).then(()=>{
				users.forEach((user,index)=>{
					for(let i=0; i < cardsCount; i++) {
						let setReq = db.format(sql.ii2,['new_cards','card_id', 'user_id', cardsShelter[i], user]);
						db.query(setReq, function (err, results) {
							if (err) throw err;
						});
					}
					cardsShelter.splice(0,cardsCount);
					if(index >= (users.length - 1)) {
						res.json({success: true});
					}
				});
			});
		}
		
		new Promise(resolve => {
			getPlayersCount(resolve)
		}).then(()=>{
			new Promise(resolve => {
				getHandCards(resolve)
			}).then(()=>{
				new Promise(resolve => {
					getBasketCards(resolve)
				}).then(()=>{
					new Promise(resolve => {
						getCardsShelter(resolve)
					}).then(()=>{
						if (basketIsFull()) {
							new Promise(resolve => {
								clearBasket(resolve)
							}).then(()=>{
								getRandomCards();
								setCards()
							})
						} else {
							getRandomCards();
							setCards()
						}
					})
				})
			})
		})
	});
	
	//PUT
	app.put('/set-style', async (req, res) => {
		let style = req.body.playerStyle,
				userId = req.body.userId,
				setStyleReq = db.format(sql.usw,
				['users', 'player_style', style, 'id', userId]);
		
			db.query(setStyleReq, function(err, results) {
				if (err) throw err;
				res.json({success: true});
			});
	});
	

	app.put('/turn-end', async (req, res) => {
		let roomId = req.body.gameId,
				userId = req.body.userId;
		
		function changeGameStatus(resolve) {
			let changeGameStatusReq = db.format(sql.usw, ['room', 'game_action', gameSt.getNewCards, 'id', roomId]);
			db.query(changeGameStatusReq, function(err, results) {
				if (err) throw err;
					return resolve();
			});
		}
		function demoteMe(resolve) {
			let demoteMeReq = db.format(sql.usw, ['users', 'game_master', false, 'id', userId]);
			db.query(demoteMeReq, function(err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		function findNewGM() {
			let usersId = [],
					users = [];
			
			new Promise(resolve => {
				let getUsersId = db.format(sql.sfw, ['user__room', 'room_id', roomId]);
				db.query(getUsersId, function(err, results) {
					if (err) throw err;
					results.forEach((item,index)=>{
						usersId.push(item.id);
						if(index >= (results.length - 1)) {
							return resolve();
						}
					});
				});
			}).then(()=>{
				new Promise(resolve => {
					usersId.forEach((currentId,index)=>{
						let getUsers = db.format(sql.sfw, ['users', 'id', currentId]);
						db.query(getUsers, function(err, results) {
							if (err) throw err;
							results.forEach((item,index)=>{
								users.push(item);
								if(index >= (results.length - 1)) {
									return resolve();
								}
							});
						});
					});
				}).then(()=>{
					let current = 0,
							next;
					
					users.forEach((item,index)=>{
						if (item.id === userId) {
							current = index;
						}
					});
					
					if (current < (users.length - 1)) {
						next = users[current + 1];
					} else {
						next = users[0];
					}
					
					let setGM = db.format(sql.usw, ['users', 'game_master', 'id', next.id]);
					db.query(setGM, function(err, results) {
						if (err) throw err;
						res.json({success: true});
					});
				})
			});
		}
		
		new Promise(resolve => {
			changeGameStatus(resolve);
		}).then(()=>{
			new Promise(resolve => {
				demoteMe(resolve)
			}).then(()=>{
				findNewGM()
			})
		});
	});
	
	//GET
	app.get('/table-cards', async (req, res) => {
		let roomId = req.body.gameId,
				cardIds = [],
				cardUrls = [];
		
		function getCardsId(resolve) {
			let getCardsIdReq = db.format(sql.sfw, ['room__table', 'room_id', roomId]);
			db.query(getCardsIdReq, function (err, results) {
				if (err) throw err;
				cardIds = results.map((item)=>{
					return item.table_card_id;
				});
				return resolve();
			});
		}
		function getCards() {
			cardIds.forEach((currentId, index)=>{
				let getCardsIdReq = db.format(sql.sfw, ['cards_on_table', 'id', currentId]);
				db.query(getCardsIdReq, function (err, results) {
					if (err) throw err;
					cardUrls.push(results[0].img_url);
					if(index === (cardIds.length - 1)) {
						res.json(cardUrls);
					}
				});
			})
		}
		
		new Promise(resolve => {
			getCardsId(resolve)
		}).then(()=>{
			getCards()
		})
	});
	

	app.get('/new-cards', async (req, res) => {
		let userId = req.body.userId,
				getCards = db.format(sql.sfw, ['new_cards', 'user_id', userId]);
		
		db.query(getCards, function(err, results) {
			if (err) throw err;
			res.json(results);
		})
	});
	
	
	app.get('/leader-board', async (req, res) => {
		let roomId = req.body.gameId,
				users = [];
		
		function getUsersId(resolve) {
			let getUsersIdReq =  db.format(sql.sfw, ['user__room', 'room_id', roomId]);
			db.query(getUsersIdReq, function (err, results) {
				if (err) throw err;
				users = results;
				return resolve();
			});
		}
		function getUsers() {
			users.forEach((user)=>{
				let getUsersReq =  db.format(sql.sfw, ['users', 'id', user.id]);
				db.query(getUsersReq, function (err, results) {
					if (err) throw err;
					res.json(results);
				});
			});
		}
		
		new Promise(resolve => {
			getUsersId(resolve);
		}).then(()=>{
			getUsers();
		});
	});
	
	
	app.get('/ping', async (req, res) => {
		let roomId = req.body.gameId,
				userId = req.body.userId,
				resp = {};
		
		function getUser(resolve) {
			let getUsersIdReq =  db.format(sql.sfw, ['users', 'id', userId]);
			db.query(getUsersIdReq, function (err, results) {
				if (err) throw err;
				resp.gameMaster = results[0].game_master;
				return resolve();
			});
		}
		function getRoom() {
			let getUsersIdReq =  db.format(sql.sfw, ['room', 'id', roomId]);
			db.query(getUsersIdReq, function (err, results) {
				if (err) throw err;
				resp.gameAction = results[0].game_action;
				res.json(resp);
			});
		}
		
		new Promise(resolve => {
			getUser(resolve);
		}).then(()=>{
			getRoom();
		});
	});
};