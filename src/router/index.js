import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'

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
				component: () => import('@/views/Index/index'),
				meta: {
					title: '首页',
					icon: 'el-icon-s-home',
					affix: true
				}
			}
		]
	},
	{
		path: '/components',
		component: Layout,
		hidden: true,
		redirect: 'button',
		meta: {
			title: '组件',
			icon: 'el-icon-s-grid'
			// permissions: ['admin']  // 权限
		},
		children: [
			{
				path: 'button',
				name: 'Button',
				component: () => import('@/views/Components/Button'),
				meta: {
					title: '按钮'
				}
			},
			{
				path: 'icon',
				name: 'Icon',
				component: () => import('@/views/Components/Icon'),
				meta: {
					title: '图标'
				}
			},
			{
				path: 'table',
				name: 'Table',
				component: () => import('@/views/Components/Table'),
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
				component: () => import('@/views/Components/Dialog'),
				meta: {
					title: '弹框'
				}
			},
			{
				path: 'steps',
				name: 'Steps',
				component: () => import('@/views/Components/Steps'),
				meta: {
					title: '步骤条'
				}
			},
			{
				path: 'drawers',
				name: 'Drawers',
				component: () => import('@/views/Components/Drawers'),
				meta: {
					title: '抽屉'
				}
			},
			{
				path: 'tree',
				name: 'Tree',
				component: () => import('@/views/Components/Tree'),
				meta: {
					title: '树结构'
				}
			},
			{
				path: 'richtext',
				name: 'Richtext',
				component: () => import('@/views/Components/Richtext'),
				meta: {
					title: '富文本编辑器'
				}
			}
		]
	}
	/* {
		path: '/function',
		component: Layout,
		hidden: true,
		redirect: '',
		meta: {
			title: '常用函数',
			icon: 'el-icon-chat-line-square'
			// permissions: ['admin']  // 权限
		},
		children: [
			{
				path: 'button',
				name: 'Button',
				component: () => import('@/views/Components/Button'),
				meta: {
					title: '按钮'
				}
			}
		]
	} */
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

export default router
