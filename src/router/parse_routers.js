import router from './index'
import { getAsyncRoutes } from './asyncRouter'

// 初始化路由信息对象
export default (menus, to = '/') => {
    const defRoutes = [
        {
            path: '/login',
            component: () => import('@/views/Login/index'),
            hidden: true
        },
        /*  {
            path: '/',
            component: () => import('@/views/layout'),
            redirect: '/index',
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: () => import('@/views/Index/index'),
                    meta: { title: '控制台', icon: 'zujian' }
                }
            ]
		} */
        {
            path: '/',
            component: () => import('@/views/Index/index')
        }
    ]

    const notFoundRoutes = [
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/404'),
            hidden: true
        },
        { path: '*', redirect: '/404', hidden: true }
    ]
    // 遍历路由数组去重组可用的路由
    const menuList = getAsyncRoutes(menus)
    // console.log(menuList)
    const routes = Object.values(menuList).concat(notFoundRoutes)
    const integralRoutes = defRoutes.concat(routes)
    router.options.routes = integralRoutes
    router.addRoutes(integralRoutes)
    // console.log(router.options)
    router.push({ path: to })
}
