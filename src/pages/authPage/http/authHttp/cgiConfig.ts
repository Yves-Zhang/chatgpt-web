import { cgiPath } from '../index'

// 注册
export const cgi_register = `${cgiPath}/api/user/register`

// 登录
export const cgi_login = `${cgiPath}/api/login/singIn`

// 退出
export const cgi_signOut = `${cgiPath}/api/login/signOut`

// 图形验证码
export const cgi_getCaptcha = `${cgiPath}/api/login/getCaptcha`

// 手机验证码
export const cgi_sendVerify = `${cgiPath}/api/login/sendVerify`

// 重置密码
export const cgi_resetPassword = `${cgiPath}/api/user/updatePasswordRequest`

// 微信登录
export const cgi_wxSingIn = `${cgiPath}/api/login/wxSingIn`