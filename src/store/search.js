import { reqGetSearchInfo } from "@/api";
//search模块的小仓库
const state = {
  searchList:{}
};
const mutations ={
  GETSEARCHLIST(state,searchList){
    state.searchList = searchList
  }
};
const actions = {
  //获取Search模块数据局
  async getSearchList(context,params={}){
    //当这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数(空对象)
    const result = await reqGetSearchInfo(params)
    if(result.code === 200){
      context.commit('GETSEARCHLIST',result.data)
    }
  }
};
//计算属性，在项目当中，为了简化数据而生。
//项目中getters主要的作用是:简化仓库中的数据(简化数据而生)
//可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
  // 当前形参state，当前仓库中state，并非大仓库中的state
  goodsList(state){
    // state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
    // 假如网络不给力|没有网络state.searchList.goodsList应该返回的是undefined
    //计算的新的属性的属性值至少给人家来一个数组
    return state.searchList.goodsList||[];
  },
  trademarkList(){
    return state.searchList.trademarkList||[];
  },
  attrsList(){
    return state.searchList.attrsList||[];
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}