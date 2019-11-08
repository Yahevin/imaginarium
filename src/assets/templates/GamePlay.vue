<template>
	<section>
		<join v-show="unknownPlayer"
					@start="startGame"></join>
		<play-table v-show="tableShown"
					@endRound="getNewCards"></play-table>
		<new-cards v-show="newShown"
					@enough="newRound"></new-cards>
		<mine-cards v-show="myCardsShown"></mine-cards>
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
	  data() {
    	return {
		    unknownPlayer: true,
		    tableShown: false,
		    newShown: false,
		    myCardsShown: false,
		    boardShown: false,
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
		  async startGame() {
		    this.unknownPlayer = false;
		    
		    // know the game action and
			  // set the player's status
			  // await this.ping();
		    
		    if (!this.game.run) {
		    	this.getNewCards();
		    } else {
			    this.$store.dispatch('getTableCards');
		    	
			    this.showTable();
		    }
		  },
		  getNewCards() {
			  this.$store.dispatch('getNewCards');
			
			  this.showNew();
		  },
		  newRound() {
			  this.$store.dispatch('setPlayerStatus', 'readyToSetCard');
		  	
			  this.showMyCards();
		  },
		  
		  
	    ping() {
		    let data = {
				  id: this.player.id,
				  round: this.game.round,
				  status: this.player.status,
			  };
			
			  $.ajax({
				  type: 'GET',
				  url: '/',
				  data: data,
				  success: function (resp){
				    console.log(resp)
				  }
			  });
		  },
		  
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
  }
</script>

<style scoped>

</style>