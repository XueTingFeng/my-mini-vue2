const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

['push','pop','shift','unshift','splice','sort','reverse']
.forEach(method => {
    //缓存原始方法
    const original = arrayProto[method]
    Object.defineProperty(arrayMethods,method,{
        value:function mutator(...args){
            return original.apply(this,args)
        },
        enumerable:false,
        writable:true,
        configurable:true
    })
});