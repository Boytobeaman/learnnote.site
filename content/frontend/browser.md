---
title: "浏览器渲染"
metaTitle: "浏览器 渲染过程，关键渲染路径布局"
metaDescription: "浏览器 渲染过程，关键渲染路径布局，回流，重绘"
---



### 浏览器渲染流程

javascript(触发页面视觉变化)


style(根据css重新计算样式)


layout(布局，得到元素的大小和位置)


paint（把元素实际绘制到页面上，像素化每个节点的过程）


composite（合成/复合）把页面拆成多个图层，进行绘制



### 浏览器有 渲染引擎和 JS 引擎
渲染引擎， 我们常说的浏览器内核主要指的就是渲染引擎： WebKit
JavaScript 引擎是一个专门处理 JavaScript 脚本的虚拟机，常见的 js引擎： V8

### 页面中有script标签时会阻塞html 的渲染
如下面的 myElement 在script 下面，这时就去不到它的值，就会返回undefined
```
<script>
  for (var i = 0; i < 5000000; i++) {
    if(i%50000 === 0){
      console.log(`i ==`,i)
    }
    
  }
  console.log(document.body.innerHTML);
  let myElement = document.getElementById("myElement");
  console.log(`myElement===`);
  console.log(myElement);// undefined
</script>
<img id="img" src="https://www.learnnote.site/images/golden-retriever.png" />
<div id="myElement" className='p-2 bg-gray-200 mt-1'>default content, the text should be changed to "Page loaded successfully!"</div>
```

### 回流（reflow） 
对页面做了一些事情，导致了layout过程的再次发生

#### 影响回流的一些操作
```
添加/删除元素  
操作styles
display:none
offsetLeft
scrollTop
clientWidth
移动元素的位置
修改浏览器大小，字体等

```


4 things a browser can animate cheaply

浏览器不会触发回流，而直接触发复合的过程

position: transform: translate(npx, npx)




### 防止布局抖动

#### 避免回流

#### 读写分离
利用fastdom 进行元素位置的读写分离


#### react fiber 时间分片 5 毫秒时间，以便响应更高优先级的任务，如用户输入点击等。浏览器渲染是每秒60帧，也就是16ms渲染一帧。每秒60帧是人类肉眼看起来比较流畅的


#### window.requestAnimationFrame vs window.requestIdleCallback
```
window.requestAnimationFrame 
rAF是渲染之前发生，高优先级
一般情况下，一帧会执行一次 requestAnimationFrame


window.requestIdleCallback 
空闲时才执行，低优先级
```