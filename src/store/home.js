import {reqCateGoryList,reqGetBannerList,reqGetFloorList} from '@/api'
//home模块的小仓库
const state = {
  //state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组。【根据接口返回值初始化的】
  categoryList:[],
  //轮播图的数据
  bannerList:[],
  floorList:[]
};
const mutations ={
  CATEGORYLIST(state,categoryList){
    state.categoryList = categoryList.slice(0,-3)
  },
  GETBANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  GETFLOORLIST(state,floorList){
    state.floorList = floorList
  }
  //[0,1,2,3]
};
const actions = {
  //通过API里面的接口函数调用，向服务器发请求，获取服务器数据
  async categoryList(context){
    const result = await reqCateGoryList();
    if(result.code===200){
      context.commit('CATEGORYLIST',result.data)
    }
  },
  //获取首页录播图的数据
  async getBannerList(context){
    const result = await reqGetBannerList()
    if(result.code===200){
      context.commit('GETBANNERLIST',result.data)
    }
  },
  //获取floor数据
  async getFloorList(context){
    const result = await reqGetFloorList()
    if(result.code===200){
      context.commit('GETFLOORLIST',result.data)
    }
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}