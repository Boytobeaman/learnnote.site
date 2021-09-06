---
title: "react performance"
metaTitle: "react performance, react 性能优化"
metaDescription: "react performance, react 性能优化"
---

### react 性能优化
```
在一定程度上：React 著名的调度策略 -- stack Reconciliation 是 React 的性能瓶颈。

stack Reconciliation 过程会深度优先遍历所有的 Virtual DOM 节点，进行 diff。整棵 Virtual DOM 计算完成之后，将任务出栈释放主线程。所以，浏览器主线程被 React 更新状态任务占据的时候，用户与浏览器进行任何交互都不能得到反馈，只有等到任务结束，才能得到浏览器的响应。

```

#### Optimizing Performance by Skipping Effects
writing an extra comparison with prevProps or prevState inside componentDidUpdate:
```
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

useEffect Hook API  
You can tell React to skip applying an effect if certain values haven’t changed between re-renders
```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```

This also works for effects that have a cleanup phase:
```
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Only re-subscribe if props.friend.id changes
```


### useMemo
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

优化前：
{computeExpensiveValue(a, b)}

优化后：
{memoizedValue}

只有当依赖变更后（例子中的a,b）才会重现计算，触发computeExpensiveValue

```

### useMemo 的原理？

### useCallback
```
// const getItems = (incrementor) => {
//   return [number, number + incrementor, number + 2]
// }

const getItems = useCallback((incrementor) => {
  return [number, number + incrementor, number + 2]
}, [number])

<List getItems={ getItems }> nav</List>



//再此渲染的情况下，如果number 不变，getItems 的 reference equality 不变，还是上一次的值，不会是新的变量，
//因此 List 子组件就会对应的做性能优化,
//如果 父组件在不断渲染过程中，只要 number 不变，getItems 就不变，子组件就不会重新调用 setItems，也就不会重新渲染:

import React, { useCallback, useEffect, useState } from 'react';

export default function List( {getItems} ){

  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(getItems(3))

  }, [getItems])

  return items.map( item => <div key={item}>item</div>)
}
```

#### useCallback 与 useMemo 区别
```
useCallback 返回的是一个function， useMemo 返回的是一个值
useCallback 里面的函数可以传参
```


#### PureComponent
React.PureComponent 与 React.Component 唯一的区别在于 Rect.Component 没有实现 shouldComponentUpdate(), 而 React.PureComponent 中以浅层对比 prop 和state 的方式来实现了该函数。



#### React.memo

React.memo 相当与类组件里面的 PureComponent, 默认对 props 做一次浅比较，如果 props 没有变化，则子组件不会重新执行  

If your component renders the same result given the same props, you can wrap it in a call to React.memo for a performance boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered result.

```
// Person的依赖只是 info，当这个info不变的情况下，如果父组件里面的 count 变化，Person 也会重新渲染，
// 优化： 使用高阶函数 React.memo 将 Person 包起来，info不变，Person 就不会重新渲染

function Person(props) {
  console.log(`render person...`);
  return (
    <div>
      name:{props.info.name}, age:{props.info.age}
    </div>
  );
}

let MemoPerson = React.memo(Person);

let info = {
  name: "xiaohong",
  age: 20
};

export default function App() {
  let [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>count {count}</h1>
      <button onClick={() => setCount(count + 1)}>add count</button>
      <MemoPerson info={info} />
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
```