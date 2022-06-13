// 初始化 vuex 的
// 导入 vue & vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 导入操作token 的方法
import { getToken, setToken, delToken } from '@/utils/auth.js'
// 导入获取用户个人信息
import { getUserInfoApi } from '@/api/'
Vue.use(Vuex)

// 创建创库对象
const store = new Vuex.Store({
  state: {
    // token
    token: getToken() || {}, // 为了防止出现token 不存在报错
    // 存储用户信息
    userInfo: {},
  },
  mutations: {
    // 设置token
    setToken(state, token) {
      // token 保存到 vuex中
      state.token = token
      setToken(token)
    },
    // 给用户信息赋值
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    // 退出登录
    logout(state) {
      // 删除 localstorage 中的 token
      delToken()
      // 删除 vuex 中的token
      state.token = {}
      // 删除 vuex 中的 userInfo
      state.userInfo = {}
    },
  },
  actions: {
    async setUserInfo(context) {
      // 判断用户信息是否存在
      if (!context.state.userInfo.name) {
        // 用户信息不存在发送请求到服务
        const res = await getUserInfoApi()
        // 将数据交给mutations
        context.commit('setUserInfo', res.data.data)
      }
    },
  },
})

// 暴露出去
export default store
