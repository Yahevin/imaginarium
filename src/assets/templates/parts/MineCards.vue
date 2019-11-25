<template>
	<section class="cards">
		<article class="cards-wrap">
			<div class="cards-item"
			     v-for="card in myCards"
					 @click="cardSet(card)">
				<img class=""
					:src="card.img_url">
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
		  myCards() {
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
			  return this.game.action === 'game-start' && this.myTurn
				  || this.game.action === 'gm-card-set';
		  }
	  },
	  methods: {
      cardSet(card) {
      	if (!this.canSet) {
      		return
	      }
      	this.$store.dispatch('removeFromHand', card.id);
      	
	      let url = this.myTurn ? '/card-main' : '/card-fake',
		        data = {
      		    id: card.id,
			        room_id: this.game.id,
			        user_id: this.player.id,
			        card_id: card.card_id,
			        img_url: card.img_url,
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