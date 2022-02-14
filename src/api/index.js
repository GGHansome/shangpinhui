//当前这个模块:API进行统一管理
import requests from "./request.js";
import mockRequests from './mockAjax.js'

//三级联动接口
// /api/product/getBaseCategoryList  get 无参数

export const reqCateGoryList =()=>{
  //发请求:axios发请求返回结果Promise对象
  return requests({
    url:'/product/getBaseCategoryList',
    method:'get'
  })
}

//获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner')

//获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floor')

//获取搜索模块数据  地址/api/list 请求方式:post 参数:需要带参数
//当前的这个函数需要接受外部传递参数
//当前这个接口，给服务器传递参数parmas，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({url:'/list',method:'post',data:params})

//获取产品详情信息的接口 URL:/api/item/{skuId} 请求方式:get
export const reqGetGoodsInfo = (skuId) => requests({url:`/item/${skuId}` ,method:'get'})

//将产品添加到购物车中(或者更新某一个产品个数)
// /api/cart/addToCart/{ skuId }/{ skuNum } Post
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车列表数据接口
//URL /api/cart/cartList method:get
export const reqCartList = () => requests({url:`/cart/cartList`,method:'get'})

//删除购物车产品的接口 
///api/cart/deleteCart/{skuId} method:delete
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改购物车产品状态
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqChangeCartCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})




