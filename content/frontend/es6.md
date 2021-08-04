---
title: "es6"
metaTitle: "es6，常见的es6 语法"
metaDescription: "es6，如何使用js es6, 常见的es6 语法"
---

### 常量
```
//ES5
Object.defineProperty(window, "PI2",{
    value: 3.1415926,
    writable: false,
})

//ES6
const PI=3.1415926
```


### var、let、const三者的区别
```
ECMAScript 6(简称ES6)中新增了块级作用域。块作用域由 { } 包括，if语句和for语句里面的{ }也属于块作用域。 

var定义变量，没有块的概念，可以跨块访问，不能跨函数访问，不初始化出现undefined，不会报错。

let定义变量，只能在块作用域里访问，也不能跨函数访问，对函数外部无影响。

const定义常量，只能在块作用域里访问，也不能跨函数访问，使用时必须初始化(即必须赋值)[每个const变量都必须在声明的同时进行初始化]，而且不能修改。如果是对象，可以修改对象的属性


let a = "hey I am outside";
if(true){
    console.log(a);//Uncaught ReferenceError: a is not defined
    let a = "hey I am inside";
}
变量提升

这里同样抛出了一个错误，认为a没有声明，但是，如果a没有变量提升，执行到console.log时应该是输出全局作用域中的a，而不是出现错误。

这里确实出现了变量提升，而我们不能够访问的原因事实上是因为let的死区（temporal dead zone）设计：当前作用域顶部到该变量声明位置中间的部分，都是该let变量的死区，在死区中，禁止访问该变量。由此，我们给出结论，let声明的变量存在变量提升， 但是由于死区我们无法在声明前访问这个变量.
```

### js class 继承
```
class Animal {
  constructor(name){
    this.name = name
  }
  eat() {
    console.log(`${this.name} eat`)
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name)
    this.name = name
  }
  say() {
    console.log(`${this.name} say`)
  }
}
const dog = new Dog('hasky')

dog.say()
//hasky say
dog.eat()
//hasky eat


class 在语法上更加贴合面向对象的写法
class 实现继承更加易读、易理解

本质是语法糖

总结一下：
static 关键字声明的是静态方法，不会被实例继承，只可以直接通过类来调用；
class 没有变量提升，因此必须在定义之后才使用；
constructor 为构造函数，子类构造函数中的 super 代表父类的构造函数，必须执行一次，否则新建实例时会抛错；
class 用 extends 来实现继承，子类继承父类所有实例方法和属性。
```

### 模板字符串
```
let a = `${variable_a} some text`
```

### 解构赋值
```
ES6 允许按照一定方式，从数组和对象中提取值。本质上这种写法属于 模式匹配，只要等号两边的模式相同，左边的变量就会被赋予相对应的值。

数组的解构赋值：
let [a, b, c] = [1, 2, 3]          // a:1 b:2 c:3
let [a, [[b], c]] = [1, [[2], 3]]  // a:1 b:2 c:3
let [a, , b] = [1, 2, 3]           // a:1 b:3
let [a,...b] = [1, 2, 3]           // a:1 b:[2, 3]
let [a, b,...c] = [1]              // a:1 b:undefined c:[]
let [a, b = 4] = [null, undefined] // a:null b:4
let [a, b = 4] = [1]						   // a:1 b:4
let [a, b = 4] = [1, null]				 // a:1 b:null

解构不成功，变量的值为 undefined
解构可以指定默认值，如果被解构变量的对应位置没有值，即为空，或者值为 undefined，默认值才会生效。


对象解构基本用法：
let { a, b } = { a: 1, b: 2 }      // a:1 b:2
let { c } = { a: 1, b: 2 }         // c:undefined
let { c = 4 } = { a: 1, b: 2 }     // c:4
let { a: c } = { a: 1, b: 2 }      // c:1
let { a: c = 4, d: e = 5 } = { a: 1, b: 2 }   // c:1 e:5
let { length } = [1, 2]            // length:2



//多层嵌套 取值
let props={
  person:{
    name: "xiaoming",
    // age: "18"
  }
}
let { person: {name, age="100"} } = props;


解构不成功，变量的值为 undefined
解构可以指定默认值，如果被解构变量严格为 undefined 或为空，默认值才会生效；
如果变量名和属性名不一致，可以赋给其它名字的变量 {a:c}，实际上对象解构赋值 {a} 是简写 {a:a}，
对象的解构赋值是先找到同名属性，再赋给对应的变量，真正被赋值的是后者。
```

