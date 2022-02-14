import { reqCartList,reqDeleteCartById,reqChangeCartCheckedById } from "@/api";
import { Promise } from "core-js";
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
  },
  //删除全部勾选的产品
  deleteAllCheckedCart({dispatch,getters}){
    //获取购物车中全部产品
    let promiseAll = []
    getters.cartList.cartInfoList.forEach(cart => {
      let promise = cart.isChecked==1?dispatch('deleteCartByskuId',cart.skuId):'';
      //将每一次返回的promise添加到数组中
      promiseAll.push(promise)
    });
    //只要全部的p1|p2...都成功，返回结果即为成功
    //如果有一个失败，返回即为失败结果
    return Promise.all(promiseAll)
  },
  //修改全部产品的状态
  changeAllChecked({dispatch,state},isChecked){
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach(item=>{
      let promise = dispatch('changeCartCheckedByskuId',{skuId:item.skuId,isChecked})
      promiseAll.push(promise)
    })
    //最终返回的结果
    return Promise.all(promiseAll)
  }
};
//简化数据而生
const getters = {
  cartList(state){
    return state.cartList[0]||{}
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}