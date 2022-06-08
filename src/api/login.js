// 封装所有登录相关的网络请求
import request from '@/utils/request.js'

// 用户认证
export function login(data) {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data,
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/v1_0/user/profile',
    // 向请求头添加参数
  })
}

// 刷新用户的token
// export function refreshToken() {
//   return request({
//     url:
//   })
// }
