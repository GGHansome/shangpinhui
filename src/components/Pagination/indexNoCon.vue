<template>
  <div class="pagination">
    <button>上一页</button>
    <button v-if="pageNo>=4" @click="selectNo">1</button>
    <button v-if="pageNo>4">···</button>
    <button @click="selectNo">{{pageNumber-2}}</button>
    <button @click="selectNo">{{pageNumber-1}}</button>
    <button @click="selectNo">{{pageNumber}}</button>
    <button @click="selectNo">{{pageNumber+1}}</button>
    <button @click="selectNo">{{pageNumber+2}}</button>
    
    <button v-if="pageNo<totalPage-3">···</button>
    <button v-if="pageNo<=totalPage-3" @click="selectNo">{{totalPage}}</button>
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
        // if(this.pageNo>=4&&this.pageNo<=this.totalPage-3){
        //   return this.pageNo
        // }else if(this.pageNo<4){
        //   return 3
        // }else{
        //   return this.totalPage-2
        // }
        return this.pageNo>=4&&this.pageNo<=this.totalPage-3?this.pageNo:this.pageNo<4?3:this.totalPage-2
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
