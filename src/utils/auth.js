// 封装操作 token 的方法
// 统一定义一个token 的 key
const MYTOKEN = 'MyTT-token'

// 保持 token
export function setToken(value) {
  // localStorage 只能保存字符串
  window.localStorage.setItem(MYTOKEN, JSON.stringify(value))
}

// 获取token
export function getToken() {
  return JSON.parse(window.localStorage.getItem(MYTOKEN))
}

// 删除token
export function delToken() {
  window.localStorage.removeItem(MYTOKEN)
}
