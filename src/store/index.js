import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'

import app from './modules/app'
import user from './modules/user'


Vue.use(Vuex)

/* export default new Vuex.Store({
    state: {
        foldMenu: false,
        permissionsShow: true,
		menuNav: [],
		leftMenu: [],
		menuActive: '',
		userInfo:{}
    },
    mutations: {
        flodMenu(state) {
            state.foldMenu = !state.foldMenu
        },
        choosePermissions(state) {
            state.permissionsShow = false
		},
		updateUserInfo(state, payload) {
			state.userInfo = payload
		}
    },
	actions: {
		getTopNav(context){
			console.log(context.state.userInfo)
			api.topMenu({ userNid: context.state.userInfo.userNid })
                .then(res => {
					if (res.code === 'SUCCESS') {
						context.state.menuNav = res.data
						console.log(context.state)
                        // this.headerRouter =
                        // this.getLeftMenu(res.data[0].id, userNid)
						// this.activeIndex = res.data[1].id
                        // this.getLeftMenu(res.data[1].id, this.userNid)
                        // this.getLeftMenu('100010002', '5f723d62-c9e4-4f7f-b5a0-cb40a372a615')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
		},
		getMenu: () => {
			this.$api.leftMenu({ menuId: id, userNid: '1'})
                .then(res => {
                    if (res.code === 'SUCCESS') {
                        // console.log(res.data)
                        let menus = res.data
                        sessionStorage.setItem('_c_unparseRoutes', JSON.stringify(menus))
                        ParseRouters(menus)
                        this.$store.state.leftMenu = this.$router.options.routes
                    }
                })
                .catch(err => {
                    console.log(err)
                })
		}
	},
    modules: {},
    plugins: [
        createPersistedState({
            storage: window.sessionStorage
        })
    ]
}) */


const store = new Vuex.Store({
    modules: {
        app,
        user
    },
	getters,
	plugins: [
    createPersistedState({
        storage: window.sessionStorage
    })
]

})

export default store


