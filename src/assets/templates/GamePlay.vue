<template>
	<section>
		<join v-show="unknownPlayer"
					@start="startGame"></join>
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
    },
    store,
	  mixins: [toggle],
	  
	  data() {
    	return {
		    unknownPlayer: true,
	    }
	  },
	  computed: {
		  player() {
			  return this.$store.getters.player;
		  },
		  myTurn() {
		  	return this.$store.getters.myTurn;
		  },
		  game() {
			  return this.$store.getters.game;
		  },
	  },
	  created() {
		  // setInterval(()=>{
			//   this.ping();
		  // }, 1000);
	  },
	  mounted() {
	  },
	  methods: {
    	async getPlayers() {
		    await $.ajax({
			    type: "GET",
			    url: '/all',
			    success: function (resp) {
				    console.log(resp)
			    }
		    });
	    },
		  
		  async startGame() {
		    this.unknownPlayer = false;
			  	
		    // know the game action and
			  // set the player's status
			  // await this.ping();
		    
		    if (!this.game.run) {
		    	this.getNewCards();
		    } else {
			    await this.$store.dispatch('getTableCards');
		    	
			    this.showTable();
		    }
		  },
		  async getNewCards() {
			  this.$store.dispatch('setPlayerStatus', 'looting');
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
		  
	    ping() {
		    let data = {
				  id: this.player.id,
				  status: this.player.status,
			  };
			
			  $.ajax({
				  type: 'GET',
				  url: '/',
				  data: data,
				  success: function (resp){
				    console.log(resp)
					  if (resp.game.myTurn && !this.myTurn) {
						  this.$store.dispatch('myTurnStart');
					  }
					  if (!resp.game.myTurn && this.myTurn) {
						  this.$store.dispatch('myTurnEnd');
					  }
				  }
			  });
		  },
	  }
  }
</script>

<style scoped>

</style>