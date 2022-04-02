import def from "./def";
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto)[
  ("push", "pop", "shift", "unshift", "splice", "sort", "reverse")
].forEach((method) => {
  //缓存原始方法
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args);
    const ob = this._ob_; //通过this.ob获取observer实例

    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);
    ob.dep.notify; //向依赖发通知
    return result;
  });
});

/*缺点
this.list[0] = 2 修改第一个元素无法侦测到数组变化
this.list.length = 0 清空数组的操作也无法侦测到变化
*/
