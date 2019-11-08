<template>
	<section class="">
		<article class=""
			v-for="card in cards">
			<div class=""
				@click="cardSet(card)">
				<img class=""
					:src="card.img">
			</div>
		</article>
	</section>
</template>

<script>
  import {store} from '../../js/store/index';
  
  export default {
    name: "MineCards",
    store,
	  data() {
    	return {
    	
	    }
	  },
	  computed: {
    	cards() {
    		return this.$store.getters.handCards;
	    },
		  player() {
			  return this.$store.getters.player;
		  },
		  myTurn() {
			  return this.$store.getters.myTurn;
		  },
		  game() {
			  return this.$store.getters.game;
		  },
		  canSet() {
			  return this.game.action === 'leaderSetsCard' && this.myTurn()
				  || this.game.action === 'allSetCards';
		  }
	  },
	  methods: {
      cardSet(card) {
      	if (!this.canSet) {
      		return
	      }
      // ajax set card
	    // .success:
	      
      	this.$emit('cardSetDone');
      }
	  },
  }
</script>

<style scoped>

</style>