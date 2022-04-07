import parsePath from "./parsePath";
export default class Watcher {
  constructor(vm, exp, cb, options) {
    this.vm = vm;

    if (options) {
      this.deep = !!options.deep;
    } else {
      this.deep = false;
    }
    //记录watcher都订阅了谁
    this.deps = [];
    this.depIds = new Set();
    if (typeof exp === "function") {
      this.getter = exp;
    } else {
      this.getter = parsePath(exp);
    }
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    window.target = this;
    let value = this.getter.call(this.vm, this.vm);
    if (this.deep) {
      traverse(value);
    }
    window.target = undefined;
    return value;
  }

  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }

  addDep(dep) {
    const id = dep.id;
    if (!this.depIds.has(id)) {
      this.depIds.add(id);
      this.deps.push(dep);
      dep.addSub();
    }
  }

  //移除依赖
  teardown() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
  }
}
