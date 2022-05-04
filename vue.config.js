module.exports = {
  lintOnSave:false, //关闭eslint提示,
  productionSourceMap:false,
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn', 
        // pathRewrite:{'^/api':''}, //路径重写
      }
    }
  },
}