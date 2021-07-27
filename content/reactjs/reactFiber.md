---
title: "react fiber"
metaTitle: "react fiber, react fiber 原理"
metaDescription: "react fiber, react fiber 原理"
---

#### what is react fiber

React Fiber is to increase its suitability for areas like animation, layout, and gestures. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames.

简单点说，Fiber 就是 React 16 实现的一套新的更新机制，让 React 的更新过程变得可控，避免了之前一竿子递归到底影响性能的做法。


#### 关于 Fiber 你需要知道的基础知识
##### 浏览器刷新率（帧）
页面的内容都是一帧一帧绘制出来的，浏览器刷新率代表浏览器一秒绘制多少帧。目前浏览器大多是 60Hz（60帧/s），每一帧耗时也就是在 16ms 左右。原则上说 1s 内绘制的帧数也多，画面表现就也细腻。那么在这一帧的（16ms） 过程中浏览器又干了啥呢？

[![react fiber 浏览器一帧干的事情](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/life-of-a-frame.png)]

1. 接受输入事件
1. 执行事件回调
1. 开始一帧
1. 执行 RAF (RequestAnimationFrame)
1. 页面布局，样式计算
1. 渲染
1. 执行 RIC (RequestIdelCallback)

第七步的 RIC 事件不是每一帧结束都会执行，只有在一帧的 16ms 中做完了前面 6 件事儿且还有剩余时间，才会执行。这里提一下，如果一帧执行结束后还有时间执行 RIC 事件，那么下一帧需要在事件执行结束才能继续渲染，所以 RIC 执行不要超过 30ms，如果长时间不将控制权交还给浏览器，会影响下一帧的渲染，导致页面出现卡顿和事件响应不及时。


##### JS 原生执行栈
React Fiber 出现之前，React 通过原生执行栈递归遍历 VDOM
浏览器引擎会从执行栈的顶端开始执行，执行完毕就弹出当前执行上下文，开始执行下一个函数，直到执行栈被清空才会停止。然后将执行权交还给浏览器。由于 React 将页面视图视作一个个函数执行的结果。每一个页面往往由多个视图组成，这就意味着多个函数的调用。

如果一个页面足够复杂，形成的函数调用栈就会很深。每一次更新，执行栈需要一次性执行完成，中途不能干其他的事儿，只能"一心一意"。结合前面提到的浏览器刷新率，JS 一直执行，浏览器得不到控制权，就不能及时开始下一帧的绘制。如果这个时间超过 16ms，当页面有动画效果需求时，动画因为浏览器不能及时绘制下一帧，这时动画就会出现卡顿。不仅如此，因为事件响应代码是在每一帧开始的时候执行，如果不能及时绘制下一帧，事件响应也会延迟。

##### 时间切片（Time Slicing）

examble：曹冲称象
时间切片是一项使用得比较广的技术方案，它的本质就是将长任务分割为一个个执行时间很短的任务，然后再一个个地执行。

比如将 100000 个节点渲染到某个页面节点下，我们可以一次性循环100000 次生成节点，然后把节点挂载到页面节点上，但是会有明显的卡顿
```
let list = document.querySelector('.list')
let total = 100000
for (let i = 0; i < total; ++i) {
    let item = document.createElement('li')
    item.innerText = `我是${i}`
    list.appendChild(item)
}
```

我们可以把 这100000 次循环 分成若干 个小任务，完成每个小任务后，浏览器就有时间更新下一帧的页面效果，从而解决卡顿问题

使用 requestAnimationFrame 和 createDocumentFragment api
```
let list = document.querySelector('.list')
let total = 100000
let onceNumber = 20
let currentIndex = 0

const renderToPage = (total, currentIndex) => {
if(total <= 0){
    return
}
let loopNumber = Math.min(total, onceNumber);

window.requestAnimationFrame(() => {
    let fragment = document.createDocumentFragment();
    for (let i = 1; i <= loopNumber; i++) {
    let item = document.createElement('li')
            item.innerText = `我是 new ${currentIndex + i}`
    fragment.appendChild(item)
    }
    list.appendChild(fragment)

    let newTotal = total - loopNumber
    let newIndex = currentIndex + loopNumber
    if(newTotal > 0){
    renderToPage(newTotal, newIndex)
  }
})

}

renderToPage(total, currentIndex)
```

##### 链表 （Linked List）
React Fiber 中用链表遍历的方式替代了 React 16 之前的栈递归方案
它使用单链表树遍历算法。它使暂停遍历并阻止堆栈增长成为可能。

### React Fiber 是如何实现更新过程可控？

#### 任务拆分
#### 挂起、恢复、终止
#### 任务具备优先级