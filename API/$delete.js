Vue.prototype.$set = function (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return val;
  }

  const ob = target._ob_;
  if (target.isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== "production" && warn("Avoid adding .......");
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }
  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
};
