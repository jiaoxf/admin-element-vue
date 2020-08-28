import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
/*
  国际化
*/
// import locale from 'element-ui/lib/locale/lang/en' // 英文
import locale from 'element-ui/lib/locale/lang/zh-CN' // 中文
import '@/scss/element-variables.scss'

Vue.use(
  ElementUI, 
  { 
    // size: 'small',
    zIndex: 3000,
    locale
  }
)