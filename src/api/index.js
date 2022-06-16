// 统一管理方法
import { getUserChannel, getNewsList } from './home'
import { login, getUserInfo, editInfo, uploadImg } from './login'

// 暴露方法
export const loginApi = login
export const getUserInfoApi = getUserInfo
export const editInfoApi = editInfo
export const uploadApi = uploadImg
export const getUserChannelApi = getUserChannel
export const getNewsListApi = getNewsList
