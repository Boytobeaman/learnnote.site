---
title: "frontend interview"
metaTitle: "前端面试，算法"
metaDescription: "前端面试，算法"
---

# 前端面试
### 页面从输入URL到页面加载显示完成，这个过程中都发生了什么
```
1. 根据 dns 服务器获得对应的ip地址
2. 与web服务器建立TCP 连接
[服务器的重定向响应（从 http://example.com 到 http://www.example.com）]
3. 服务器处理请求
4. 服务器返回一个HTTP响应
5. 浏览器显示HTML
6. 浏览器发送请求获取对应的资源（如图片、音频、视频、CSS、JS等等）
7. 浏览器发送异步请求
```

### 浏览器解析过程
```
解析html以构建dom树
构建render树
布局render树
绘制render树
```


### 防抖和节流
防抖和节流本质上是不一样的，防抖是将多次操作变为最后一次操作，
而节流是将多次操作变为连续多个间隔去执行

#### 节流
当函数事件触发后，短时间间隔内无法再次调用，只有当上一次函数执行完毕，且过了规定的时间间隔之后才会继续执行下一次的事件处理函数调用
```
```

### node cluster
```
cluster模块是对child_process模块的进一步封装，专用于解决单进程NodeJS Web服务器无法充分利用多核CPU的问题。使用该模块可以简化多进程服务器程序的开发，让每个核上运行一个工作进程，并统一通过主进程监听端口和分发请求。
```

### react hooks

### bfc

### websocket



### 字符串 为什么有 substring() 等 方法



### require 与 import 的区别

ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。


Require是CommonJS的语法，CommonJS的模块是对象，输入时必须查找对象属性
```
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;

//整体加载fs模块（即加载fs所有方法），生成一个对象"_fs"，然后再从这个对象上读取三个方法，这叫“运行时加载”，因为只有运行时才能得到这个对象，不能在编译时做到静态化。
```

ES6模块不是对象，而是通过export命令显示指定输出代码，再通过import输入。
```
import { stat, exists, readFile } from 'fs';
//从fs加载“stat, exists, readFile” 三个方法，其他方法不加载
```


ES6模块默认使用严格模式，无论是否声明“use strict”


### 判断一个字符串是否括号匹配
```
如有括号 (), [],{}, 
字符串 'dfdf(djff)df'是匹配的
字符串 'dfd{f(djff)d}f'是匹配的
字符串 'dfd{f(djff)d(dd}f'是不匹配的

利用 栈先进后出的原理

/**
 * 判断字符串是否括号匹配
 */

function matchBracket(str:string): boolean {
	let length = str.length;
	if(length === 0){
		return true;
	}

	let leftSymbols=[
	'(',
	'{',
	'[',
	]

	let rightSymbols=[
		')',
		'}',
		']'
	]


	let mapping: {[key: string]: any}={
		')':"(",
		'}':"{",
		']':"[",
	}

	let stack=[]
	for (var i = 0; i < str.length; i++) {

		let s = str[i]

		console.log(s)
		if(leftSymbols.indexOf(s) > -1){
			stack.push(s)
		}

		if(rightSymbols.indexOf(s) > -1){
			let shouldMatch=stack[stack.length -1]
			if(mapping[s] != shouldMatch){

				return false
			}else{
				stack.pop()
			}

		}
	}

	if(stack.length === 0){
		return true
	}

	return false
}

let str=`ksfj{dls(fjl(ddfds)d)fskja{dfsa}ddf`
console.log(matchBracket(str))
```



### 封装FetchAPI，要求超时报错的同时，取消执行promise，而不继续执行
```
function fetchWithTimeout(url, options, timeout = 5000) {
  const controller = new AbortController();
  const { signal } = controller;

  // 创建一个Promise，用于封装Fetch请求
  const fetchPromise = fetch(url, { ...options, signal });

  // 创建一个Promise，用于处理超时
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      controller.abort();
      reject(new Error('Request timed out'));
    }, timeout);
  });

  // 使用Promise.race将Fetch请求和超时Promise进行竞争
  return Promise.race([fetchPromise, timeoutPromise])
    .then(response => {
      // 如果Fetch请求成功，返回响应数据
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .catch(error => {
      // 如果Fetch请求超时或失败，抛出错误
      throw error;
    });


}



// 使用示例
const url = 'https://api.50d.top/DEMO_APP/util/mockAPI';

// 发起Fetch请求，设置超时时间为3秒
const requestPromise = fetchWithTimeout(url, {
	method: "POST",
	headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
	body:JSON.stringify({
		delay: 6500
	})
}, 3000);


requestPromise.then(res => {
	console.log(res)
}).catch(error => {
  if (error.name === 'AbortError') {
    console.log('Request aborted');
  } else if (error.message === 'Request timed out') {
    console.log('Request timed out');
  } else {
    console.log('Request failed');
  }
});
```


### 用两个栈实现一个队列
```

class Myqueue{

	private stack1: number[] = [];
	private stack2: number[] = [];

	// 入队
	add(n:number): void{
		this.stack1.push(n)
	}


	//出队
	delete(): number | undefined{
		let stack1 = this.stack1;
		while(stack1.length){
			let n = stack1.pop();
			if(n){
				this.stack2.push(n)
			}
		}

		let res = this.stack2.pop();
		while(this.stack2.length){
			let n = this.stack2.pop()
			if(n){
				stack1.push(n)
			}
		}
		return res

	}

	get length(){
		return this.stack1.length
	}
}


let que = new Myqueue()


que.add(100);
que.add(200);
que.add(300);

console.log(que.delete())
console.log(que.length)

console.log(que.delete())
console.log(que.length)

console.log(que.delete())
console.log(que.length)

```


### 链表
数组需要一块连续的内存区间，而链表是零散的  
链表、数组是一种物理结构，栈和队列是逻辑结构  
java 中自带链表这种数据结构，js需要自己实现  

链表查询慢O(n),新增和删除快O(1)
数组查询快O(1),新增和删除慢O(n)



#### 把JS array 转化为单向链表
```

interface ILinkListNode{
	value: number
	next?: ILinkListNode
}

function createLinkList(arr: number[]) : ILinkListNode{

	const length = arr.length;
	if(length === 0) throw new Error('arr is empty')

	let curNode: ILinkListNode = {
		value: arr[arr.length -1]
	}

	if(length === 1) return curNode

	for (let index = length - 2; index >= 0; index--) {
		const element = arr[index];
		curNode= {
			value: arr[index],
			next: curNode
		}
		
	}
	return curNode
	
}


let c= createLinkList([100, 200, 300]);

console.log(c)
```