import Dep from "./dep"
import Observer from "./obServer"
export default function defineReactive(data,key,val){
    //递归子属性
    if(typeof val=== 'object'){
        new Observer(val)
    }

    let dep = new Dep()
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            //dep.push(window.target)//新增
            //添加到subs数组里
            dep.depend()
            return val
        },
        set:function(newVal){
            if(val === newVal){
                return
            }
            // for(let i = 0;i<dep.length;i++){
            //     dep[i](newVal,val)
            // }
            val = newVal
            //通知订阅者更新
            dep.notify()
        }
    })
}