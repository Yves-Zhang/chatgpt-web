import { createApp } from 'vue';
import store from './store';
import App from './App.vue';
import axios from './http';
import router from './router'

import "@/common.scss"

// 设置 document.domain 属性为父级域名（包括顶级域名）相同的值
document.domain = 'example.com';

const _create = () => {
	const app = createApp(App);
	app.use(store);
	app.use(router);
	app.mount('#rootApp');
	app.config.globalProperties.$http = axios;
}

_create();

if ((module as any).hot) {
	console.log('开发环境，启用热加载更新！');
	(module as any).hot.accept();
}
