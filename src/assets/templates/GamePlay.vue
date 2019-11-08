<template>
	<section>
		<join v-show="unknownPlayer"
					@start="startGame"></join>
		<play-table v-show="tableShown"></play-table>
		<new-cards v-show="newShown"
					@enough="enough"></new-cards>
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
		  isStarted() {
			  return this.game.run;
		  }
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
		    
		    // know the game status and
			  // set the player's action
			  // await this.ping();
		    
		    if (!this.game.run) {
		    	this.getNewCards();
		    }
		  },
		   ping() {
		  	let data = {
		  		run: this.isStarted,
				  id: this.player.id,
				  round: this.game.round,
				  action: this.game.action,
			  };
			
			  $.ajax({
				  type: 'POST',
				  url: '/',
				  data: data,
				  success: function (resp){
				  	console.log(resp)
				  }
			  });
		  },
		  getNewCards() {
			  this.showNew();
			
			  this.$store.dispatch('getCards');
		  },
		  enough() {

			  if(!this.myTurn) {
			  	this.showTable();
			  } else {
			  	this.showMyCards();
			  }
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