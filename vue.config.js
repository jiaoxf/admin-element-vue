const WebpackBar = require('webpackbar');
// const path = require('path');
module.exports = {
	publicPath: '/',
	configureWebpack() {
		return {
			plugins: [
				new WebpackBar({
					color: "#1cd39b",
					name: "Panda Admin"
				}),
			],
		};
	},
	chainWebpack: config => {
		const oneOfsMap = config.module.rule('scss').oneOfs.store
		oneOfsMap.forEach(item => {
			item
				.use('sass-resources-loader')
				.loader('sass-resources-loader')
				.options({
					// 要公用的scss的路径
					resources: './src/scss/_var.scss'
				})
				.end()
		})
	},
	devServer: {
		// https: true, // https
		open: true,
		// host: 'localhost',
		// port: 3000,
		// 跨域
		proxy: {
			'/api': {
				target: 'http://login-test.ciftis.org.cn',
				secure: false, // https接口，配置参数
				changeOrigin: true, //是否跨域
				pathRewrite: {
					'^/api2/': '/'
				}
			}
		},
		historyApiFallback: true
	},
	/* resolve: {
	  alias: {
	    // 设置路径代理
	    '@': resolve('src'),
	    'components': resolve('src/components'),
	    'api': resolve('src/api'),
	    'icons': resolve('src/icons'),
	    '#': resolve('src/assets'),
	    'utils': resolve('src/utils')
	  }
	} */
}