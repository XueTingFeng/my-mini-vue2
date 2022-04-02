import { InternalSymbolName } from "typescript";
import { arrayMethods } from "./arrayMethods";
import defineReactive, { observe } from "./defineReactive";
import def from "./def";
import Dep from "./dep";

//proto是否可用
const hasProto = "__proto__" in {};
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

export default class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep(); //新增dep 为了getter和拦截器都可以访问observer实例
    def(value, "_ob_", this); //通过_ob_标记数组是否为响应式数据

    //只有数据类型为obj才调用
    if (Array.isArray(value)) {
      //拦截器 使用重写的数组方法
      const augment = hasProto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);
      value.__proto = arrayMethods;

      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  //将每一个属性都转换成getter/setter 的形式来侦测变化
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }

  //侦测array中的每一项
  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i]);
    }
  }
}

function protoAugment(target, src, keys) {
  target.__proto__ = src;
}

function copyAugment(target, src, keys) {
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    def(target, key, src[key]);
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
