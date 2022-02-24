import { reqAddressInfo,reqOrderInfo } from "@/api";
const state = {
  address:[],
  orderInfo:{}
};
const mutations ={
  GETUSERADDRESS(state,address){
    // console.log(address[0]);
    state.address = address
  },
  GETORDERINFO(state,orderInfo){
    state.orderInfo = orderInfo
  }
};
const actions = {
  // 获取用户地址信息
  async getUserAddress(context){
    let result = await reqAddressInfo()
    // console.log(result);
    if(result.code == 200){
      context.commit('GETUSERADDRESS',result.data)
    }else{
      return Promise.reject(new Error(result.message))
    }
  },
  // 获取商品清单信息
  async getOrderInfo(context){
    let result = await reqOrderInfo()
    if(result.code == 200){
      context.commit('GETORDERINFO',result.data)
    }else{
      return Promise.reject(new Error(result.message))
    }
  },
};
const getters = {
};

export default {
  state,
  mutations,
  actions,
  getters
}