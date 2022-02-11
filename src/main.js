import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from './components/TypeNav' 
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//引入路由
import router from '@/router/index.js'
//引入仓库
import store from '@/store'
//引入mockServe.js----mock数据
import '@/mock/mockServe.js'
//因如此swiper样式
import 'swiper/css/swiper.css'
Vue.config.productionTip = false

new Vue({
  //全局事件总线$bus的配置
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  //注册路由:底下的写法KV一致省略V【router小写的】
  //注册路由信息:当这里书写router的时候，组件身上都拥有$route，$router属性
  router,
  //注册仓库:组件实例的身上会多一个$store属性
  store
}).$mount('#app')
