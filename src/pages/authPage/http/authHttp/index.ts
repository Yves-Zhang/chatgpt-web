import request from '../index'
import {
  cgi_register,
  cgi_login,
  cgi_signOut
} from './cgiConfig'


export const register_http = async (params: any) => {
  return await request.post(cgi_register, params)
}

export const login_http = async (params: any) => {
  return await request.post(cgi_login, params)
}

export const signOut_http = async (params: any) => {
  return await request.post(cgi_signOut, params)
}