<template>
	<section>
		<!--all cards on table-->
		<article class=""
			v-for="card in cards">
			<div class=""
					 @click="cardView(card)">
				<img class=""
						 :src="card.img_url">
				<div class="">
					<span class=""
					      v-for="mark in card.marks"
					      v-show="allDone"
					      :class="mark.player_style">
					</span>
				</div>
			</div>
		</article>
		
		<!--scaled card-->
		<article class=""
				v-if="view !== null">
			<img class=""
	        :src="view.img_url"
					@click="cardGuessed">
			<div class="bg"
					@click="closeView"></div>
		</article>
		
		<!--markers, seen while not all players choose-->
		<article class=""
			v-show="!allDone">
			<span class=""
			      v-for="mark in marks"
			      :class="mark.player_style">
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
    name: "PlayTable",
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
			  return this.game.action === 'all-guess-done';
		  },
		  player() {
			  return this.$store.getters.player;
		  },
		  game() {
			  return this.$store.getters.game;
		  },
		  iAmGameMaster() {
		  	return this.player.gameMaster;
		  },
		  canGuess() {
		  	return this.game.action === 'all-card-set';
		  },
	  },
	  methods: {
		  cardView(card) {
		  	this.view = card;
		  },
		  closeView() {
			  this.view = null;
		  },
		  cardGuessed(card) {
		  	
		  	if(!this.canGuess) {
		  		return;
			  }
			
		  	let data = {
		  		user_id: this.player.id,
				  room_id: this.game.id,
				  guess_id: card.id,
				  player_style: this.player.style,
			  };
			
			  $.ajax({
				  type: 'POST',
				  url: '/card-guess',
				  data: data,
				  success:(resp)=>{
					  this.view = null;
					  console.log(resp.iAmLast);
				  }
			  });
		  },
		  endRound() {
		    this.$emit('endRound');
		  }
	  },
  }
</script>

<style scoped>

</style>