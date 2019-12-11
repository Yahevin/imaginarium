<template>
	<section class="cards">
		<article class="cards-question">
			<span class="cards-question__text"
						v-show="!myTurn">
				{{ question }}
			</span>
			<input class="cards-question__input"
						 v-show="myTurn"
						 v-model="questionAsk">
		</article>
		<form class="cards-form"
					@submit="cardSet($event)">
			<article class="cards__grid">
				<div class="cards-radio"
				     v-for="(card,index) in myCards">
					<label class="cards-radio__label"
					       :for="'handCards-' + index"></label>
					<input class="cards-radio__btn"
					       :id="'handCards-' + index"
					       type="radio"
					       :value="card"
					       v-model="chosen">
					<img class="cards-radio__img"
					     :src="card.img_url">
				</div>
			</article>
			<input class="cards-form__submit"
			       v-show="canSet"
			       :disabled="submitDisabled"
			       type="submit">
		</form>
	</section>
</template>

<script>
  import {store} from '../../js/store/index';
  
  export default {
    name: "MineCards",
    store,
	  data() {
    	return {
		    chosen: null,
		    questionAsk: '',
		    didntSet: true,
	    }
	  },
	  computed: {
		  myCards() {
    		return this.$store.getters.handCards;
	    },
		  player() {
			  return this.$store.getters.player;
		  },
		  myTurn() {
			  return Boolean(this.$store.getters.player.gameMaster);
		  },
		  game() {
			  return this.$store.getters.game;
		  },
		  gameAction() {
		  	return this.game.action;
		  },
		  canSet() {
			  return this.game.action === 'game-start' && this.myTurn && this.didntSet
				  || this.game.action === 'gm-card-set' && this.didntSet;
		  },
		  question() {
			  return this.$store.getters.question;
		  },
		  submitDisabled() {
		  	return this.chosen === null || this.questionAsk.length === 0 && this.myTurn;
		  },
	  },
	  watch: {
      gameAction: function () {
	      this.didntSet = true;
      }
	  },
	  methods: {
      async cardSet(e) {
      	e.preventDefault();
	      this.didntSet = false;
	
	      await this.$store.dispatch('removeFromHand', this.chosen.id);
	      await this.noteTheCard();
	      
      	if (this.myTurn) {
		      await this.setQuestion();
	      }
      },
		  async setQuestion() {
      	let data = {
      		room_id: this.game.id,
		      question: this.questionAsk,
	      };
      	
			  await this.$store.dispatch('setQuestion', data);
		  },
		  async noteTheCard() {
			  let url = this.myTurn ? '/card-main' : '/card-fake',
				  data = {
					  id: this.chosen.id,
					  room_id: this.game.id,
					  user_id: this.player.id,
					  card_id: this.chosen.card_id,
					  img_url: this.chosen.img_url,
				  };
			
			  $.ajax({
				  type: 'POST',
				  url: url,
				  data: data,
				  success:()=>{
				  }
			  });
		  }
	  },
  }
</script>

<style scoped>

</style>