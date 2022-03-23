import api from '@/api/index'
import { Message } from 'element-ui'
import { getToken, setUserId, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import GetRouter from '@/router/parse_routers'
import { getAsyncRoutes } from '@/router/asyncRouter'

const getDefaultState = () => {
    return {
        userIndex: getToken(),
        menuNav: [],
        leftMenu: [],
        menuActive: '',
        userInfo: {}
    }
}
const state = getDefaultState()

const mutations = {
    RESET_STATE: state => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USER_NID: (state, userNid) => {
        state.userNid = userNid
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_MENUACTIVE: (state, menuActive) => {
        console.log(state, menuActive)
        state.menuActive = menuActive
    },
    SET_LEFTMENU: (state, leftMenu) => {
        state.leftMenu = leftMenu
    },
    SET_USERINFO(state, payload) {
        state.userInfo = payload
    },
    SET_USER_TOKEN(state, token) {
        state.userToken = token
    }
}

const actions = {
    login({ commit }, userInfo) {
        const { userId, userPwd } = userInfo
        return new Promise((resolve, reject) => {
            api.loginApi({ userId: userId.trim(), userPwd: userPwd })
                .then(response => {
                    console.log(response)
                    if (response.code === 'SUCCESS') {
                        const { data } = response
                        console.log(data)
                        commit('SET_USER_TOKEN', data.token)
                        commit('SET_USER_NID', data.userNid)
                        commit('SET_USERINFO', data)
                        setToken(data.token)
                        setUserId(data.userNid)
                        resolve(response)
					} else {
						console.log(response)
                        Message.error(response.message)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getTopNav(context) {
        api.topMenu({ userNid: context.state.userNid })
            .then(res => {
                if (res.code === 'SUCCESS') {
                    context.state.menuNav = res.data
                    sessionStorage.setItem('TOPMENU', res.data)
                    // this.headerRouter =
                    // this.getLeftMenu(res.data[0].id, userNid)
                    // this.activeIndex = res.data[1].id
                    // this.getLeftMenu(res.data[1].id, this.userNid)
                    // this.getLeftMenu('100010002', '5f723d62-c9e4-4f7f-b5a0-cb40a372a615')
                } else {
                    sessionStorage.clear()
                    resetRouter()
                    commit('RESET_STATE')
                }
            })
            .catch(err => {
                console.log(err)
            })
    },
    getLeftMenu(context) {
        return new Promise((resolve, reject) => {
            api.leftMenu({ menuId: context.state.menuActive, userNid: context.state.userNid })
                .then(res => {
                    if (res.code === 'SUCCESS') {
                        // console.log(res.data)
                        let menus = res.data
                        /* let a = {
                            component: 'layout',
                            hidden: 'false',
                            id: 1,
                            meta: '',
                            name: 'A',
                            path: '',
                            pid: 100010004,
                            redirect: '',
                            meta: {
                                title: '视频异常',
                                icon: 'zhibiao',
                                iframePath: 'http://www.cdraindrop.top'
                            },
                            children: [
                                {
                                    id: 1000100050001,
                                    pid: 1,
                                    path: '/A1',
                                    name: 'A1',
                                    component: 'FlowChart/chart',
                                    redirect: '',
                                    hidden: 'false',
                                    meta: {
                                        title: '指标异常监测1111',
                                        icon: 'zhibiao',
                                        iframePath: 'https://www.baidu.com'
                                    },
                                    children: [
                                        {
                                            id: 1000100050001,
                                            pid: 1,
                                            path: '/AA1',
                                            name: 'AA1',
                                            component: 'FlowChart/chart',
                                            redirect: '',
                                            hidden: 'false',
                                            meta: {
                                                title: '指标异常监测222',
                                                icon: 'zhibiao',
                                                iframePath: 'http://www.cdraindrop.top'
                                            },
                                            children: [
                                                {
                                                    id: 1000100050001,
                                                    pid: 1,
                                                    path: '/AAA1',
                                                    name: 'AAA1',
                                                    component: 'FlowChart/chart',
                                                    redirect: '',
                                                    hidden: 'false',
                                                    meta: {
                                                        title: '指标异常监测AAA1',
                                                        icon: 'zhibiao',
                                                        iframePath: 'http://www.cdraindrop.top'
                                                    }
                                                },
                                                {
                                                    id: 1000100050001,
                                                    pid: 1,
                                                    path: '/AAA2',
                                                    name: 'AAA2',
                                                    component: 'FlowChart/chart',
                                                    redirect: '',
                                                    hidden: 'false',
                                                    meta: {
                                                        title: '指标异常监测AAA2',
                                                        icon: 'zhibiao',
                                                        iframePath: 'https://www.baidu.com'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            id: 1000100050001,
                                            pid: 1,
                                            path: '/AA2',
                                            name: 'AA2',
                                            component: 'FlowChart/chart',
                                            redirect: '',
                                            hidden: 'false',
                                            meta: {
                                                title: '指标异常监测222',
                                                icon: 'zhibiao',
                                                iframePath: 'http://www.cdraindrop.top'
                                            }
                                        }
                                    ]
                                },
                                {
                                    id: 1000100050001,
                                    pid: 1,
                                    path: '/A2',
                                    name: 'A2',
                                    component: 'FlowChart/chart',
                                    redirect: '',
                                    hidden: 'false',
                                    meta: {
                                        title: '指标异常监测1111',
                                        icon: 'zhibiao',
                                        iframePath: 'http://www.cdraindrop.top'
                                    }
                                }
                            ],
                            hidden: 'false'
                        }
                        menus.push(a) */
                        console.log(menus, '获取的菜单')
                        // const arrList = getAsyncRoutes(menus)
                        sessionStorage.setItem('_c_unparseRoutes', JSON.stringify(menus))
                        context.commit('SET_LEFTMENU', menus)
                        resolve(menus)
                    } else {
                        sessionStorage.clear()
                        resetRouter()
                        commit('RESET_STATE')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
    },
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            api.loginOut()
                .then(() => {
                    sessionStorage.clear()
                    resetRouter()
                    commit('RESET_STATE')
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
