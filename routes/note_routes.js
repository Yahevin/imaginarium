const sql = require('./sqlCommands');

module.exports = async function(app, db) {
	let gameSt = {
		prepare: 'game-prepare',
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
			let roomCreateReq = db.format(sql.ii2, ["room", "game_action",'player_count', gameSt.prepare, 1]);
			db.query(roomCreateReq, function (err, results) {
				if (err) throw err;
				roomId = results.insertId;
				return resolve();
			});
		}
		function playerCreate(resolve) {
			let playerCreateReq = db.format(sql.ii3, ['users', 'nick_name', 'game_master','player_style', nickName, true, null]);
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
				res.json({
					room_id: roomId,
					user_id: userId,
					nick_name: nickName,
					player_style: null,
					game_master: true,
					game_action: gameSt.prepare,
				});
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
		let roomId = req.body.roomId,
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
							playerCountUpdate();
							chainPlayer();
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
					let data = {
						room_id: roomId,
						user_id: results[0].id,
						nick_name: nickName,
						player_style: results[0].player_style,
						game_master: results[0].game_master,
						game_action: gameSt.prepare,
					};
					res.json(data);
				}
				return resolve();
			});
		}
		function playerCreate(resolve) {
			let playerCreateReq = db.format(sql.ii3, ['users', 'nick_name','game_master','player_style', nickName, false, null]);
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
			})
		})
	});
	
	
	app.post('/card-main', async (req, res) => {
		let handCardId = req.body.id,
				cardId = req.body.card_id,
				roomId = req.body.room_id,
				imgUrl = req.body.img_url,
				tableCard;
		
		function addMainCard (resolve) {
			let addMainCardReq = db.format(sql.ii3,
				['cards_on_table','img_url', 'card_id', 'is_main',
					imgUrl, cardId, true]);
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
				['cards_in_hand', 'id', handCardId]);
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
		let handCardId = req.body.id,
				cardId = req.body.card_id,
				roomId = req.body.room_id,
				imgUrl = req.body.img_url,
				playersCount,
				cardsCount,
				tableCard;
		
		function addFakeCard(resolve) {
			let addFakeCardReq = db.format(sql.ii3,
				['cards_on_table','img_url', 'card_id', 'is_main', imgUrl, cardId, false]);
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
			let removeFromHandReq = db.format(sql.dfw, ['cards_in_hand', 'id', handCardId]);
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
						} else {
							res.json({success: true});
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
		let roomId = req.body.room_id,
				setDistributionReq = db.format(sql.ii1,
				['distribution', 'room_id', roomId]);
		
		db.query(setDistributionReq, function (err, results) {
			if (err) throw err;
			res.json({success:true});
		});
	});
	
	
	app.post('/create-new-cards', async (req, res) => {
		let roomId = req.body.room_id,
				cardsCount = req.body.cards_count,
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
							results.forEach((item,index)=> {
								handCards.push(item.card_id);
								if (index >= (handCardsId.length - 1)) {
									return resolveMain();
								}
							});
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
						users.push(user.user_id);
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
	

	app.post('/set-style', async (req, res) => {
		let style = req.body.player_style,
				userId = req.body.user_id,
				setStyleReq = db.format(sql.usw,
				['users', 'player_style', style, 'id', userId]);
		
			db.query(setStyleReq, function(err, results) {
				if (err) throw err;
				res.json({success: true});
			});
	});
	

	app.post('/turn-end', async (req, res) => {
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
	

	app.post('/table-cards', async (req, res) => {
		let roomId = req.body.room_id,
				cardIds = [],
				resp = [];
		
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
					let card = results[0],
							data = {
								img_url: card.img_url,
								card_id: card.card_id,
								id: card.id,
							};
					
					resp.push(data);
					if(index === (cardIds.length - 1)) {
						res.json(resp);
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
	
	
	app.post('/get-my-cards', async (req, res) => {
		let userId = req.body.user_id,
				handCardIds = [],
				resp = [];
		
		function getHandCards(resolve) {
			let getHandCardsReq = db.format(sql.sfw, ['user__hand', 'user_id', userId]);
			
			db.query(getHandCardsReq, function(err, results) {
				if (err) throw err;
				results.forEach((item)=>{
					handCardIds.push(item.hand_card_id);
				});
				
				return resolve();
			})
		}
		function getMyCards() {
			handCardIds.forEach((currentId)=>{
				let getMyCardsReq = db.format(sql.sfw, ['cards_in_hand', 'id', currentId]);
				
				db.query(getMyCardsReq, function(err, results) {
					if (err) throw err;
					results.forEach((item)=>{
						resp.push(item);
					});
					res.json(resp);
				})
			})
		}
		
		new Promise(resolve => {
			getHandCards(resolve);
		}).then(()=>{
			getMyCards();
		})
	});
	
	
	app.post('/leader-board', async (req, res) => {
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
	
	
	app.post('/ping', async (req, res) => {
		let roomId = req.body.room_id,
				userId = req.body.user_id,
				resp = {};
		
		function getUser(resolve) {
			let getUsersIdReq =  db.format(sql.sfw, ['users', 'id', userId]);
			db.query(getUsersIdReq, function (err, results) {
				if (err) throw err;
				if (results.length > 0) {
					resp.gameMaster = results[0].game_master;
				}
				return resolve();
			});
		}
		function getRoom() {
			let getUsersIdReq =  db.format(sql.sfw, ['room', 'id', roomId]);
			db.query(getUsersIdReq, function (err, results) {
				if (err) throw err;
				if (results.length > 0) {
					resp.gameAction = results[0].game_action;
				}
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