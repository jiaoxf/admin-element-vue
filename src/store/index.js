import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    foldMenu: false,
    permissionsShow: true
  },
  mutations: {
    flodMenu(state) {
      state.foldMenu = !state.foldMenu;
    },
    choosePermissions(state) {
      state.permissionsShow = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
