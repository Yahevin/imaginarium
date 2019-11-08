<template>
	<section>
		<join v-show="unknownPlayer"
					@start="startGame"></join>
		<play-table v-show="showTable"></play-table>
		<new-cards v-show="showNew"
					@enough="enough"></new-cards>
		<mine-cards v-show="showMyCards"></mine-cards>
		<leader-board v-show="showBoard"></leader-board>
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
		    showTable: false,
		    showNew: false,
		    showMyCards: false,
		    showBoard: false,
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
		  	this.showNew = true;
			
			  this.$store.dispatch('getCards');
		  },
		  enough() {
			  this.showNew = false;
			  
			  if(!this.myTurn) {
			  	this.showTable = true;
			  } else {
			  	this.showMyCards = true;
			  }
		  }
	  }
  }
</script>

<style scoped>

</style>