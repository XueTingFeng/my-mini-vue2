import parsePath from "./parsePath"
export default class Watcher{
    constructor(vm,exp,cb){
        this.vm = vm
        this.getter = parsePath(exp)
        this.cb = cb
        this.value = this.get()
    }

    get(){
        window.target = this
        let value = this.getter.call(this.vm,this.vm)
        window.target = undefined
        return value
    }

    update(){
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm,this.value,oldValue)
    }
}