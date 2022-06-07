// 初始化 vuex 的
// 导入 vue & vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 导入操作token 的方法
import { getToken, setToken } from '@/utils/auth.js'
Vue.use(Vuex)

// 创建创库对象
const store = new Vuex.Store({
  state: {
    // token
    token: getToken() || {}, // 为了防止出现token 不存在报错
  },
  mutations: {
    // 设置token
    setToken(state, token) {
      // token 保存到 vuex中
      state.token = token
      setToken(token)
    },
  },
})

// 暴露出去
export default store
