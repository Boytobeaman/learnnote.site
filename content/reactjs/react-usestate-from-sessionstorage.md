---
title: "react useState from sessionStorage"
metaTitle: "react useState from sessionStorage"
metaDescription: "react useState from sessionStorage，useState 的初始值使用了 sessionStorage 里面的值，sessionStorage 的值更新了，但 useState 的值没有更新"
---


### react useState 的初始值使用了 sessionStorage 里面的值，组件渲染过程中 sessionStorage 的值更新了，但 useState 的值还会为初始值

### 可以使用 useEffect 监控 初始值的变化，有变化后更新到 state 中
```
  useEffect(() => {
    setIsChecked(initialValueFromSession)
  }, [initialValueFromSession])
```

### 完整代码
#### 问题描述
checkbox 是否勾选是存在 sessionStorage 中，因此 useState 初始化值从 sessionStorage 中取得，
但在ui交互过程中sessionStorage 的值更新了，但是 useState 的值还会是初始值，因此checkbox 的值没有变化，
```
import { useEffect, useState } from 'react';


function CheckBox(props) {
  
  return(
    // eslint-disable-next-line react/prop-types
    <input type="checkbox" checked={props.isChecked} readOnly/>
  )
}

function getValueFromSession(key){
  return sessionStorage.getItem(key)
}

export default function ErrorUseStateFromSessionDemo() {

  let initialValueFromSession = getValueFromSession("isChecked");
  initialValueFromSession = Boolean(initialValueFromSession);

  console.log(`initialValueFromSession`)
  console.log(initialValueFromSession)

  const [isChecked, setIsChecked] = useState(initialValueFromSession);
  const [count, setCount] = useState(1);

  console.log(`count ===`)
  console.log(count)

  console.log(`isChecked ===`)
  console.log(isChecked)

  const sampleCode = `
    useEffect(() => {
      setIsChecked(initialValueFromSession)
    }, [initialValueFromSession])
  `


  useEffect(() => {
    let timer=setInterval(() => {
      console.log(`timer called`, count)
      setCount(count => count + 1)
    }, 1000);

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if(count === 10){
      sessionStorage.setItem("isChecked", true)
    }
  }, [count])

  useEffect(() => {
    setIsChecked(initialValueFromSession)
  }, [initialValueFromSession])


  return (
    <>
      <p>demo of usestate using the sessionStorage value as initial value</p>
      <p>count: {count}, count = 10 will set the sessionStorage of isChecked to true</p>
      <p>after 10 seconds, the isChecked value in sessionStorage is update to true</p>
      <p>and the component rerendered as the count value change, but the value of isChecked as a state is not changed</p>
      <button onClick={() => {
        sessionStorage.clear();
        setCount(1)
      }}>reset sessionStorage and count</button>

      <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
      <p>how to fix it</p>
      <p>add useEffect to monitor the state of initialValueFromSession</p>
      <pre>
      {sampleCode}
      </pre>
    </>
  )
}
```

