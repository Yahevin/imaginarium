<template>
	<section>
		<article>
			<h3>Пора наконец сыграть!</h3>
			<form @submit="newPlayer($event)"
						:class="{ 'form--empty_nick': nickEmpty, 'form--empty_room': roomEmpty }"
			      ref="form"
			>
				<input class=""
			        type="text"
			        placeholder="Никнейм"
			        v-model="nickname"
				>
				<div>
					<div>
						<label class="" for="gameJoin">
							Присоединиться
						</label>
						<input class=""
					        id="gameJoin"
					        type="radio"
					        :value="true"
					        v-model="gameJoin"
						>
					</div>
					<div>
						<label class="" for="gameJoin">
							Начать партию
						</label>
						<input class=""
					        id="gameCreate"
					        type="radio"
					        :value="false"
					        v-model="gameJoin"
						>
					</div>
				</div>
				<input v-show="gameJoin"
					class=""
			        type="text"
			        placeholder="id комнаты"
			        v-model="roomId"
				>
				<input class="" type="submit">
			</form>
		</article>
	</section>
</template>

<script>
  import {store} from '../../js/store/index';
  export default {
    name: "Join",
    store,
    data() {
      return {
        nickname: '',
        roomId: null,
        gameJoin: false,
	      formSubmitted: false,
      }
    },
	  computed: {
		  nickEmpty() {
		  	return this.formSubmitted && this.nickname.length === 0;
		  },
		  roomEmpty() {
			  return this.formSubmitted
				  && this.gameJoin
				  && this.roomId.length === 0;
		  },
		  formFull() {
		  	return !this.nickEmpty || !this.roomEmpty;
		  }
	  },
    methods: {
	    newPlayer(event) {
		    event.preventDefault();
		    this.formSubmitted = true;
		    
		    if (this.formFull) {
		      if (this.gameJoin) {
		      	this.enterGame()
		      } else {
		      	this.createGame()
		      }
		    }
	    },
	    enterGame() {
	    //  ajax
		  //  if (success)
		    this.setPlayer();
		    this.$emit('start');
	    },
	    createGame() {
		    //  ajax
		    //  if (success)
		    this.setPlayer();
		    this.$emit('start');
	    },
	    setPlayer(data) {
		    this.$store.dispatch('setPlayer', data);
	    }
    },
  }
</script>

<style scoped>

</style>