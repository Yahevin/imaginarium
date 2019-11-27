<template>
	<section>
		<!--all cards on table-->
		<form class="cards-form"
		      @submit="cardGuessed($event)">
			<article class="cards__grid">
				<div class="cards-radio"
				     v-for="(card,index) in tableCards">
					<label class="cards-radio__label"
					       :for="'tableCards-' + index"></label>
					<input class="cards-radio__btn"
					       :id="'tableCards-' + index"
					       type="radio"
					       :value="card"
					       v-model="chosen">
					<img class="cards-radio__img"
					     :src="card.img_url">
					<span class=""
					      v-for="mark in card.marks"
					      v-show="allDone"
					      :class="mark.player_style">
						.
					</span>
				</div>
			</article>
			<input class="cards-form__submit"
			       type="submit"
			       v-show="chosen !== null && canGuess">
		</form>
		
		<!--markers, seen while not all players choose-->
		<!--<article class=""-->
			<!--v-show="!allDone">-->
			<!--<span class=""-->
			      <!--v-for="mark in marks"-->
			      <!--:class="mark.player_style">-->
			<!--</span>-->
		<!--</article>-->
		
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
			  chosen: null,
		  }
	  },
	  computed: {
		  tableCards() {
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
		  marks() {
			  return this.$store.getters.marks;
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
		  cardGuessed(e) {
		  	e.preventDefault();
		  	
		  	if(!this.canGuess) {
		  		return;
			  }
			
		  	let data = {
		  		user_id: this.player.id,
				  room_id: this.game.id,
				  guess_id: this.chosen.id,
				  player_style: this.player.style,
			  };
			
			  $.ajax({
				  type: 'POST',
				  url: '/card-guess',
				  data: data,
				  success:(resp)=>{
					  this.view = null;
					  if (resp.iAmLast) {
					  	this.countTheScore();
					  }
				  }
			  });
		  },
		  countTheScore() {
			  $.ajax({
				  type: 'POST',
				  url: '/count-score',
				  data: {room_id: this.game.id},
				  success:()=>{
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