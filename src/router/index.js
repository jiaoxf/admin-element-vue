import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import ('@/views/Index/index'),
        meta: {
          title: '首页',
          icon: 'el-icon-s-home',
          affix: true,
        },
      }, 
    ],
  },
  {
    path: '/components',
    component: Layout,
    hidden: true,
    redirect: 'button',
    meta: {
      title: '组件',
      icon: 'el-icon-s-grid',
      // permissions: ['admin']  // 权限
    },
    children: [
      {
        path: 'button',
        name: 'Button',
        component: () =>
          import ('@/views/Components/Button'),
        meta: {
          title: '按钮',
        },
      },
      {
        path: 'icon',
        name: 'Icon',
        component: () => import ('@/views/Components/Icon'),
        meta: {
          title: '图标',
        },
      },
      {
        path: 'Table',
        name: 'Table',
        component: () => import ('@/views/Components/table'),
        meta: {
          title: '表格'
        }
      }
    ],
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
