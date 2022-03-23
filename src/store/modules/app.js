const state = {
    foldMenu: false
}

const mutations = {
    flodMenu(state) {
        state.foldMenu = !state.foldMenu
    }
}
const actions = {
	toggleSideBar({ commit }) {
		commit('flodMenu')
	}
}

export default {
    namespaced: true,
    state,
	mutations,
	actions
}
