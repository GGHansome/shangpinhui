<template>
  <div class="pagination">
    <button @click="lastPage">上一页</button>
    <button :class="{select:pageNo===1}" v-if="pageNo>=4" @click="selectNo">1</button>
    <button v-if="pageNo>4">···</button>
    <button :class="{select:pageNo===pageNumber-2}" v-if="totalPage>=1" @click="selectNo">{{pageNumber-2}}</button>
    <button :class="{select:pageNo===pageNumber-1}" v-if="totalPage>=2" @click="selectNo">{{pageNumber-1}}</button>
    <button :class="{select:pageNo===pageNumber}" v-if="totalPage>=3" @click="selectNo">{{pageNumber}}</button>
    <button :class="{select:pageNo===pageNumber+1}" v-if="totalPage>=4" @click="selectNo">{{pageNumber+1}}</button>
    <button :class="{select:pageNo===pageNumber+2}" v-if="totalPage>=5" @click="selectNo">{{pageNumber+2}}</button>
    
    <button v-if="pageNo<totalPage-3">···</button>
    <button :class="{select:pageNo===totalPage}" v-if="pageNo<=totalPage-3" @click="selectNo">{{totalPage}}</button>
    <button @click="nextPage">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed: {
      //总页数
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
      //点击页码，将页码传递给父组件进行请求
      selectNo(event){
        this.$emit('getSelectNo',event.target.innerText)
      },
      nextPage(){
        if(this.pageNo<this.totalPage){
          this.$emit('getSelectNo',this.pageNo+1)
        }
      },
      lastPage(){
        if(this.pageNo>1){
          this.$emit('getSelectNo',this.pageNo-1)
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .pagination {
    .select{
      border: 1px red solid;
    }

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
