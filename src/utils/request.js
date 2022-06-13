// 封装 axios
import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import router from '@/router'
// 创建 axios 的副本对象
const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net/',
  // baseURL: 'http://toutiao-app.itheima.net/',
  // baseURL: '/api',
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 获取 token
    const token = store.state.token.token
    if (token) {
      // 将 token 添加到请求头
      config.headers.Authorization = `Bearer ${token}`
    }
    // 成功的回调
    return config
  },
  (error) => {
    // 失败的回调
    return Promise.reject(error)
  }
)

const refInstance = axios.create({
  baseURL: 'http://toutiao.itheima.net/',
  // baseURL: 'http://toutiao-app.itheima.net/',
  // baseURL: '/api',
})

// 响应拦截器
instance.interceptors.response.use(
  // 响应正常时会触发这个回调
  // 200 201 204
  (response) => {
    return response
  },
  // 错误会触发这个回调
  // 400 404 401 500
  async (error) => {
    // 得到错误状态码
    const status = error.response.status
    if (status === 401) {
      // token过期
      // 得到refreshToken
      const refresh_token = store.state.token.refresh_token
      // 根据refresh获取新的token
      // 注意点 不能用instance发请求，一旦发请求会触发请求拦截器，用过期的token覆盖
      try {
        const res = await refInstance({
          url: '/v1_0/authorizations',
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        })
        // 将新的token替换原来的token
        store.commit('setToken', {
          token: res.data.data.token,
          refresh_token: refresh_token,
        })
        // 重新请求之前报错的请求
        return instance({
          url: error.config,
        })
      } catch {
        // 说明 refresh_token 也失效了
        // 跳转到登录页面并且提示过期
        Toast.fail('登录已经过期')
        router.push('/login')
        // 返回错误信息
        return Promise.reject(new Error('refresh_token已经过期'))
      }
    }
    return Promise.reject(error)
  }
)

// 暴露副本对象
export default instance
