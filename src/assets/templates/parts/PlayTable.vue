<template>
	<section>
		<article class="cards-question">
			<span>{{ question }}</span>
		</article>
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
					      :key="mark.id"
					      v-show="allDone"
					      :class="mark.player_style">
						.
					</span>
				</div>
			</article>
			<input class="cards-form__submit"
			       type="submit"
			       :disabled="!canSubmit"
			       v-show="canGuess">
		</form>
		
		<!--markers, seen while not all players choose-->
		<!--<article class=""-->
			<!--v-show="!allDone">-->
			<!--<span class=""-->
			      <!--v-for="mark in marks"-->
			      <!--:class="mark.player_style">-->
			<!--</span>-->
		<!--</article>-->
		
		<button class="cards-form__submit"
			v-show="allDone && iAmGameMaster"
			@click="endRound">
				Next round!
		</button>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex';
  import {store} from '../../js/store/index';
  
  export default {
    name: "PlayTable",
    store,
	  data() {
		  return {
		  	view: null,
			  chosen: null,
			  notGuessed: true,
		  }
	  },
	  computed: {
    	...mapGetters({
		    tableCards: 'tableCards',
		    player: 'player',
		    game: 'game',
		    marks: 'marks',
		    question: 'question',
	    }),
		  allDone() {
			  return this.game.action === 'all-guess-done';
		  },
		  iAmGameMaster() {
		  	return this.player.gameMaster;
		  },
		  gameAction() {
			  return this.game.action;
		  },
		  canGuess() {
		  	return this.game.action === 'all-card-set' && !this.iAmGameMaster && this.notGuessed;
		  },
		  canSubmit() {
    		return this.canGuess && this.chosen !== null;
		  }
	  },
	  watch: {
		  gameAction: function () {
			  this.notGuessed = true;
		  }
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
			  this.notGuessed = false;
			  
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
				  },
				  error:()=>{
					  this.notGuessed = true;
				  },
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