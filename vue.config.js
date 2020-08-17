module.exports = {
  publicPath: '/',
  devServer: {
    // https: true, // https
    open: true,
    // host: 'localhost',
    // port: 3000,
    // 跨域
    proxy: {
      '/api': {
        target: 'http://login-test.ciftis.org.cn',
        // secure: false,  // https接口，配置参数
        // changeOrigin: true,  //是否跨域
        // pathRewrite:{
            // '^/api2/':'/'
        // }
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