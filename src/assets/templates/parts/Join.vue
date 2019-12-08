<template>
		<section class="join">
					<form class="join-form"
					      :class="{ 'form--empty_nick': nickEmpty, 'form--empty_room': roomEmpty }"
					      @submit="newPlayer($event)"
					      ref="form">
							<input class="join-form__input"
						        type="text"
						        placeholder="Никнейм"
						        v-model="nickName">
							<div class="join-method">
									<div class="join-radio">
											<label class="join-radio__label"
											       for="gameJoin">
												Присоединиться
											</label>
											<input class="join-radio__btn"
										        id="gameJoin"
										        type="radio"
										        :value="true"
										        v-model="gameJoin">
									</div>
									<div class="join-radio">
											<label class="join-radio__label"
											       for="gameCreate">
												Начать партию
											</label>
											<input class="join-radio__btn"
										        id="gameCreate"
										        type="radio"
										        :value="false"
										        v-model="gameJoin">
									</div>
							</div>
							<input class="join-form__input"
						        type="text"
						        placeholder="id комнаты"
										v-show="gameJoin"
										v-model="roomId">
							<input class="join-form__submit"
							       type="submit">
					</form>
		</section>
</template>

<script>
  import {store} from '../../js/store/index';
  export default {
    name: "Join",
    store,
    data() {
      return {
        nickName: '',
        roomId: null,
        gameJoin: false,
	      formSubmitted: false,
      }
    },
	  computed: {
		  nickEmpty() {
		  	return this.nickName.length === 0;
		  },
		  roomEmpty() {
			  return this.formSubmitted
				  && this.gameJoin
				  && this.roomId === null;
		  },
		  formFull() {
		  	return !this.nickEmpty && !this.roomEmpty;
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
	    async enterGame() {
		    await $.ajax({
			    type: 'POST',
			    url: '/user-join',
			    data: {
				    nickName: this.nickName,
				    roomId: this.roomId
			    },
			    success:(resp)=>{
			    	if (resp.success) {
					    this.setPlayer(resp);
				    }
			    },
		    });
	    },
	    async createGame() {
		    await $.ajax({
			    type: "POST",
			    url: '/party-create',
			    data: {
			    	nickName: this.nickName,
			    },
			    success:(resp)=>{
				    this.setPlayer(resp);
			    }
		    });
	    },
	    setPlayer(resp) {
		    let data = {
			    id: resp.user_id,
			    nickName: resp.nick_name,
			    style: resp.player_style,
			    gameMaster: resp.game_master,
		    };
		    this.$store.dispatch('setPlayer', data);
		    this.$store.dispatch('setGameId', resp.room_id);
		    this.$store.dispatch('setGameAction', resp.game_action);
		    this.$store.dispatch('getMyCards', {user_id: resp.user_id});
		    this.$store.dispatch('getPartyResults',resp.room_id);
		
		    this.$emit('start');
	    }
    },
  }
</script>

<style scoped>

</style>