import { reqCartList,reqDeleteCartById,reqChangeCartCheckedById } from "@/api";
const state = {
  cartList:[]
};
const mutations ={
  GETCARTLIST(state,cartList){
    state.cartList = cartList
  }
};
const actions = {
  //获取购物车列表数据
  async getCartList(context){
    const result = await reqCartList()
    if(result.code == 200){
      context.commit('GETCARTLIST',result.data)
    }
  },
  //删除购物车某一个产品
  async deleteCartByskuId(context,skuId){
    let result = await reqDeleteCartById(skuId)
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('删除失败，请重新删除！'))
    }
  },
  //修改购物车某一个产品状态
  async changeCartCheckedByskuId(context,{skuId,isChecked}){
    let result = await reqChangeCartCheckedById(skuId,isChecked)
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('修改失败，请重新修改！'))
    }
  }
};
//简化数据而生
const getters = {
  cartList(state){
    return state.cartList[0]||{}
  },
  //计算出来购物车数据
  cartInfoList(state){
    return state
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}