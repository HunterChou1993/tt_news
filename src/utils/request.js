// 封装 axios
import axios from 'axios'
import store from '@/store'
// 创建 axios 的副本对象
const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net/',
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

// 暴露副本对象
export default instance
