import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getUserNid } from '@/utils/auth'
import GetRouter from '@/router/parse_routers'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    // next()
    const hasToken = getUserNid()
    // if (hasToken) {
    // 	if (to.path === '/login') {
    // 		console.log('登录')
    //         next({ path: '/index' })
    //     } else {
    //         console.log(111)
    // 		const accessRoutes = await store.dispatch('user/getLeftMenu')
    // 		router.addRoutes(accessRoutes)
    // 		console.log(accessRoutes)
    // 		console.log(router.options)
    //         next()

    //     }
    //     if (to.fullPath === '/index') {
    //         if (store.state.user.menuActive == '') {
    //             // store.state.user.menuActive = '100010002'
    //             await store.commit('user/SET_MENUACTIVE', '100010002')
    //         }
    //         if (store.state.user.menuNav.length == 0) {
    //             await store.dispatch('user/getTopNav')
    //         }
    //         if (store.state.user.leftMenu == 0) {
    //             const accessRoutes = await store.dispatch('user/getLeftMenu')
    //             router.addRoutes(accessRoutes)
    //             console.log(router)
    //             /* if (store.state.user.menuActive == '100010002') {
    //                 router.push('/productionYear')
    //             } */
    //         }
    //         next({ path: '/index' })
    //     } else {
    //         next()
    //     }
    // } else {
    // 	next()
    // }
    if (hasToken) {
        if (to.path === '/login') {
            next({ name: 'index' })
        } else {
            try {
				if (store.state.user.menuActive == '') {
					store.state.user.menuActive = '100010002'
                    await store.commit('user/SET_MENUACTIVE', '100010002')
                }
                if (store.state.user.menuNav.length == 0) {
                    await store.dispatch('user/getTopNav')
                }
                if (store.state.user.leftMenu.length == 0) {
					let list = await store.dispatch('user/getLeftMenu')
					GetRouter(list)
					router.push('/')
                }
                // next()
                next()
            } catch (error) {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
        }
    }
})
