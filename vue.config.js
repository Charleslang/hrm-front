module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'api': '@/api',
        'views': '@/views',
        'utils': '@/utils',
        'obj': '@/obj'
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '人事管理系统'
        return args
      })
  },
  // 跨域,所有请求必须加上 api, 如 api/user/login(真实路径其实是 /user/login)
  devServer: {
    proxy: {
      '/api': {
          target: 'http://localhost:8888', //API服务器的地址
          ws: true,  //代理websockets
          changeOrigin: true, // 虚拟的站点需要更管origin
          pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
              '^/api': ''
          }
      }
    }
  }
}