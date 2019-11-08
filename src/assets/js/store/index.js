import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    player: {},
    myTurn: false,
    game: {
      run: false,
      action: '',
    }
  },
  actions: {
    setPlayer({commit}, note) {
      commit('SET_PLAYER', note)
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
    getCards({commit}) {
      // ajax to get cards
      // if(state.game.action === 'handsFree')
      // add 6 cards
      // .success( start commit)
      
      commit('GET_CARDS')
    }
  },
  mutations: {
    SET_PLAYER(state, note) {
      state.player = note;
    },
    MY_TURN_START(state) {
      state.myTurn = true;
    },
    MY_TURN_END(state) {
      state.myTurn = false;
    },
    GAME_START(state) {
      state.game.run = true;
    }
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
    }
  },
  modules: {}
});