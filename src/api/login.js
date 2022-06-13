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

// 编辑用户个人资料
export function editInfo(data) {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data,
  })
}

// 编辑用户照片资料
export function uploadImg(data) {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data,
  })
}

// 刷新用户的token
// export function refreshToken() {
//   return request({
//     url:
//   })
// }
