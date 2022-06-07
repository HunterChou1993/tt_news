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
  {
    path: '/layout',
    component: () => import('@/views/layout/index'),
    children: [
      { path: 'home', component: () => import('@/views/home') },
      { path: 'ask', component: () => import('@/views/ask') },
      { path: 'video', component: () => import('@/views/video') },
      { path: 'my', component: () => import('@/views/my') },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
