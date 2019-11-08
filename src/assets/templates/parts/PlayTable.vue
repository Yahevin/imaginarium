<template>
	<section>
		<!--all cards on table-->
		<article class=""
			v-for="card in cards">
			<div class=""
				@click="cardView(card)">
				<img class=""
					:src="card.img">
				<span class=""
		      v-show="allDone && card.hasMarker"
					:class="card.playerStyle"></span>
			</div>
		</article>
		
		<!--scaled card-->
		<article class=""
			v-show="view !== null">
			<img class=""
        :src="view.img"
				@click="cardChosen">
			<div class=""
				@click="closeView"></div>
		</article>
		
		<!--markers, seen while not all players choose-->
		<article class=""
			v-show="!allDone"
			v-for="card in cards">
			<span class=""
			      v-show="card.hasMarker"
			      :class="card.playerStyle">
			</span>
		</article>
		
		<button class=""
			v-show="allDone && iAmGameMaster"
			@click="endRound">
				Next round!
		</button>
	</section>
</template>

<script>
  import {store} from '../../js/store/index';
  
  export default {
    name: "Table",
    store,
	  data() {
		  return {
		  	view: null,
		  }
	  },
	  computed: {
		  cards() {
		  	return this.$store.getters.tableCards;
		  },
		  allDone() {
			  return this.game.action === 'allDone';
		  },
		  player() {
			  return this.$store.getters.player;
		  },
		  game() {
			  return this.$store.getters.game;
		  },
		  iAmGameMaster() {
		  	return this.player.gameMaster;
		  }
	  },
	  methods: {
		  cardView(card) {
		  	this.view = card;
		  },
		  closeView() {
			  this.view = null;
		  },
		  cardChosen() {
		    // ajax set chosen card
				// .success:
			  // close view
			  // set status
			
			  this.view = null;
			  this.$store.dispatch('setPlayerStatus', 'chooseDone');
		  },
		  endRound() {
		    this.$emit('endRound');
		  }
	  },
  }
</script>

<style scoped>

</style>