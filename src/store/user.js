import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api";
const state = {
  code:'',
  token:localStorage.getItem('TOKEN'),
  userInfo:{}
};
const mutations ={
  GETCODE(state,code){
    state.code = code
  },
  USERLOGIN(state,token){
    state.token = token
  },
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  //清除本地数据
  CLEAR(state){
    state.token = '',
    state.userInfo = {}
    localStorage.removeItem('TOKEN')
  }
};
const actions = {
  //获取验证码
  async getCode(context,phone){
    let result = await reqGetCode(phone)
    if(result.code == 200){
      context.commit('GETCODE',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister(context,user){
    let result = await reqUserRegister(user)
    console.log(result);
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error(result.message))
    }
  },
  //登录业务【token】
  async userLogin(context,data){
    let result = await reqUserLogin(data)
    // 服务器下发token，用户唯一标识符(uuid)
    //将来经常通过带token找服务器要用户信息进行展示
    if(result.code == 200){
      //用户以及登录成功且获取到token
      context.commit('USERLOGIN',result.data.token)
      //持久化存储token
      localStorage.setItem('TOKEN',result.data.token)
        return 'ok'
    }else{
      return Promise.reject(new Error(result.message))
    }
  },
  //获取用户信息
  async getUserInfo(context){
    let result = await reqUserInfo()
    // console.log(result.code);
    if(result.code==200){
      // console.log(result.data);
      context.commit('GETUSERINFO',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error(result.message))
    }
  },
  //退出登录
  async userLogout(context){
    //只是向服务器发起一次请求，通知服务器清除token
    let result = await reqLogout()
    console.log(result);
    // action里面不能操作state，提交mutation修改state
    if(result.code == 200){
      context.commit('CLEAR')
      return 'ok'
    }else{
      return Promise.reject(new Error(result.message))
    }
  }
};
//简化数据而生
const getters = {
};

export default {
  state,
  mutations,
  actions,
  getters
}