const sql = require('../mixins/sqlCommands');

const Hand = require('../models/Hand');
const Party = require('../models/Party');
const Basket = require('../models/Basket');
const NewCards = require('../models/NewCards');
const Distribution = require('../models/Distribution');

module.exports = function(app, db) {
	app.post('/create-new-cards', async (req, res) => {
		const room_id = req.body.room_id;
		const cardsCount = req.body.cards_count;
		
		const usersIdList = await Party.getUsersIdList(app, db, room_id);
		const playersCount = await Party.getPlayersCount(app, db, room_id);
		const handIdList = await Hand.getSortedByRoom(app, db, room_id);
		const handCards = await Hand.getCards(app, db, handIdList);
		const distributionId = await Distribution.getSortedByRoom(app, db, room_id);
		const shelterCards = await Distribution.getCardShelter(app, db);
		const basketCards = await Basket.getCards(app, db, distributionId);
		
		let basketCardsIdList = basketCards.map((item) => {
			return item.card_id;
		});
		const shelterCardsIdList = shelterCards.map((item) => {
			return item.id;
		});
		const handCardsIdList = handCards.map((item) => {
			return item.card_id;
		});
		
		function basketIsFull() {
			return (shelterCardsIdList.length
				- handCardsIdList.length
				- basketCardsIdList.length
				- playersCount * cardsCount) < 0;
		}
		
		function getRandomCards() {
			let pool = shelterCardsIdList,
				less = handCardsIdList.concat(basketCardsIdList),
				deletable;
			
			less.forEach((id) => {
				deletable = pool.indexOf(id);
				pool.splice(deletable, 1);
			});
			
			let j, temp;
			for (let i = pool.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
				temp = pool[j];
				pool[j] = pool[i];
				pool[i] = temp;
			}
			
			return pool
		}
		
		async function resetBasket() {
			const basketClear = await Basket.clear(app, db, distributionId);
			const basketReset = await Basket.add(app, db, room_id);
			
			if (basketClear && basketReset) {
				basketCardsIdList = [];
			} else {
				res.json({success: false, err: 'basket not cleared'});
			}
		}
		
		if (basketIsFull()) await resetBasket();
		
		const cardPool = getRandomCards();
		const cardsSet = await NewCards.setCards(app, db, usersIdList, cardPool, cardsCount);
		
		res.json({success: cardsSet});
	})
};