import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/plugins'
import echarts from 'echarts'

import '@/scss/global.scss'
import '@/assets/iconfont/iconfont.js'
import IconFont from '@/components/component/IconFont'
Vue.component('icon-font', IconFont)
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import utils from '@/utils/utils'
import img from '@/utils/img'
import { GLOBLE_CONFIG } from './config'


Vue.use(Avue)
Vue.use(utils)
Vue.prototype.$echarts = function(el) {
    return echarts.init(el, null, { renderer: 'svg' })
}
Vue.prototype.$images = img
Vue.prototype.$utils = utils
Vue.prototype.$baseUrl = GLOBLE_CONFIG.host
Vue.config.productionTip = false

import api from '@/api/index'
Vue.prototype.$api = api
import '@/permission'


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')



