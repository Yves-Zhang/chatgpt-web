import { createApp } from 'vue';
import store from './store';
import App from './App.vue';
import axios from './http';

const app = createApp(App);

app.use(store);
app.mount('#rootApp');
app.config.globalProperties.$http = axios;

if ((module as any).hot) {
	console.log('开发环境，启用热加载更新！');
	(module as any).hot.accept();
}
