import Router from 'vue-router'
import router from '@/router'
let staticRouter = [
    {
        path: '/login',
        component: () => import('@/views/Login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
    {
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
    }
]
export function resetRouter() {
    const newRouter = new Router({
        routes: staticRouter
    })
    router.matcher = newRouter.matcher
}
