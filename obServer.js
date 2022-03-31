import { arrayMethods } from './arrayMethods'
import defineReactive from './defineReactive'
export default class Observer{
    constructor(value){
        this.value = value

        //只有数据类型为obj才调用
        if(Array.isArray(value)){
            //拦截器 使用重写的数组方法
            value.__proto = arrayMethods
        }else{
            this.walk(value)
        }
    }

    //将每一个属性都转换成getter/setter 的形式来侦测变化
    walk(obj){
        const keys = Object.keys(obj)
        for(let i=0;i<keys.length;i++){
            defineReactive(obj,keys[i],obj[keys[i]])
        }
    }
}

//以下例子无法侦测变化
//只能追踪数据是否被修改，无法追踪新增/删除属性
//所以vue提供了api,vm.$set和vm.$delete

/*
new Vue({
    el:'el',
    templace:'tem',
    methods:{
        action(){
            this.obj.name = 'xiaoming'
        }
    },
    data:{
        obj:{}
    }
})

new Vue({
    el:'el',
    templace:'tem',
    methods:{
        action(){
            delete this.obj.name
        }
    },
    data:{
        obj:{
            name:'xiaoming'
        }
    }
})
*/
