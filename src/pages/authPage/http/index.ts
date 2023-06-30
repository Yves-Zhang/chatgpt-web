/*
 * @Author: yvesyfzhang
 * @Date: 2022-04-08 16:51:39
 * @LastEditors: yvesyfzhang
 * @LastEditTime: 2022-04-08 17:02:18
 * @Description: file content
 * @FilePath: /cli/template/src/pages/tempProj/http/index.ts
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const cgiPath: string = `${process.env.SV_VAR_cgiPath}`


const instance = axios.create({
  // withCredentials: true, // 允许携带 Cookies
});

// 请求拦截
instance.interceptors.request.use((config: AxiosRequestConfig) => {
	return config;
});

// 响应拦截
instance.interceptors.response.use(
	(response: AxiosResponse<any>) => {
		if (response.status === 200) {
			return response.data;
		} else {
			return Promise.reject(response.data.msg);
		}
	},
	(error: any) => {
		if (error.response && error.response.status === 400) {
      return Promise.reject(error.response.data);
    }
		return Promise.reject(error);
	}
);

export default instance;