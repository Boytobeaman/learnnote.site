---
title: "async, await, promise 面试题"
metaTitle: "async, await, promise 面试题"
metaDescription: "async, await, promise 面试题"
---



### promise function 的一般格式
```
// 要return 一个 promise

function fetch(a) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`got ${a}`)
        }, 2000);
    })
}
```

### callback 变为 promise
```
return new Promise(function(resolve, reject){
    // do sth
    some_cb_function(arg, function(err, msg){
        if(err){
            return reject(err)
        }

        resolve(msg)
    })
})
```

### .then 的写法
```
fetch("a")
 .then(function (data) {
     console.log(data)
 })




fetch("a")
 .then(function (data) {
     console.log(`return from fetch a ----${data}`)
     return data
 })
 .then(function (b) {
 	console.log(`return from fetch a then ----${b}`)
 	console.log(`began fetch b then`)
 	return fetch("b")
 		.then(function (res) {
 			console.log(`return from fetch b----${res}`)
 			return res
 		})
 })
 .then(function (c) {
 	console.log(`return from fetch b then ----${c}`)
 	console.log(`began fetch c`)
 	fetch("c")
 		.then(function (res) {
 			console.log(`return from fetch c----${res}`)
 			console.log(res)
 		})
 })
```

### async await 的写法
```
async function fun_b() {
    let fetch_a = await fetch("a")
    console.log(fetch_a)
}
fun_b()
```

### callback hell
```
function loadImg(src, callback, fail){
    var img = document.createElement("img")
    img.onload = function () {
        callback(img)
    }
    img.onerror = function (err) {
        fail(err)
    }
    img.src = src
}
var src = 'https://www.imooc.com/static/img/index/logo.png'
loadImg(src, function(img){
    console.log(img.width)
},function(err){
    console.log(err)
})
```

### change to promise async await
```
function loadImg(src){
    const promise = new Promise(function(resolve, reject){
        var img = document.createElement('img')
        img.onload = function(){
            resolve(img)
        }
        img.onerror = function(err){
            reject(err)
        }
        img.src = src
    })
    return promise
}

var src = 'https://www.imooc.com/static/img/index/logo.png'
// then 的写法
loadImg(src)
    .then(function(res){
        console.log(res.width)
    })
    .catch(function(err){
        console.log(err)
    })

// async awit 写法
async function toLoadImg(src){
    try {
        let res = await loadImg(src)
        console.log(res.width)
    } catch (error) {
        console.log(error)
    }
}
toLoadImg(src)
```


### 串联
```
var src1 = 'https://www.imooc.com/static/img/index/logo.png'
var src2 = 'https://img.mukewang.com/user/5a9fc8070001a82402060220-100-100.jpg'

var result1 = loadImg(src1)
var result2 = loadImg(src2)

result1.then(function (img1) {
    console.log(`first img finished: ${img1.width}`)
    return result2
}).then(function (img2) {
    console.log(`second img finished: ${img2.width}`)
}).catch(function (err) {
    console.log(err)
})
```
#### 说明: result1 和 result2 的请求 会在声明result1和result2时就发送出去，then 可以控制请求结果的返回顺序，以便使前面异步请求的结果可以给后面异步请求用

### Promise.all
```
//Promise.all 接受多个 promise 对象 组成的数组
// 待全部完成之后，统一执行 success
Promise.all([result1, result2]).then(datas =>{
    // 接收到的 datas 是一个数组，依次包含了多个 promise 返回的内容
    console.log(datas[0])
    console.log(datas[1])
})
```
### Promise.race
```
//Promise.race 接受多个 promise 对象 组成的数组
// 只要有一个完成，就执行 success
Promise.race([result1, result2]).then(data =>{
    // data 是最先执行完成的 promise 返回的内容
    console.log(data)
})
```

### Promise的原理
```
在Promise的内部，有一个状态管理器的存在，有三种状态：
pending、
fulfilled、
rejected

(1) promise 对象初始化状态为 pending。

(2) 当调用resolve(成功)，会由pending => fulfilled。

(3) 当调用reject(失败)，会由pending => rejected。

Promise状态一旦改变，无法再发生变更
```

### promise.then
```
// onFulfilled 是用来接收promise成功的值
// onRejected 是用来接收promise失败的原因
promise.then(onFulfilled, onRejected);

If onFulfilled is not a function, it must be ignored.
If onRejected is not a function, it must be ignored.

Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
// 返回1
```
##### catch
```
catch 在链式写法中可以捕获前面then中发送的异常。
其实，catch相当于then(null,onRejected),前者只是后者的语法糖而已
```
#### 实现一个简单的Promise
```
function Promise(fn){
  var status = 'pending'
  function successNotify(){
      status = 'fulfilled'//状态变为fulfilled
      toDoThen.apply(undefined, arguments)//执行回调
  }
  function failNotify(){
      status = 'rejected'//状态变为rejected
      toDoThen.apply(undefined, arguments)//执行回调
  }
  function toDoThen(){
      setTimeout(()=>{ // 保证回调是异步执行的
          if(status === 'fulfilled'){
              for(let i =0; i< successArray.length;i ++)    {
                  successArray[i].apply(undefined, arguments)//执行then里面的回掉函数
              }
          }else if(status === 'rejected'){
              for(let i =0; i< failArray.length;i ++)    {
                  failArray[i].apply(undefined, arguments)//执行then里面的回掉函数
              }
          }
      })
  }
  var successArray = []
  var failArray = []
  fn.call(undefined, successNotify, failNotify)
  return {
      then: function(successFn, failFn){
          successArray.push(successFn)
          failArray.push(failFn)
          return undefined // 此处应该返回一个Promise
      }
  }
}
```

