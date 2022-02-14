<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="getPosition"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" :style="bigImgPosition"/>
    </div>
    <div class="mask" :style="maskPosition"></div>
  </div>
</template>


<script>
  //鼠标相对定位元素的位置 this.$refs.outer.offsetTop
  export default {
    name: "Zoom",
    data() {
      return {
        currentIndex:0,
        maskPosition:{
          top:'0px',
          left:'0px'
        },
        bigImgPosition:{
          top:'0px',
          left:'0px'
        }
      }
    },
    props:['skuImageList'],
    computed: {
      imgObj(){
        return this.skuImageList[this.currentIndex]
      },
    },
    methods: {
      getIndex(index){
        this.currentIndex = index
      },
      getPosition(event){
        //绿框距离父定位元素上边的距离
        let top = event.offsetY-100
        //绿框距离父定位元素左边的距离
        let left = event.offsetX-100

        if(top<0){ //锁定绿色边框不能超过其父元素
          this.maskPosition.top='0px'
        }else if(top>200){
          this.maskPosition.top='200px'
        }else{
          //改变绿色框的位置
          this.maskPosition.top=top+'px'
          //改变bigImg的位置
          this.bigImgPosition.top = -2*top + 'px'
        }

        if(left<0){
          this.maskPosition.left='0px'
        }else if(left>200){
          this.maskPosition.left='200px'
        }else{
          //改变绿色框的位置
          this.maskPosition.left=left+'px'
          //改变bigImg的位置
          this.bigImgPosition.left = -2*left + 'px'
        }

      }
    },
    mounted() {
      //全局事件总线:获取兄弟组件传递过来的索引值
      this.$bus.$on('getIndex',this.getIndex)
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>