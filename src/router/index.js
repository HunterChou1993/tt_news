import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录组件
import login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: login,
  },
]

const router = new VueRouter({
  routes,
})

export default router
