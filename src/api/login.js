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
