module.exports = {
  lintOnSave:false, //关闭eslint提示
  devServer:{
    proxy:{
      '/api':{
        target:'http://39.98.123.211', 
        // pathRewrite:{'^/api':''}, //路径重写
      }
    }
  },
  //代理跨域
}