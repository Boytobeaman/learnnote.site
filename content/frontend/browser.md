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