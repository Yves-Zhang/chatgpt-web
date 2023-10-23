import { cgiPath } from '../index'

// 注册
export const cgi_register = `${cgiPath}/api/user/user/register`

// 登录
export const cgi_login = `${cgiPath}/api/user/login/singIn`

// 退出
export const cgi_signOut = `${cgiPath}/api/user/login/signOut`

// 图形验证码
export const cgi_getCaptcha = `${cgiPath}/api/user/login/getCaptcha`

// 手机验证码
export const cgi_sendVerify = `${cgiPath}/api/user/login/sendVerify`

// 重置密码
export const cgi_resetPassword = `${cgiPath}/api/user/user/updatePasswordRequest`

// 微信登录
export const cgi_wxSingIn = `${cgiPath}/api/user/login/wxSingIn`