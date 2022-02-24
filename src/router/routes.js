//引入路由组件
// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import addCartSuccess from '@/pages/addCartSuccess'
import shopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

/* 
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。 */
// const foo = () => {
//   return import('@/pages/Home')
// }
// 等于以上写法
// const foo = () => import(/* webpackChunkName: "Home" */'@/pages/Home')

export default [
  {
    path:'/Center',
    component:Center,
    meta:{isShow:true},
    //二级路由组件
    children:[
      {
        path:'myOrder',
        component:MyOrder
      },
      {
        path:'groupOrder',
        component:GroupOrder
      },
      {
        path:'/center',
        redirect:'/center/myorder'//重定向
      }
    ]
  },
  {
    name:'PaySuccess',
    path:'/PaySuccess',
    component:PaySuccess,
    meta:{isShow:true},
  },
  {
    name:'Pay',
    path:'/Pay',
    component:Pay,
    meta:{isShow:true},
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须是从购物车而来
      if(from.path == '/trade'){
        next()
      }else{
        //其他的路由组件而来，停留在当前
        next(false)
      }
    }
  },
  {
    name:'Trade',
    path:'/Trade',
    component:Trade,
    meta:{isShow:true},
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须是从购物车而来
      if(from.path == '/shopCart'){
        next()
      }else{
        //其他的路由组件而来，停留在当前
        next(false)
      }
    }
  },
  {
    name:'shopCart',
    path:'/shopCart',
    component:shopCart,
    meta:{isShow:true},
  },
  {
    name:'addCartSuccess',
    path:'/addCartSuccess',
    component:addCartSuccess,
    meta:{isShow:true},
    // props:true
  },
  {
    path:'/detail/:skuid',
    component:Detail,
    meta:{isShow:true}
  },

  {
    path:'/home',
    component:() => import(/* webpackChunkName: "group-lazy" */ '@/pages/Home'),
    meta:{isShow:true}
  },
  {
    name:'search',
    path:'/Search/:keyword?',
    component:Search,
    meta:{isShow:true},
    //路由组件能不能传递props数据？
    //布尔值写法:params
    // props:true

    //对象写法:额外的给路由组件传递一些props
    // props:{a:1,b:2}
    // 函数写法:可以把params参数，query参数，通过props传递给路由组件
    // props($route){
    //   return {
    //     keyWord:$route.params.keyWord,
    //     k:$route.query.k,
    //   }
    // }
  },
  {
    path:'/register',
    component:Register,
    meta:{isShow:false}
  },
  {
    path:'/login',
    component:Login,
    meta:{isShow:false}
  },
  {
    path:'*',
    redirect:'/home'//重定向
  }
]