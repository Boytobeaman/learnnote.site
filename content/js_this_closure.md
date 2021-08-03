---
title: "js this"
metaTitle: "js this 问题， js this 指向, 闭包问题"
metaDescription: "js this 问题，js this 指向， 闭包问题"
---
### 常规情况下，this 指向最后调用这个函数的对象
```
var obj ={
	name: 'a',
	printName: function () {
		console.log(this)
	}
}

obj.printName()
//函数作为对象的属性调用，this 指向这个对象


var aa = obj.printName
aa()
//这时函数在全局 上下文中调用，this 指向 windows
```

### 运行环境和调用方式会改变 this 的指向
```
var name = 'Nicolas';
function Person(){

	this.name = 'Smiley';
  this.sayName=function(){
    console.log(this);
    console.log(this.name);
  };

  setTimeout(this.sayName, 0);

}
var person = new Person();
person.sayName()

初始化 person 时， 里面有 setTimeout 里面的方法会后执行，person.sayName()会先执行
person.sayName() 时上下文为这个对象 person; 因此这时name 为 Smiley

等到了执行 setTimeout 里面的 this.sayName 时，这时执行的上下文环境就是 window 了,因此 这时name就是 window 的 name: Nicolas


```



### 手动更改this的指向：call、apply、bind

```
function fn1(name, age) {
	console.log(name, this)
}
// fn1.call({x:100},"zhangsan",28)
// fn1.apply({x:100},["zhangsan",28])

// bind

var fn2 = function (name, age) {
	console.log(name)
	console.log(this)
}.bind({y:200})

fn2("zhangsan bind",29)
```


### setTimeout 与 this
```
// 老的解决方法
var that = this;
if (this.options.destroyOnHide) {
     setTimeout(function(){ that.tip.destroy() }, 1000);
}


// ES5
if (this.options.destroyOnHide) {
     setTimeout(function(){ this.tip.destroy() }.bind(this), 1000);
}

// ES6 arrow functions
if (this.options.destroyOnHide) {
     setTimeout(() => { this.tip.destroy() }, 1000);
}


//pass arguments to the callback（传参给callback）
if (this.options.destroyOnHide) {
     setTimeout(function(that){ that.tip.destroy() }, 1000, this);
}

setTimeout(function (ar1,ar2) {
	console.log(ar1,ar2)
},1000,"ar1_value","ar2_value")

//ar1_value ar2_value

```


### 闭包
```
// 函数作为返回值
function F1() {
	var a = 100
	return function () {
		console.log(a) //a 为自由变量，在父级作用域里面寻找
	}
}
var f1 = F1()
var a = 200
f1() //100


//函数作为函数的参数
function F1() {
	var a = 100
	return function () {
		console.log(a) //a 为自由变量，在父级作用域里面寻找
	}
}
var f1 = F1()
function F2(fn) {
	var a = 200
	fn()
}
F2(f1) //100

```

#### 闭包的应用
```
function isFirstLoad() {
	var _list = []
	return function (id) {
		if (_list.indexOf(id) >= 0) {
			return false
		} else{
			_list.push(id)
			return true
		}
	}
}

var firstLoad = isFirstLoad()

console.log(firstLoad(10))
// true

console.log(firstLoad(10))
// false

console.log(firstLoad(20))
// false

console.log(_list)
//ReferenceError: _list is not defined
```