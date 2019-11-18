import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    player: {
      id: null,
      nickName: '',
      playerStyle: '',
      gameMaster: false,
    },
    game: {
      id: null,
      action: '',
    },
    handCards: [{
      img: 'url',
      playerStyle: ''
    }],
    tableCards: [{
      img: 'url',
      hasMarker: false,
      playerStyle: ''
    }],
    newCards:[{
      img: 'url',
      playerStyle: ''
    }],
    party: [{
      id: 237,
      position: 0,
      nickName: 'Horror House',
      playerStyle: ''
    }],
  },
  actions: {
    setPlayer({commit}, note) {
      commit('SET_PLAYER', note)
    },
    setGameId({commit},id) {
      commit('SET_GAME_ID',id)
    },
    setGameAction({commit},action) {
      commit('SET_GAME_ACTION',action)
    },
    myTurnStart({commit}) {
      commit('MY_TURN_START')
    },
    myTurnEnd({commit}) {
      commit('MY_TURN_END')
    },
    gameStart({commit}) {
      commit('GAME_START')
    },
    getNewCards({commit}) {
      // ajax to get cards
      // if(state.player.status === 'handsFree')
      // add 6 cards
      // .success( start commit)
      // cards = response;
  
      let cards=[];
      
      commit('GET_NEW_CARDS', cards)
    },
    getTableCards({commit}) {
      // ajax to get cards
      // .success( start commit)
      // cards = response;
      
      let cards=[];
      
      commit('GET_TABLE_CARDS', cards)
    },
    getPartyResults({commit}, data) {
      // ajax get leader board
      
      let results = data;
      
      commit('GET_PARTY_RESULTS', results)
    }
  },
  mutations: {
    SET_PLAYER(state, note) {
      state.player = note;
    },
    SET_GAME_ID(state,id) {
      state.game.id = id;
    },
    SET_GAME_ACTION(state,action) {
      state.game.action = action;
    },
    MY_TURN_START(state) {
      state.player.gameMaster = true;
    },
    MY_TURN_END(state) {
      state.player.gameMaster = false;
    },
    GET_TABLE_CARDS(state, cards) {
      state.tableCards.push(...cards);
    },
    GET_NEW_CARDS(state, cards) {
      state.handCards.push(...cards);
      state.newCards = cards;
    },
    GET_PARTY_RESULTS(state,results) {
      state.party = results;
    }
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
    }
  },
  modules: {}
});