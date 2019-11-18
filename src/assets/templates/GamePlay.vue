<template>
	<section>
		<join v-show="playerUnknown"
					@start="startGame"></join>
		<style-select v-show="styleUnset && !this.playerUnknown"
          @start="startGame"></style-select>
		<play-table v-show="tableShown"
					@endRound="getNewCards"></play-table>
		<new-cards v-show="newShown"
					@enough="newRound"></new-cards>
		<mine-cards v-show="myCardsShown"
					@cardSetDone=""></mine-cards>
		
		<button @click="boardShown = true">show table</button>
		
		
		<button @click="getPlayers()">get players</button>
		
		
		<leader-board v-show="boardShown"></leader-board>
		
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
	  computed: {
		  player() {
			  return this.$store.getters.player;
		  },
		  game() {
			  return this.$store.getters.game;
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
	  },
	  created() {

	  },
	  mounted() {
	  },
	  methods: {
		  startGame() {
		    if (!this.styleUnset){
		    	this.playerReady();
		    }
		  },
		  async playerReady() {
			  await this.ping();
			  setInterval(async ()=>{
				  await this.ping();
			  },1000);
		  },
		  async getNewCards() {
			  await this.$store.dispatch('getNewCards');
			
			  this.showNew();
		  },
		  newRound() {
			  this.$store.dispatch('setPlayerStatus', 'readyToSetCard');
		  	
			  this.showMyCards();
		  },
		  async startGuess() {
			  if(this.myTurn) {
				  this.$store.dispatch('setPlayerStatus', 'waitingForGuess');
			  } else {
				  this.$store.dispatch('setPlayerStatus', 'readyToGuess');
			  }
			
			  await this.$store.dispatch('getTableCards');
			  
			  this.showTable();
		  },
		  
	    async ping() {
		    let data = {
				  user_id: this.player.id,
				  room_id: this.game.id,
			  };
			
			  $.ajax({
				  type: 'POST',
				  url: '/ping',
				  data: data,
				  success:(resp)=>{
					  this.$store.dispatch('setPlayerRole',resp.gameMaster);
					  this.$store.dispatch('setGameAction',resp.gameAction);
				  }
			  });
		  },
	  }
  }
</script>

<style scoped>

</style>