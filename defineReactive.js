import Dep from "./dep";
import Observer from "./obServer";
export default function defineReactive(data, key, val) {
  let childOb = observe(val);

  let dep = new Dep();

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      //dep.push(window.target)//新增
      //添加到subs数组里
      dep.depend();
      //这里收集Array的依赖
      if (childOb) {
        childOb.dep.depend();
      }
      return val;
    },
    set: function (newVal) {
      if (val === newVal) {
        return;
      }
      // for(let i = 0;i<dep.length;i++){
      //     dep[i](newVal,val)
      // }
      val = newVal;
      //通知订阅者更新
      dep.notify();
    },
  });
}

//为value创建observe,创建成功返回创建的observer实例，如果存在observer则直接返回，避免重复侦测value
export function observe(value, asRootData) {
  if (!isObject(value)) {
    return;
  }
  let ob;
  if (hasOwn(value, "_ob_") && value._ob_ instanceof Observer) {
    ob = value._ob_;
  } else {
    ob = new Observer(value);
  }
  return ob;
}
