<template>
	<section class="cards">
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
			       :disabled="chosen === null && canSet"
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
			  return this.$store.getters.player.gameMaster;
		  },
		  game() {
			  return this.$store.getters.game;
		  },
		  canSet() {
			  return this.game.action === 'game-start' && this.myTurn
				  || this.game.action === 'gm-card-set';
		  }
	  },
	  methods: {
      cardSet(e) {
      	e.preventDefault();
      	this.$store.dispatch('removeFromHand', this.chosen.id);
      	
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
			      this.$emit('cardSetDone');
		      }
	      });
      },
	  },
  }
</script>

<style scoped>

</style>