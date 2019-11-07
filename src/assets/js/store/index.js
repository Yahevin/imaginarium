import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    notes: []
  },
  actions: {
    addNote({commit}, note) {
      commit('ADD_NOTE', note)
    }
  },
  mutations: {
    ADD_NOTE(state, note) {
      state.notes.push(note)
    }
  },
  getters: {
    notes(state) {
      return state.notes
    }
  },
  modules: {}
});