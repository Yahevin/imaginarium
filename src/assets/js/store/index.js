import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    player: {
      id: null,
      nickName: null,
      style: null,
      gameMaster: false,
    },
    game: {
      id: null,
      action: '',
    },
    handCards: [],
    tableCards: [],
    newCards:[],
	  marks: [],
    party: [{
      id: 237,
      position: 0,
      nickName: 'Horror House',
      playerStyle: ''
    }],
    question: '',
  },
  actions: {
    setPlayer({commit}, note) {
      commit('SET_PLAYER', note)
    },
    setPlayerRole({commit}, role) {
      commit('SET_PLAYER_ROLE', role)
    },
    async setPlayerStyle({commit}, data) {
      await $.ajax({
        type: 'POST',
        url: '/set-style',
        data: data,
        success:()=>{
          commit('SET_PLAYER_STYLE', data.player_style);
        }
      });
    },
    setGameId({commit},id) {
      commit('SET_GAME_ID',id)
    },
    setGameAction({commit},action) {
      commit('SET_GAME_ACTION',action)
    },
    async setQuestion({commit},data) {
      await $.ajax({
        type: 'POST',
        url: '/set-question',
        data: data,
        success:()=>{
          commit('SET_QUESTION', data.question)
        }
      });
    },
    async getQuestion({commit},data) {
      await $.ajax({
        type: 'POST',
        url: '/get-question',
        data: data,
        success:(resp)=>{
          commit('GET_QUESTION', resp.question)
        }
      });
    },
    async getNewCards({commit}, data) {
      await $.ajax({
        type: 'POST',
        url: '/get-new-cards',
        data: data,
        success:(resp)=>{
          commit('GET_NEW_CARDS', resp)
        }
      });
    },
    async getMyCards({commit},data) {
      await $.ajax({
        type: 'POST',
        url: '/get-my-cards',
        data: data,
        success:(resp)=>{
          commit('GET_MY_CARDS', resp)
        }
      });
    },
    async getTableCards({commit},data) {
      await $.ajax({
        type: 'POST',
        url: '/table-cards',
        data: data,
        success:(resp)=>{
          commit('GET_TABLE_CARDS', resp)
        }
      });
    },
    async getMarks({commit}, data) {
      await $.ajax({
			  type: 'POST',
			  url: '/get-marks',
			  data: data,
			  success:(resp)=>{
				  commit('GET_MARKS', resp)
			  }
		  });
	  },
    getPartyResults({commit}, data) {
      // ajax get leader board

      commit('GET_PARTY_RESULTS', data)
    },
    clearTheTable({commit}) {
      commit('CLEAR_THE_TABLE')
    },
    removeFromHand({commit}, id) {
      commit('REMOVE_FROM_HAND', id)
    }
  },
  mutations: {
    SET_PLAYER(state, note) {
      state.player = note;
    },
    SET_PLAYER_ROLE(state,role) {
      state.player.gameMaster = role;
    },
    SET_PLAYER_STYLE(state,style) {
      state.player.style = style;
    },
    SET_GAME_ID(state,id) {
      state.game.id = id;
    },
    SET_GAME_ACTION(state,action) {
      state.game.action = action;
    },
    SET_QUESTION(state,question) {
      state.question = question;
    },
    GET_QUESTION(state,question) {
      state.question = question;
    },
    GET_TABLE_CARDS(state, cards) {
      state.tableCards = cards;
    },
    GET_NEW_CARDS(state, cards) {
      state.handCards.push(...cards);
      state.newCards = cards;
    },
    GET_MY_CARDS(state, cards) {
      state.handCards = cards;
    },
    GET_PARTY_RESULTS(state,resp) {
      state.party = resp;
    },
	  GET_MARKS(state, resp) {
		  state.marks = resp;
		  state.tableCards.forEach((card)=>{
		  	card.marks = [];
		  	resp.forEach((mark)=>{
		  		if(card.id === mark.guess_id) {
		  		  card.marks.push(mark)
				  }
			  })
		  })
	  },
    CLEAR_THE_TABLE(state) {
      state.tableCards = [];
    },
    REMOVE_FROM_HAND(state,id) {
      state.handCards.forEach((item,index)=>{
        if (item.id === id) {
          state.handCards.splice(index,1);
        }
      });
    },
  },
  getters: {
    player(state) {
      return state.player
    },
    game(state) {
      return state.game
    },
    tableCards(state) {
      return state.tableCards
    },
    handCards(state) {
      return state.handCards
    },
    newCards(state) {
      return state.newCards
    },
    party(state) {
      return state.party
    },
	  marks(state) {
    	return state.marks
	  },
    question(state) {
      return state.question
    },
  },
  modules: {}
});