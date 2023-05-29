const path = require('path')
module.exports = {
	// pageCode: 'tempProj' // 打包的文件目录名称，默认是文件夹名
	// pageTitle: 'tempProj' // 页面标题
	// testPathPrefix: '' // 发布测试页面到cos桶的路径前缀 
	// webpack: {
	// 	publicPath: '',
	// 	alias: {}
	// },
	// 不同环境 [dev | test | prod]，通过webpack.DefinePlugin设置变量； 使用：process.env.SV_VAR_ENV
	variable: {
		dev: {
			cgiPath: 'http://47.106.178.58:8081',
		},
		prod: {
			cgiPath: 'http://47.106.178.58:8081',
		}
	},
	// htmlConfig: {
	// 	scriptCDN: [],
	// 	styleCDN: []
	// },
	tailwindcssConfig: {
		configPath: path.resolve(__dirname, 'tailwind.config.js')
	}
};
