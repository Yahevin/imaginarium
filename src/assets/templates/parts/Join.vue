<template>
		<section>
				<article>
						<h3>Пора наконец сыграть!</h3>
						<form @submit="newPlayer($event)"
									:class="{ 'form--empty_nick': nickEmpty, 'form--empty_room': roomEmpty }"
						      ref="form">
								<input class=""
							        type="text"
							        placeholder="Никнейм"
							        v-model="nickName"
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
        nickName: '',
        roomId: null,
        gameJoin: false,
	      formSubmitted: false,
      }
    },
	  computed: {
		  nickEmpty() {
		  	return this.formSubmitted && this.nickName.length === 0;
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
	    async enterGame() {
		    await $.ajax({
			    type: 'POST',
			    url: '/user-join',
			    data: {
				    nickName: this.nickName,
				    roomId: this.roomId
			    },
			    success:(resp)=>{
				    this.setPlayer(resp);
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
		
		    this.$emit('start');
	    }
    },
  }
</script>

<style scoped>

</style>