const WebpackBar = require('webpackbar')
// const path = require('path');
module.exports = {
    publicPath: './',
    configureWebpack() {
        return {
            plugins: [
                new WebpackBar({
                    color: '#0062ab',
                    name: 'LOMON-LAND'
                })
            ]
        }
    },
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item.use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    // 要公用的scss的路径
                    resources: './src/scss/variables.scss'
                })
                .end()
        })
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },

    devServer: {
        // https: true, // https
        open: true,
        // host: 'localhost',
        port: 4004,
        // 跨域
        /* proxy: {
			'/api': {
				target: 'http://www.cdraindrop.top',
				secure: false, // https接口，配置参数
				changeOrigin: true, //是否跨域
				pathRewrite: {
					'^/api': 'http://www.cdraindrop.top'
				}
			}
		}, */
        historyApiFallback: true
    }
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
