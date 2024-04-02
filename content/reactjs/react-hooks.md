---
title: "react hooks"
metaTitle: "react hooks，react hooks 笔记，react hooks 面试问题"
metaDescription: "react hooks，react hooks 笔记，react hooks 面试问题"
---


### react中为什么不能在for循环、if语句里使用hooks，说下react hooks实现原理





#### useEffect 与 useLayoutEffect
useEffect will defer the execution of the effect function until after the DOM mutations are painted, With useLayoutEffect, the computation will be triggered before the browser has painted the update.
useEffect 是等数据变化体现到UI界面上后再执行里面的function，而useLayoutEffect 对应的function 是在数据变化后，浏览器将变化绘制到界面之前就执行的方法

1. useLayoutEffect总是比useEffect先执行
1. useLayoutEffect里的任务最好影响了Layout, 操作 dom 的相关操作放到 useLayouteEffect 中去，避免导致闪烁
1. useEffect是异步的（不会阻塞浏览器渲染），useLayoutEffect是同步的（会阻塞浏览器渲染，也就是它里面的函数执行完后才到浏览器渲染）