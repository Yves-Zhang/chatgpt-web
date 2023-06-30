import request from '../index'
import {
  cgi_register,
  cgi_login,
  cgi_signOut,
  cgi_getCaptcha,
  cgi_sendVerify
} from './cgiConfig'

// 注册
export const register_http = async (params: any) => {
  return await request.post(cgi_register, params)
}

// 登录
export const login_http = async (params: any) => {
  return await request.post(cgi_login, params)
}

// 退出
export const signOut_http = async (params: any) => {
  return await request.post(cgi_signOut, params)
}

// 图形验证码
export const getCaptcha_http = async (params: any) => {
  return await request.post(cgi_getCaptcha, params)
}

// 手机验证码
export const sendVerify_http = async (params: any) => {
  return await request.post(cgi_sendVerify, params)
}