### 块级作用域
```
let obj = { foo: "aaa", bar: "bbb" };

for (var item in obj){
  console.log(item)
}
console.log(item)
// have value "bar" here


for (let item in obj){
  console.log(item)
}
console.log(item)
// ReferenceError: item is not defined
```

### 箭头函数
```
function fn() {
  console.log('real', this)//{a:100}
  var arr = [1, 2, 3]

  普通js
  arr.map(function (item) {
    console.log('js',this) //window
    return item + 1
  })

  //箭头函数
  arr.map(item => {
    console.log('js',this) //{a:100}
    return item + 1
  })
}

fn.call({a:100})

//箭头函数的this总是指向词法作用域，也就是外层调用者obj
//一般方法中，this代指全局对象 window
//作为对象方法调用，this代指当前对象
//作为构造函数调用，this 指代new 出的对象
```

### 函数默认参数
```
function (a, b) {
  if (b == null) {
    b = 0
  }
}

//es6
function (a, b=0) {
  // body...
}
```


### 扩展运算符（ spread ）是三个点 ...
```
let a=[1,2]
let b=[5,6]

b.push(...a)
console.log(b)
//[ 5, 6, 1, 2 ]


合并数组

// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]


[...arr1, ...arr2, ...arr3]



### 高阶函数中过滤掉不想要的属性
...
render() {
   const { unacceptedProp, byebye, ...acceptedProps } = this.props;
   return <WrappedComponent {...acceptedProps} />
}
```


以前如果我们想将数组元素迭代为函数参数使用，一般使用Function.prototype.apply的方式。
```
function myFunction(x, y, z) { 
  console.log(x+""+y+""+z);
} 
let args = [0, 1, 2]
myFunction.apply(null, args)
```

有了展开语法，我们可以这样写
```
function myFunction(x, y, z) { 
  console.log(x+""+y+""+z);
} 
myFunction(...args)

//说明
...arr返回的并不是一个数组，而是各个数组的值。只有[...arr]才是一个数组，所以...arr可以用来对方法进行传值
```

### Generator
The function* declaration (function keyword followed by an asterisk) defines a generator function, which returns a Generator object.

```
function* generator(i) {
  yield i;
  yield i + 10;
}

const gen = generator(10);

console.log(gen.next().value);
// expected output: 10

console.log(gen.next().value);
// expected output: 20

console.log(gen.next());
// { value: undefined, done: true }


//Calling a generator function does not execute its body immediately; an iterator object for the function is returned instead. 

```
A return statement in a generator, when executed, will make the generator finish (i.e. the done property of the object returned by it will be set to true)
```
function* yieldAndReturn() {
  yield "Y";
  return "R";
  yield "unreachable";
}

var gen = yieldAndReturn()
console.log(gen.next()); // { value: "Y", done: false }
console.log(gen.next()); // { value: "R", done: true }
console.log(gen.next()); // { value: undefined, done: true }
```
![Normal Functions vs Generators](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/Normal-Functions-vs-Generators.png)



### dva 框架 effect
```

app.model({
    namespace: 'todos',
    effects: {
        *addRemote({ payload: todo },{ put, call, select }){
            yield call(addTodo, todo);
            yield put({ type: 'add', payload: todo });
        },
    },
});

// put 用于触发action。
// call 用于调用异步逻辑，支持promise

// select 用于从state里获取数据
const todos = yield select(state => state.todos);
```
