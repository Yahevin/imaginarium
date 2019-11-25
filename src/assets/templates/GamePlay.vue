<template>
	<section class="game">
		<join v-show="playerUnknown"
					@start="getReady"></join>
		<style-select v-show="styleUnset && !this.playerUnknown"
          @start="getReady"></style-select>
		<new-cards v-show="newShown"
					@enough="showMyCards"></new-cards>
		<mine-cards v-show="myCardsShown"
					@cardSetDone="showTable"></mine-cards>
		<play-table v-show="tableShown"
          @endRound="getNewCards"></play-table>
		<leader-board v-show="boardShown"></leader-board>
		
		<button v-show="player.gameMaster" @click="startGame">start</button>
		
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
		  myTurn() {
		  	return this.$store.getters.player.gameMaster;
		  },
		  styleUnset() {
		  	return this.$store.getters.player.style === null;
		  },
		  playerUnknown() {
			  return this.$store.getters.player.nickName === null;
		  },
		  battleGround() {
		  	return this.$store.getters.party;
		  },
		  handCards() {
		  	return this.$store.getters.handCards;
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
				  this.setOnlyMyCards();
			  }
			  
			  setInterval(async ()=>{
				  await this.ping();
			  },1000);
		  },
		  async startGame() {
			  await this.setDistribution();
			  await this.createNewCards(6);
			  await this.$store.dispatch('setGameAction','game-start');
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
			
			  this.showNew();
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
			
			  $.ajax({
				  type: 'POST',
				  url: '/ping',
				  data: data,
				  success: (resp)=>{
					  this.$store.dispatch('setPlayerRole',resp.gameMaster);
					  this.$store.dispatch('setGameAction',resp.gameAction);
					  
					  if (resp.gameAction === 'gm-card-set') {
					  	this.$store.dispatch('getTableCards', {room_id: this.gameId})
					  } else if (resp.gameAction === 'all-card-set' && resp.gameAction === 'all-guess-done') {
					  	this.$store.dispatch('getMarks');
					  }
				  }
			  });
		  },
	  }
  }
</script>

<style lang="scss" scoped>
</style>