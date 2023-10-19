/*
 * @Author: yvesyfzhang
 * @Date: 2022-04-06 20:29:17
 * @LastEditors: yvesyfzhang
 * @LastEditTime: 2022-04-07 10:39:38
 * @Description: file contentÍ
 * @FilePath: /vue3-cli/src/pages/sv/store/index.ts
 */

import Vuex from 'vuex';
import loginStore from './loginStore';

const state: any = {};
const store = new Vuex.Store({
	state,
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		loginStore
	},
	plugins: []
});

export default store;
