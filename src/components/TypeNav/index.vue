<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name='sort'>
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式导航实现路由跳转与传递参数 -->
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex===index}">
              <h3 @mouseenter="changeIndex(index)" >
                <a :data-categoryLevel="1" :data-categoryName="c1.categoryName" :data-categoryId="c1.categoryId">{{c1.categoryName}}</a>
                <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
              </h3>
              <!-- 二级、三级分类 -->
              <div class="item-list clearfix" :style="{display:currentIndex===index?'block':'none'}">
                <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryLevel="2" :data-categoryName="c2.categoryName" :data-categoryId="c2.categoryId">{{c2.categoryName}}</a>
                      <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                    </dt>
                    <dd>
                      <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryLevel="3" :data-categoryName="c3.categoryName" :data-categoryId="c3.categoryId">{{c3.categoryName}}</a>
                        <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>    
          </div>
        </transition>
      </div>
      
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
//引入方式:是把lodash全部功能函数引入
//最好的引入方式:按需加载
import throttle from 'lodash/throttle'
export default {
  name: "TypeNav",
  data() {
    return {
      //用户鼠标移上哪一个一级分类
      currentIndex:-1,
      show:true
    }
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex属性
    //throttle回调函数别用箭头函数，可能出现上下文this问题
    changeIndex:throttle(function(index){
      // index:鼠标移上某一个一级分类的元素的索引值
      //正常情况(用户慢慢的操作):鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
      //非正常情况(用户操作很快):本身全部的一级分类本身都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
      //就是由于用户的行为过快，导致浏览器反应不过来。如果当前回调函数中有一些大量的业务，有可能出现卡顿现象
      this.currentIndex = index
    },50),

    //当鼠标离开的时候，让商品分类列表进行隐藏
    //一级分类鼠标移出的事件回调
    leaveIndex(){
      //鼠标移出currentIndex，变为-1
      this.currentIndex = -1
      if(this.$route.path!='/home'){
        this.show = false
      }
    },
    //进行路由跳转的方法
    goSearch(event){
      //最好的解决方案:编程式导航+事件委派
      //利用事件委派存在的一些问题:1:怎么能确定点击一定是a标签 2:如何获取对应的参数【1、2、3级分类的产品名字和ID】

      //第一个问题:把子节点当中a标签，我加上自定义属性data-categoryName，其余的子节点是没有的
      let element = event.target;
      //获取到当前出发这个事件的节点【h3、a、dl、dt】，需要带有data-categoryname这样节点【一定是a标签】
      //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      // console.log(element.dataset);
      let {categoryname,categoryid,categorylevel} = element.dataset;
      //如果标签身上拥有categoryname一定是a标签
      // console.log(categoryname);
      let categoryClass = `category${categorylevel}Id`
      let loction = {
          name:'search',
          query:{
            categoryName:categoryname,
            [categoryClass]:categoryid
          },
          params:{
            keyword:undefined
          }
        }
      // loction.params = this.$route.params
      if(categoryname){
        this.$router.push(loction)
      }
    },
    //当鼠标移入的时候，让商品分类列表进行展示
    enterShow(){
      this.show = true;
    }
  },
  //组件挂载完毕:可以向服务器发请求
  mounted() {
    //通知Vuex发请求，获取数据，存储于仓库当中
    // console.log(this);
    // this.$store.dispatch('categoryList');
    //当组件挂载完毕，让show属性变为false
    //如果不是Home路由组件，将typeNav进行隐藏
    if(this.$route.path!='/home'){
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state，其实即为大仓库中的数据
      categoryList:(state)=>{
        return state.home.categoryList
      }
    })
  },
};
</script>

<style lang='less' scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          
        }

        .cur{
          background-color: skyblue;
        }
      }
    }

    //过度动画的样式
    //过度动画开始状态(进入开始状态)
    .sort-enter{
      height: 0px;
      opacity: 0;
    }
    //过度动画的结束状态(进入)
    .sort-enter.to{
      height: 461px;
      opacity: 1;
    }
    .sort-enter-active{
      transition:all .3s linear;
    }
  }
}
</style>