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