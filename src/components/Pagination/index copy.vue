<template>
  <div class="pagination">
    <button>上一页</button>
    <button v-if="pageNo>4" @click="selectNo">1</button>
    <button v-if="pageNo>4" @click="selectNo">···</button>
    <button @click="selectNo">{{pageNo>4?pageNo-2:1}}</button>
    <button @click="selectNo">{{pageNo>4?pageNo-1:2}}</button>
    <button @click="selectNo">{{pageNo>4?pageNo:3}}</button>
    <button @click="selectNo">{{pageNo>4?pageNo+1:4}}</button>
    <button @click="selectNo">{{pageNo>4?pageNo+2:5}}</button>
    
    <button v-if="pageNo<totalPage-4">···</button>
    <button @click="selectNo">{{totalPage}}</button>
    <button>下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed: {
      totalPage(){
        //向上取整
        return Math.ceil(this.total/this.pageSize)
      },
      //计算出连续的页码的起始数字与结束数字[连续页码的数字:至少是5]
      startNumberAndEndNumber(){
        //先定义两个变量存储起始数字与结束数字
        let start = 0,end = 0
        //连续页码数字5【就是至少五页】:如果出现不正常的现象【就是不够五页】
        //不正常现象【总页数没有连续页码多】
        if(continues>totalPage){
          start = 1
          end = totalPage
        }else{
          //正常现象【连续的页码5，但是你的总页数一定是大于5的】
        }
      }
    },
    methods: {
      selectNo(event){
        console.log(event.target.innerText);
      }
    },
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
