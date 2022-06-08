import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录组件
import login from '@/views/login'
// 导入store
import store from '@/store'
// 导入轻提示
import { Toast } from 'vant'

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
      {
        path: 'my',
        component: () => import('@/views/my'),
        meta: {
          needLogin: true, // 当前路由需要登录
        },
      },
    ],
  },
  { path: '/my/edit', component: () => import('@/views/my/edit.vue') },
]

const router = new VueRouter({
  routes,
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 判断当前路由是否需要登录
  const needLogin = to.meta.needLogin
  if (needLogin) {
    // 需要登录
    // 判断是否携带token
    const token = store.state.token.token
    if (token) {
      next()
    } else {
      // 无token
      // 提示未登录
      Toast.fail('您还没有登录')
      // 保存当前访问的路径
      next(`/login?url=${to.path}`)
    }
  } else {
    // 不需要登录
    next()
  }
})

export default router
