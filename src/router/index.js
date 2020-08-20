import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import ('../views/Home.vue'),
    redirect: 'home',
    children:[
      {
        path: '/home',
        component: () =>
          import ('../views/HomeEcharts/index.vue')
      },
      {
        path: '/components',
        component: () =>
          import ('../views/Components/index.vue')
      }
    ]
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