### for 循环 在async 函数里面，如果for 循环里面有异步请求，则异步请求按照循序依次 执行当前---完成当前---执行下一个
```
let mockApi = function(param){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>resolve(param),2000)
  })
};

let arr_length = 10;
let arr = [...new Array(arr_length).keys()];

(async function(){

  for (let index = 0; index < arr.length; index++) {
    console.log(`for begin ${index}`)
    let result = await mockApi(index)
    console.log(result)
  }

})()


// outcome
for begin 0
0
for begin 1
1
...
for begin 9
9
```



### promise 基础

##### Promise同步执行，promise.then异步执行
```
const P1 = new Promise((res, rej) => {
  console.log('first');
  res();
  console.log('second')
});

P1.then(() => {
  console.log('third')
})
console.log('fourth');

//output:

first
second
fourth
third
```


##### 只能执行一次resolve或reject, 剩下的不会执行,即使reject后有一个resolve调用
```
const p1 = new Promise((res, rej) => {
  res('1');
  rej('error');
  res('2')
});

p1
  .then(res => {
    console.log('then: ', res)
  })
  .catch(err => {
    console.log('catch: ', err)
  })

//then:  1
```



##### promise 的 .then或.catch可以被多次调用，但是此处Promise构造函数仅执行一次。换句话说，一旦promise的内部状态发生变化并获得了一个值，则随后对.then或.catch的每次调用都将直接获取该值。
```
const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    console.log('first')
    res('second')
  },1000)
});

const start = Date.now()

p1
  .then(res => {
    console.log(res, Date.now() - start, "third")
  })

p1
  .then(res => {
    console.log(res, Date.now() - start, "forth")
  })

//output:
first
second 1010 third
second 1011 forth
```


##### .then或.catch返回的值不能是promise本身，否则将导致无限循环。
```
const promise = Promise.resolve()
  .then(() => {
    return promise
  })

promise.catch(err =>{
  console.log(err)
})

//TypeError: Chaining cycle detected for promise #<Promise>
```



#### It is possible to change this behaviour by handling possible rejections
有时候我们使用Promise.all()执行很多个网络请求，可能有一个请求出错，但我们并不希望其他的网络请求也返回reject，要错都错，这样显然是不合理的

我们需要的是即使有一两个接口请求失败，我们依然可以获取到成功的接口请求数据
```
var p1 = new Promise((resolve, reject) => { 
  setTimeout(() => resolve('p1_delayed_resolution'), 1000); 
}); 

var p2 = new Promise((resolve, reject) => {
  reject(new Error('p2_immediate_rejection'));
});

Promise.all([
  p1.catch(error => { return error }),
  p2.catch(error => { return error }),
]).then(values => { 
  console.log(values[0]) // "p1_delayed_resolution"
  console.log(values[1]) // "Error: p2_immediate_rejection"
})
```

```
var promiseArray = []
promiseArray.push(promiseResove(1))
promiseArray.push(promiseReject(3))
promiseArray.push(promiseResove(2))

// 将传入promise.all的数组进行遍历，如果catch住reject结果，
// 直接返回，这样就可以在最后结果中将所有结果都获取到
var handlePromise = Promise.all(promiseArray.map(function(promiseItem) {
    return promiseItem.catch(function(err) {
    return err
  })
}))
handlePromise.then(function(values) {
    console.log('all promise are resolved', values)
}).catch(function(reason) {
    console.log('promise reject failed reason', reason)
})
```


#### 并发处理多个 异步
第一步：拿到所有的用户信息；
第二步：针对每一个用户，要拿到用户的ID
第三步：针对每一个用户ID，将ID 变为大写

分析：
这三步都是异步操作，第一步要首先完成，然后针对所有用户的第二步和第三步，  
我们可以用Promise.all并发完成, 每一个user 的第三步要依赖第二步的值，
所以第二步和第三步放在一个async 函数里面，await 完第二个函数，在await 第三个函数
```
// First promise returns an array
const getUsers = () => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve([{ id: 'jon' }, { id: 'andrey' }, { id: 'tania' }]), 2000)
  })
}

// Second promise relies on the resulting array of first promise
const getIdFromUser = users => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(users.id), 1000)
  })
}

// Third promise relies on the result of the second promise
const capitalizeIds = id => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(id.toUpperCase()), 1000)
  })
}

const runAsyncFunctions = async () => {
  const users = await getUsers()

  Promise.all(
    users.map(async user => {
      const userId = await getIdFromUser(user)
      console.log(userId)

      const capitalizedId = await capitalizeIds(userId)
      console.log(capitalizedId)
      return capitalizedId
    })
  )
  .then(values =>{
    console.log(`values ===== ${JSON.stringify(values)}`)
  })

  console.log(`users == ${JSON.stringify(users)}`)
}

runAsyncFunctions()
```


### 利用 p-limit 控制Promise.all并发请求数量

```
const pLimit = require('p-limit');

//es6 synctax
//import pLimit from "p-limit";
 
const limit = pLimit(2);
// Only 2 promise is run at once
 
const input = [
    limit(() => fetchSomething('foo')),
    limit(() => fetchSomething('bar')),
    limit(() => doSomething())
];
 
(async () => {

    const result = await Promise.all(input);
    console.log(result);
})();

```