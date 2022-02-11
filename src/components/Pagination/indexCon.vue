<template>
  <div class="pagination">
    <button>上一页</button>
    <button v-if="pageNo>=(continues-1)" @click="selectNo">1</button>
    <button v-if="pageNo>(continues-1)">···</button>
    <button @click="selectNo">{{pageNumber-2}}</button>
    <button @click="selectNo">{{pageNumber-1}}</button>
    <button @click="selectNo">{{pageNumber}}</button>
    <button @click="selectNo">{{pageNumber+1}}</button>
    <button @click="selectNo">{{pageNumber+2}}</button>
    
    <button v-if="pageNo<totalPage-(continues-2)">···</button>
    <button v-if="pageNo<=totalPage-(continues-2)" @click="selectNo">{{totalPage}}</button>
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
      pageNumber(){
        return this.pageNo>=(this.continues-1)&&this.pageNo<=this.totalPage-(this.continues-2)?this.pageNo:this.pageNo<(this.continues-1)?(this.continues-2):this.totalPage-(this.continues-3)
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
