import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    foldMenu: false
  },
  mutations: {
    flodMenu(state) {
      state.foldMenu = !state.foldMenu;
    }
  },
  actions: {
  },
  modules: {
  }
})
