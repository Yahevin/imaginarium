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
    setPlayerRole({commit}, role) {
      commit('SET_PLAYER_ROLE', role)
    },
    setPlayerStyle({commit}, data) {
      $.ajax({
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
    getNewCards({commit}, data) {
      $.ajax({
        type: 'POST',
        url: '/get-new-cards',
        data: data,
        success:(resp)=>{
          commit('GET_NEW_CARDS', resp)
        }
      });
    },
    getMyCards({commit},data) {
      $.ajax({
        type: 'POST',
        url: '/get-my-cards',
        data: data,
        success:(resp)=>{
          commit('GET_MY_CARDS', resp)
        }
      });
    },
    getTableCards({commit},data) {
      $.ajax({
        type: 'POST',
        url: '/table-cards',
        data: data,
        success:(resp)=>{
          commit('GET_TABLE_CARDS', resp)
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
    GET_TABLE_CARDS(state, cards) {
      state.tableCards.push(...cards);
    },
    GET_NEW_CARDS(state, cards) {
      state.handCards.push(...cards);
      state.newCards = cards;
    },
    GET_MY_CARDS(state, cards) {
      state.handCards.push(...cards);
    },
    GET_PARTY_RESULTS(state,results) {
      state.party = results;
    },
    CLEAR_THE_TABLE(state) {
      state.tableCards = [];
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