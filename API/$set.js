import defineReactive from "../defineReactive";
Vue.prototype.$set = function (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  const ob = target._ob_;
  if (target.isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== "production" && warn("Avoid adding .......");
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
};
