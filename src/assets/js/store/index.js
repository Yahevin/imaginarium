import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    player: {
      id: null,
      status: '',
      gameMaster: false,
    },
    myTurn: false,
    game: {
      run: false,
      action: '',
    },
    handCards: [{
      img: 'url',
      hasMarker: false,
      playerStyle: ''
    }],
    tableCards: [{
      img: 'url',
      hasMarker: false,
      playerStyle: ''
    }],
    newCards:[{
      img: 'url',
      hasMarker: false,
      playerStyle: ''
    }],
    
  },
  actions: {
    setPlayer({commit}) {
      // ajax to set a player
      // .success( start commit)
  
      let note;
      
      commit('SET_PLAYER', note)
    },
    setPlayerStatus({commit}, status) {
      commit('SET_PLAYER', status)
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
    }
  },
  mutations: {
    SET_PLAYER(state, note) {
      state.player = note;
    },
    SET_PLAYER_STATUS(state, status) {
      state.player.status = status;
    },
    MY_TURN_START(state) {
      state.myTurn = true;
    },
    MY_TURN_END(state) {
      state.myTurn = false;
    },
    GAME_START(state) {
      state.game.run = true;
    },
    GET_TABLE_CARDS(state, cards) {
      state.tableCards.push(...cards);
    },
    GET_NEW_CARDS(state, cards) {
      state.handCards.push(...cards);
      state.newCards = cards;
    },
  },
  getters: {
    player(state) {
      return state.player
    },
    ownTurn(state) {
      return state.ownTurn
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
  },
  modules: {}
});