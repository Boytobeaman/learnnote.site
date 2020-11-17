---
title: "react HOC"
metaTitle: "react HOC, 高阶组件的用法，HOC 笔记"
metaDescription: "react HOC, 高阶组件的用法，HOC 笔记"
---

### 利用 HOC 共享重复逻辑的代码，在不同的组件共享相同的功能
```
注意：
index.js 里面的<ClickCounter name="clickname" /> name 属性是传给了高阶组件withCounter,
因此，要想在ClickCounter 组件里拿到 name 属性，就需要在高阶组件里面把 props 传给WrappedComponent，
<WrappedComponent 
  count={this.state.count} 
  incrementCount={this.incrementCount}
  {...this.props}
/>
```

#### index.js
```
import React, { Component } from "react";
import ClickCounter from "./ClickCounter";
import HoverCounter from "./HoverCounter";

class Testc extends Component {
  render(){
    return(
      <div className="container">
        <ClickCounter name="clickname" />
        <HoverCounter name="hovername" />
      </div>
    )
  }
}

export default Testc
```
#### ClickCounter.js
```
import React, { Component } from 'react'
import withCounter from './withCounter'

class ClickCounter extends Component {
  render() {
    const { count, incrementCount, name } = this.props;
    console.log(`${name} click counter ${count} times` )
    return (
      <div>
        <button onClick={incrementCount}>Clicked {count} times</button>
      </div>
    )
  }
}

export default withCounter(ClickCounter)
```

#### HoverCounter.js
```
import React, { Component } from 'react'
import withCounter from './withCounter'

class HoverCounter extends Component {
  render() {
    const { count, incrementCount, name } = this.props;
    console.log(`${name} Hover counter ${count} times` )
    return (
      <div>
        <div onMouseOver={incrementCount}>Hovered {count} times</div>
      </div>
    )
  }
}

export default withCounter(HoverCounter)
```

#### withCounter.js
```
import React, { Component } from 'react';

const withCounter = (WrappedComponent) => {
  
  class WithCounter extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         count: 0,
      }
    }
    incrementCount = () =>{
      this.setState(prevState => {
        return {count: prevState.count + 1}
      })
    }

    render() {
      return <WrappedComponent 
                count={this.state.count} 
                incrementCount={this.incrementCount}
                {...this.props}
              />;
    }
  }
  return WithCounter
}

export default withCounter
```