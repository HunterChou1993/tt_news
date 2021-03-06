import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入 vant.js
import './utils/vant.js'
// 导入全局样式
import './styles/index.less'
// 导入 flexibale (给 rem 设置基准值)
import 'amfe-flexible'
import store from '@/store'
// 自己封装的过滤器
import '@/filters'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')
