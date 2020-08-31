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
        path: 'table',
        name: 'Table',
        component: () => import ('@/views/Components/Table'),
        meta: {
          title: '表格'
        }
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/Components/Form'),
        meta: {
          title: '表单'
        }
      }, 
      {
        path: 'dialog',
        name: 'Dialog',
        component: () =>
          import ('@/views/Components/Dialog'),
        meta: {
          title: '弹框'
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
