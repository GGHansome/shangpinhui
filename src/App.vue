<template>
  <div>
    <h1 v-upper="msg"></h1>
    <Header/>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: 'App',
  data() {
    return {
      msg:'abc'
    }
  },
  components:{Header,Footer},
  mounted() {
    //派发一个action||获取商品分类三级列表的数据
    this.$store.dispatch('categoryList');
    //获取用户信息在首页展示
    // this.$store.dispatch('getUserInfo')
  },
}
</script>

<style>