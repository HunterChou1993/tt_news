// 首页相关的接口
// 导入 axios 副本对象
import request from '@/utils/request.js'

// 获取用户的频道
export function getUserChannel() {
  return request({
    url: '/v1_0/user/channels',
  })
}

// 获取文章新闻推荐
export function getNewsList(params) {
  return request({
    url: '/v1_0/articles',
    params,
  })
}
