import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from './components/TypeNav' 
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import {Button,MessageBox} from 'element-ui'
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

Vue.component(Button.name,Button)
// ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入路由
import router from '@/router/index.js'
//引入仓库
import store from '@/store'
//引入mockServe.js----mock数据
import '@/mock/mockServe.js'
//引入swiper样式
import 'swiper/css/swiper.css'
Vue.config.productionTip = false

// 统一接口api文件里面全部请求函数
import * as API from '@/api'

import atm from '@/assets/atm.gif'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: atm,
})

// 引入自定义插件
import myPlugins from './plugin/myPlugins'
Vue.use(myPlugins,{
  name:'upper'
})

//引入表单校验插件
import '@/plugin/validate'
// 注册插件
new Vue({
  //全局事件总线$bus的配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: h => h(App),
  //注册路由:底下的写法KV一致省略V【router小写的】
  //注册路由信息:当这里书写router的时候，组件身上都拥有$route，$router属性
  router,
  //注册仓库:组件实例的身上会多一个$store属性
  store
}).$mount('#app')
