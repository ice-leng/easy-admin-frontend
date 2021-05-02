import request from './request'

/**
 * 登录
 * @param {Object} data 
 */
export const loginApi = data => request({ url: '/login', method: 'post', data,})

/* 登出 */
export const loginOutApi = data => request({ url: '/login/logout', method: 'post', data})

/* 刷新token */
export const loginRefreshApi = data => request({ url: '/login/refreshToken', method: 'post', data})