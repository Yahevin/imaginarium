<template>
	<section class="game">
		<join v-show="playerUnknown"
					@start="getReady"></join>
		<style-select v-show="needToSetStyle"
          @start="getReady"></style-select>
		<new-cards v-show="newShown"
					@enough="showMyCards"></new-cards>
		<mine-cards v-show="myCardsShown"
					@cardSetDone="showTable"></mine-cards>
		<play-table v-show="tableShown"
          @endRound="newRound"></play-table>
		<leader-board v-show="boardShown"></leader-board>
		
		<article class="game__btn_panel">
			<button v-show="player.gameMaster && !gameRun && !styleUnset"
			        @click="startGame">start</button>
		</article>
		
		<nav  v-show="!playerUnknown"
					class="nav game__btn_panel">
			<button @click="showMyCards">My cards</button>
			<button @click="showTable">Table</button>
			<button @click="showBoard">Grid</button>
		</nav>
		
	</section>
</template>

<script>
  import {store} from '../js/store/index';
  import Join from  './parts/Join';
  import StyleSelect from  './parts/StyleSelect';
  import PlayTable from  './parts/PlayTable';
  import NewCards from './parts/NewCards';
  import MineCards from  './parts/MineCards';
  import LeaderBoard from './parts/LeaderBoard';
  import toggle from '@/assets/js/mixins/templateToggle';
  
  export default {
    name: "GamePlay",
    components: {
      Join,
	    PlayTable,
			NewCards,
	    MineCards,
      LeaderBoard,
	    StyleSelect,
    },
    store,
	  mixins: [toggle],
	  
	  data() {
    	return {
	    }
	  },
	  watch: {
		  gameAction: async function (newGame, oldGame) {
		  	switch (newGame) {
				  case 'game-prepare' :
				  	break;
				  case 'game-start':
					  this.getNewCards();
					  break;
				  case 'gm-card-set' :
					  break;
				  case 'all-card-set' :
					  this.startGuess();
					  break;
				  case 'all-guess-done' :
					  //after gameMaster click 'next round'
					  //show results
					  break;
			  }
		  },
	  },
	  computed: {
		  player() {
			  return this.$store.getters.player;
		  },
		  gameId() {
			  return this.$store.getters.game.id;
		  },
		  gameAction() {
			  return this.$store.getters.game.action;
		  },
		  gameRun() {
		  	return this.gameAction !== 'game-prepare';
		  },
		  handCards() {
			  return this.$store.getters.handCards;
		  },
		  tableCards() {
			  return this.$store.getters.tableCards;
		  },
		  myTurn() {
		  	return this.$store.getters.player.gameMaster;
		  },
		  styleUnset() {
		  	return this.$store.getters.player.style === null;
		  },
		  needToSetStyle() {
		  	return this.styleUnset && !this.playerUnknown || this.styleUnset && this.player.id;
		  },
		  playerUnknown() {
			  return this.$store.getters.player.nickName === null;
		  },
		  battleGround() {
		  	return this.$store.getters.party;
		  },
	  },
	  created() {
	  },
	  mounted() {
	  },
	  methods: {
		  getReady() {
		    if (!this.styleUnset) {
		    	this.playerReady();
		    }
		  },
		  async playerReady() {
			  await this.ping();
			  
			  //if player joined after game start
			  if (this.gameRun) {
				  let count = 6 - this.handCards.length;
				
				  if (count > 0) {
					  // await this.setOnlyMyCards(count);
				  }
				  if (this.tableCards.length > 0) {
				  	this.showTable();
				  } else {
				  	this.showMyCards();
				  }
			  }
			  
			  setInterval(async ()=>{
				  await this.ping();
			  },1000);
		  },
		  async startGame() {
			  await this.setDistribution();
			  await this.createNewCards(6);
			  await this.setAction('game-start');
		  },
		  async setAction(action) {
		  	let data = {
				  room_id: this.gameId,
				  action: action,
			  };
		  	
			  await $.ajax({
				  type: 'POST',
				  url: '/set-action',
				  data: data,
				  success:(resp)=>{
				  }
			  });
		  },
		  async setDistribution() {
			  await new Promise(resolve => {
				  $.ajax({
					  type: 'POST',
					  url: '/set-distribution',
					  data: {room_id: this.gameId},
					  success:()=>{
						  return resolve();
					  }
				  });
			  })
		  },
		  async createNewCards(count) {
		  	let data = {
				  room_id: this.gameId,
				  cards_count: count,
			  };
		  	
		  	await new Promise(resolve => {
				  $.ajax({
					  type: 'POST',
					  url: '/create-new-cards',
					  data: data,
					  success:()=>{
							return resolve();
					  }
				  });
			  })
		  },
		  async getNewCards() {
		  	let data = {
				  user_id: this.player.id,
				  room_id: this.gameId,
			  };
		  	
			  await this.$store.dispatch('getNewCards', data);
			
			  // this.showNew();
				this.showMyCards();
		  },
		  
		  async startGuess() {
			  this.$store.dispatch('getTableCards', {room_id: this.gameId});

			  this.showTable();
		  },
		  async setOnlyMyCards() {
			  await this.createNewCards(6);
			  await this.getNewCards();
		  },
	    async ping() {
		    let data = {
				  user_id: this.player.id,
				  room_id: this.gameId,
			  };
			
			  await $.ajax({
				  type: 'POST',
				  url: '/ping',
				  data: data,
				  success: (resp)=>{
					  this.$store.dispatch('setPlayerRole',resp.gameMaster);
					  this.$store.dispatch('setGameAction',resp.gameAction);
					  
					  if (resp.gameAction === 'gm-card-set') {
					  	this.$store.dispatch('getTableCards', {room_id: this.gameId})
					  } else if (resp.gameAction === 'all-card-set' || resp.gameAction === 'all-guess-done') {
					  	this.$store.dispatch('getMarks',{room_id: this.gameId});
					  }
				  }
			  });
		  },
		  async newRound() {
			  await this.createNewCards(1);
			  await this.setAction('game-start');
		  }
	  }
  }
</script>

<style lang="scss" scoped>

</style>