// Vue插件一定暴露一个对象
let myPlugins = {};
myPlugins.install = function(Vue,options){

  Vue.directive(options.name,(element,binding)=>{
    //element绑定自定义标签的那个HTML
    //binding绑定自定义标签的那个HTLM对象
    element.innerHTML = binding.value.toUpperCase()
  })
}

export default myPlugins