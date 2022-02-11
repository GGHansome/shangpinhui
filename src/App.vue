<template>
  <div>
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
  components:{Header,Footer},
  mounted() {
    //派发一个action||获取商品分类三级列表的数据
    this.$store.dispatch('categoryList');
  },
}
</script>

<style>