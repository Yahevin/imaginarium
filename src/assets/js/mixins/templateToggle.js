export default {
	data() {
		return {
			tableShown: false,
			newShown: false,
			myCardsShown: false,
			boardShown: false,
		}
	},
	methods: {
		showNew() {
			this.newShown = true;
			this.tableShown = false;
			this.myCardsShown = false;
			this.boardShown = false;
		},
		showMyCards() {
			this.myCardsShown = true;
			this.newShown = false;
			this.tableShown = false;
			this.boardShown = false;
		},
		showTable() {
			this.tableShown = true;
			this.newShown = false;
			this.myCardsShown = false;
			this.boardShown = false;
		},
		showBoard() {
			this.boardShown = true;
			this.newShown = false;
			this.tableShown = false;
			this.myCardsShown = false;
		}
	}
};