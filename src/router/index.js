//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter);

import routes from './routes'
// 引入store
import store from '@/store'

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push|replace
//第一个参数:告诉原来push方法，你往哪里跳转(传递哪些参数)
//第二个参数:成功的回调
//第三个参数:失败的回调
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject){
    //call||apply区别
    //相同点:都可以调用函数一次，都可以篡改函数的上下文一次
    //不同点:call与apply传递参数:call传递参数用逗号隔开,apply方法执行，传递数组
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}

VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve && reject){
    //call||apply区别
    //相同点:都可以调用函数一次，都可以篡改函数的上下文一次
    //不同点:call与apply传递参数:call传递参数用逗号隔开,apply方法执行，传递数组
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}

//配置路由
const router =  new VueRouter({
  routes,
  //滚动行为
  scrollBehavior(to,from,savedPosition){
    //返回的这个y=0，代表的滚动条在最上方
    return {y:0}
  }
})

//全局守卫，前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to,from,next)=>{
  //to:可以获取到你要跳转到哪个路由信息
  //from：可以获取道你从哪个路由而来的信息
  // next:放行函数 next()放行
  // next({path:'/login'}) //放行到指定的路由
  // console.log(to);

  //用户信息
  let name = store.state.user.userInfo.name
  //用户登陆了，才会有token，未登录一定不会有token
  let token = store.state.user.token 
  if(token){
    if(to.path == '/login'){
      next('/home')
    }else{
      // 登录，去的不是login【home|Search|detail|shopcart】
      //如果用户名已有
      if(name){
        next()
      }else{
        // 没有用户信息，派发action让仓库存储用户信息在跳转
        try {
          // 获取用户信息成
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token失效了获取不到 用户信息，重新登录
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  }else{
    // 未登录:不能去交易相关，不能去支付相关【pay|pausuccess】、不能去个人中心
    // 未登录去上面的这些路由----登录
    // 去的不是上面这些路由(home|search|shopCart)----放行
    let toPath = to.path
    if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
      // 把未登录的时候想去而没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect='+toPath)
    }else{
      next()
    }
  }
})

export default router