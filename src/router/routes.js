//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import addCartSuccess from '@/pages/addCartSuccess'
import shopCart from '@/pages/ShopCart'
export default [
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
    component:Home,
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