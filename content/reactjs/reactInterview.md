
---
title: "react 常见面试题"
metaTitle: "react 常见面试题, React 面试题"
metaDescription: "react 常见面试题, React 面试题"
---

### react 是什么？
```
react 是一个网页UI框架，通过组件化的方式解决视图层开发复用的问题，本质上是一个组件化框架

它的核心设计思路有三点，声明式、组件化、通用性

声明式的优势是直观(一看就明白什么意思)与组合（更好地和其他代码组合）
组件化的优势在于视图的拆分和模块的复用，可以更容易做到高类聚，低耦合
通用性在于一次学习，随处编写，react native等


缺点：
React 作为一个视图层的框架，它并没有提供完整的一揽子解决方案，在开发大型前端应用时，需要向社区寻找解决方案，为开发者的技术选型和学习适用上造成了一定的成本。
```


React 中 keys 的作用是什么？

Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识
```
在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性。
```
```
render () {
  return (
    <ul>
      {this.state.todoItems.map(({item, key}) => {
        return <li key={key}>{item}</li>
      })}
    </ul>
  )
}
```
#### 通常使用 id 来作为一个元素的key
列表没有id时的解决方式

1.创建元素时增加一个自增id属性
```
todoCounter = 1;
function createNewTodo(text) {
  return {
    completed: false,
    id: todoCounter++,
    text
  }
}

```
2.使用shortid库来产生id
```
var shortid = require('shortid');

function createNewTodo(text) {
    return {
      completed: false,
      id: shortid.generate(),
      text
    }
}
```

调用 setState 之后发生了什么？

```
在代码中调用 setState 函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。
```

react 生命周期函数
[w3schools react lifecycle](https://www.w3schools.com/react/react_lifecycle.asp)

```
初始化阶段(Mounting)：
Mounting means putting elements into the DOM.

New:
  constructor()
  getDerivedStateFromProps()
  render()
  componentDidMount()

The render() method is required and will always be called, the others are optional and will be called if you define them.


Old:
  getDefaultProps:获取实例的默认属性
  getInitialState:获取每个实例的初始化状态
  componentWillMount：组件即将被装载、渲染到页面上
  render:组件在这里生成虚拟的 DOM 节点
  componentDidMount:组件真正在被装载之后


diff:
  getDerivedStateFromProps ---added
  getDefaultProps          ---deleted
  getInitialState          ---deleted



更新中状态（updating）：

New (in this order):
getDerivedStateFromProps()
shouldComponentUpdate()
render()
getSnapshotBeforeUpdate()
componentDidUpdate()

Old:
  componentWillReceiveProps:组件将要接收到属性的时候调用
  shouldComponentUpdate:组件接受到新属性或者新状态的时候（可以返回 false，接收数据后不更新，阻止 render 调用，后面的函数不会被继续执行了）
  componentWillUpdate:组件即将更新不能修改属性和状态
  render:组件重新描绘
  componentDidUpdate:组件已经更新


diff:
  getDerivedStateFromProps() --added
  getSnapshotBeforeUpdate() ---added

  componentWillReceiveProps ---deleted
  componentWillUpdate       ---deleted

销毁阶段（Unmounting）：
    componentWillUnmount:组件即将销毁
```

shouldComponentUpdate 是做什么的，（react 性能优化是哪个周期函数？）
```
shouldComponentUpdate 这个方法用来判断是否需要调用 render 方法重新描绘 dom。因为 dom 的描绘非常消耗性能，如果我们能在 shouldComponentUpdate 方法中能够写出更优化的 dom diff 算法，可以极大的提高性能。
```

#### getDerivedStateFromProps
```
getDerivedStateFromProps exists for only one purpose. It enables a component to update its internal state as the result of changes in props.

getDerivedStateFromProps is invoked right before calling the render method, both on the initial mount and on subsequent updates. It should return an object to update the state, or null to update nothing.

```
#### componentDidMount()
```
componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

componentDidMount() {
  let value = this.context;
  /* perform a side-effect at mount using the value of MyContext */
}
```

#### getSnapshotBeforeUpdate
In the getSnapshotBeforeUpdate() method you have access to the props and state before the update, meaning that even after the update, you can check what the values were before the update

If the getSnapshotBeforeUpdate() method is present, you should also include the componentDidUpdate() method, otherwise you will get an error.
```
getSnapshotBeforeUpdate(prevProps, prevState) {
  document.getElementById("div1").innerHTML =
  "Before the update, the favorite was " + prevState.favoritecolor;
}
```


#### componentDidUpdate
```
componentDidUpdate(prevProps, prevState, snapshot)
componentDidUpdate() is invoked immediately after updating occurs. This method is not called for the initial render.

componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}

componentDidUpdate() will not be invoked if shouldComponentUpdate() returns false.
```


#### componentWillUnmount()
```
componentWillUnmount() is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in componentDidMount().

You should not call setState() in componentWillUnmount() because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again.
```

### 为什么虚拟 dom 会提高性能?(必考)
```
虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 dom diff 算法避免了没有必要的 dom 操作，从而提高性能。

用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上，视图就更新了。
```

### 请阐述一下你对虚拟DOM和Dom-Diff的理解， react diff 原理（常考，大厂必考）
```
1 用JS对象模拟DOM（虚拟DOM）
2 把此虚拟DOM转成真实DOM并插入页面中（render）
3 如果有事件发生修改了虚拟DOM，比较两棵虚拟DOM树的差异，得到差异对象（diff）
4 把差异对象应用到真正的DOM树上（patch）



react DIFF
把树形结构按照层级分解，只比较同级元素。
给列表结构的每个单元添加唯一的 key 属性，方便比较。
React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）
合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty.到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制.
选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能。

```

### React 中 refs 的作用是什么？
```
Refs 是 React 提供给我们的安全访问 DOM 元素或者某个组件实例的句柄。我们可以为元素添加 ref 属性然后在回调函数中接受该元素在 DOM 树中的句柄，该值会作为回调函数的第一个参数返回：

class CustomForm extends Component {
  handleSubmit = () => {
    console.log("Input Value: ", this.input.value)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          ref={(input) => this.input = input} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

上述代码中的 input 域包含了一个 ref 属性，该属性声明的回调函数会接收 input 对应的 DOM 元素，我们将其绑定到 this 指针以便在其他的类函数中使用。另外值得一提的是，refs 并不是类组件的专属，函数式组件同样能够利用闭包暂存其值：

function CustomForm ({handleSubmit}) {
  let inputElement
  return (
    <form onSubmit={() => handleSubmit(inputElement.value)}>
      <input
        type='text'
        ref={(input) => inputElement = input} />
      <button type='submit'>Submit</button>
    </form>
  )
}


```

### 如果你创建了类似于下面的 Twitter 元素，那么它相关的类定义是啥样子的？

```
<Twitter username='tylermcginnis33'>
  {(user) => user === null
    ? <Loading />
    : <Badge info={user} />}
</Twitter>


import React, { Component, PropTypes } from 'react'
import fetchUser from 'twitter'
// fetchUser take in a username returns a promise
// which will resolve with that username's data.
class Twitter extends Component {
  // finish this
}
```

```
import React, { Component, PropTypes } from 'react'
import fetchUser from 'twitter'
class Twitter extends Component {
    state={
        user: null
    }
    static propTypes = {
        username: PropTypes.string.isRequired,
    }
    componentDidMount (){
        fetchUser(this.props.username)
            .then((user)=> this.setState({user}))
    }
    render (){
        return this.props.children(this.state.user)
    }
}
```

这种模式的优势在于将父组件与子组件解耦和，父组件可以直接访问子组件的内部状态而不需要再通过 Props 传递，这样父组件能够更为方便地控制子组件展示的 UI 界面。譬如产品经理让我们将原本展示的 Badge 替换为 Profile，我们可以轻易地修改下回调函数即可：

```
<Twitter username='tylermcginnis33'>
  {(user) => user === null
    ? <Loading />
    : <Profile info={user} />}
</Twitter>
```

### 展示组件(Presentational component)和容器组件(Container component)之间有何不同
```
展示组件关心组件看起来是什么。展示专门通过 props 接受数据和回调，并且几乎不会有自身的状态，但当展示组件拥有自身的状态时，通常也只关心 UI 状态而不是数据的状态。

容器组件则更关心组件是如何运作的。容器组件会为展示组件或者其它容器组件提供数据和行为(behavior)，它们会调用 Flux actions，并将其作为回调提供给展示组件。容器组件经常是有状态的，因为它们是(其它组件的)数据源。
```

### 类组件(Class component)和函数式组件(Functional component)之间有何不同
```
类组件不仅允许你使用更多额外的功能，如组件自身的状态和生命周期钩子，也能使组件直接访问 store 并维持状态

当组件仅是接收 props，并将组件自身渲染到页面时，该组件就是一个 '无状态组件(stateless component)'，可以使用一个纯函数来创建这样的组件。这种组件也被称为哑组件(dumb components)或展示组件
```


### 说一说对组件化的理解
```
组件的封装  ----视图、数据、变化逻辑（数据驱动视图变化） 被组件封装起来
组件的复用
```

### (组件的)状态(state)和属性(props)之间有何不同
```
State 是一种数据结构，用于组件挂载时所需数据的默认值。State 可能会随着时间的推移而发生突变，但多数时候是作为用户事件行为的结果。

Props(properties 的简写)则是组件的配置。props 由父组件传递给子组件，并且就子组件而言，props 是不可变的(immutable)。组件不能改变自身的 props，但是可以把其子组件的 props 放在一起(统一管理)。Props 也不仅仅是数据--回调函数也可以通过 props 传递。
```

### 何为受控组件(controlled component)
```
在 HTML 中，类似 <input>, <textarea> 和 <select> 这样的表单元素会维护自身的状态，并基于用户的输入来更新。当用户提交表单时，前面提到的元素的值将随表单一起被发送。但在 React 中会有些不同，包含表单元素的组件将会在 state 中追踪输入的值，并且每次调用回调函数时，如 onChange 会更新 state，重新渲染组件。一个输入表单元素，它的值通过 React 的这种方式来控制，这样的元素就被称为"受控元素"。

In React, an <input type="file" /> is always an uncontrolled component because its value can only be set by a user, and not programmatically.
```

### 何为高阶组件(higher order component)
```
高阶组件是一个以组件为参数并返回一个新组件的函数。HOC 运行你重用代码、逻辑和引导抽象。最常见的可能是 Redux 的 connect 函数。除了简单分享工具库和简单的组合，HOC 最好的方式是共享 React 组件之间的行为。如果你发现你在不同的地方写了大量代码来做同一件事时，就应该考虑将代码重构为可重用的 HOC。
```

### setState 的第二个可选参数是什么，有什么作用？
```
A callback function which will be invoked when setState has finished and the component is re-rendered.

this.setState(
  { username: 'tylermcginnis' },
  () => console.log('setState has finished and the component has re-rendered.')
)

setState is asynchronous, which is why it takes in a second callback function. Typically it’s best to use another lifecycle method rather than relying on this callback function, but it’s good to know it exists.
```

### 为什么建议传递给 setState 的参数是一个 callback 而不是一个对象
```
因为 this.props 和 this.state 的更新可能是异步的，不能依赖它们的值去计算下一个 state。
```

### 除了在构造函数中绑定 this，还有其它方式吗
```
你可以使用属性初始值设定项(property initializers)来正确绑定回调，create-react-app 也是默认支持的。在回调中你可以使用箭头函数，但问题是每次组件渲染时都会创建一个新的回调。
```

### (在构造函数中)调用 super(props) 的目的是什么
```
在 super() 被调用之前，子类是不能使用 this 的，在 ES2015 中，子类必须在 constructor 中调用 super()。传递 props 给 super() 的原因则是便于(在子类中)能在 constructor 访问 this.props。
```

### 应该在 React 组件的何处发起 Ajax 请求
```
在 React 组件中，应该在 componentDidMount 中发起网络请求。这个方法会在组件第一次“挂载”(被添加到 DOM)时执行，在组件的生命周期中仅会执行一次。更重要的是，你不能保证在组件挂载之前 Ajax 请求已经完成，如果是这样，也就意味着你将尝试在一个未挂载的组件上调用 setState，这将不起作用。在 componentDidMount 中发起网络请求将保证这有一个组件可以更新了。
```

### 描述事件在 React 中的处理方式。
```
为了解决跨浏览器兼容性问题，您的 React 中的事件处理程序将传递 SyntheticEvent 的实例，它是 React 的浏览器本机事件的跨浏览器包装器。

这些 SyntheticEvent 与您习惯的原生事件具有相同的接口，除了它们在所有浏览器中都兼容。有趣的是，React 实际上并没有将事件附加到子节点本身。React 将使用单个事件监听器监听顶层的所有事件。这对于性能是有好处的，这也意味着在更新 DOM 时，React 不需要担心跟踪事件监听器。
```

### React 中有三种构建组件的方式
```
React.createClass()、ES6 class 和无状态函数。
```
### react 组件的划分业务组件技术组件？
```
根据组件的职责通常把组件分为 UI 组件和容器组件。
UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
两者通过 React-Redux 提供 connect 方法联系起来。
```

### 了解 redux 么，说一下 redux 把
```
redux 是一个应用数据流框架，主要是解决了组件间状态共享的问题，原理是集中式管理，主要有三个核心方法，action，store，reducer，工作流程是 view 调用 store 的 dispatch 接收 action 传入 store，reducer 进行 state 操作，view 通过 store 提供的 getState 获取最新的数据，flux 也是用来进行数据操作的，有四个组成部分 action，dispatch，view，store，工作流程是 view 发出一个 action，派发器接收 action，让 store 进行数据更新，更新完成以后 store 发出 change，view 接受 change 更新视图。Redux 和 Flux 很像。主要区别在于 Flux 有多个可以改变应用状态的 store，在 Flux 中 dispatcher 被用来传递数据到注册的回调事件，但是在 redux 中只能定义一个可更新状态的 store，redux 把 store 和 Dispatcher 合并,结构更加简单清晰
```
### redux 设计原则
1. 单向数据流
1. 唯一数据源
1. 保持状态只读(不可以更改，只能创建一个新的store)
1. 数据的改变只能通过纯函数reducer来完成

### redux 有什么缺点
```
一个组件所需要的数据，必须由父组件传过来，而不能像 flux 中直接从 store 取。
当一个组件相关数据更新时，即使父组件不需要用到这个组件，父组件还是会重新 render，可能会有效率影响，或者需要写复杂的 shouldComponentUpdate 进行判断。
```

### 何为 Children
```
在JSX表达式中，一个开始标签(比如<a>)和一个关闭标签(比如</a>)之间的内容会作为一个特殊的属性props.children被自动传递给包含着它的组件。

这个属性有许多可用的方法，包括 React.Children.map，React.Children.forEach， React.Children.count， React.Children.only，React.Children.toArray。
```

## JSX 的本质
### 语法
```
注释
{/* <Todo> */}

{variable}
{name || 'lishi'}
{show ? "show content" : ""}
{list.map((item,index) =>{
  return <li key={index}>{item}</li>
})}

<p className="container" style={{fontSize:'40px',color:'blue'}}>content</p>
```
### JSX 解析

babel(babel-loader) compiles JSX down to React.createElement() calls.
React elements are plain objects, and are cheap to create. React DOM takes care of updating the DOM to match the React elements.

```
jsx 代码
var profile= <div>
              <img src="avatar.png" className="profile" />
              <h3>{[user.firstName, user.lastName].join(" ")}</h3>
             </div>

var profile = React.createElement("div",null,
  React.createElement("img", {src: "avatar.png",className:"profile"}),
  React.createElement("h3", null, [user.firstName, user.lastName].join(" ")),
);

语法参数
React.createElement(元素标签，元素属性，子元素1，子元素2)
React.createElement(元素标签，元素属性，[子元素1，子元素2])

这也是为什么模块开头要
import React from 'react';
```

vue 和 react 的区别
```
vue 本质是 MVVM 框架，由MVC发展而来
react 本质是前端组件化框架，由后端组建后发展而来

模板的区别
vue 有自己的一些指令，比如 v-for,v-if
react 是jsx 语法，{} 里符合js的逻辑

都支持组件化
都是数据驱动视图，数据和视图分离
```

react 新特性16.4
```
```

react hooks


### redux 数据跟新后，如何触发react 更新视图的
```
```

react 遇到的坑
```
在 componentDidUpdate 里面用 setState()
componentDidUpdate(prevProps){
  if(condition){
    fetchData()
      .then(data =>{
        //change same status
      })
  }
}
condition 有一个判断条件,没有让prevProps和this.props 里面的值比较
导致一直重复发请求
```

如果有setTimeout, 在 componentWillUnmount 要清空
```
// a 页面
componentDidMount() {
  setTimeout(() => {
    const tableY = document.getElementById("aaa").offsetHeight - 82;
  }, 500);
}

比如加载完a页面，还没有到500毫秒切换到b页面，到500毫秒后 setTimeout 里面的内容会执行
但是这时 已经切换到b 页面，已经没有 ID为 aaa 的元素了，所以会报错

解决方法：
componentDidMount() {
  let timer = setTimeout(() => {
    const tableY = document.getElementById("aaa").offsetHeight - 82;
  }, 500);
}
componentWillUnmount{
  clearTimeout(timer)
}
```

### react hooks 遇到的坑

#### react 中，如果某个state 为一个对象，更新这个对象的某个属性值，视图不会更新，为什么
update nested state properties in React

```
let thirdIOTAuthData = yield select(state => state.IOTDataModel.thirdIOTAuthData)

//更新 thirdIOTAuthData 的 channel （haike）属性
thirdIOTAuthData[channel] = data
//更新state
yield put({ "type": "setThirdIOTAuthData", data: thirdIOTAuthData});

结果视图上用到channel （haike）属性 的地方并没有更新


用这个 Object.assign 生成一个新的对象就可以了
yield put({ "type": "setThirdIOTAuthData", data: Object.assign({},thirdIOTAuthData) });
```

原因是 react 判断状态变化是浅比较
浅比较就是只比较第一级，对于基本数据类型，只比较值；
对于引用数据类型值，直接比较地址是否相同，不管里面内容变不变，只要地址一样，我们就认为没变。
```
state{
  thirdIOTAuthData:{
    haike:{
      aaa:"aaa"
    }
  }
}

变为
state{
  thirdIOTAuthData:{
    haike: false
  }
}

分析：
thirdIOTAuthData 为对象（引用数据类型值），会比较 地址是否相同，不管里面内容变不变，只要地址一样，我们就认为没变

因此给新的 thirdIOTAuthData 赋值 是可以 Object.assign 来产生一个新的对象


```


#### React Hook stale-closure 过期闭包的问题

```
import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setTimeout(function delay() {
      console.log(`count a === ${count}`);
      setCount(count + 1);
    }, 2000);
  }

  return (
    <div className="App">
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Increase</button>
    </div>
  );
}
```
点击一次 handleClick 后，最终的 count 为 1，不为2

为什么？

过程一：
因为点击 handleClick 后，这时 handleClick 函数里 count 为初始值0

过程二：
hooks 函数是异步的，所以 第一个 setCount(count + 1) 并不会立即改变 count的值，便会执行到 setTimeout.

过程三：
然后setTimeout 还没有到时间（这里设置的是2s）的时候 count 会已经变为 1，
但是两秒后执行到 里面的 setCount(count + 1) 时，当时的闭包作用域下 count 为0，
因此 执行的结果是 setCount(0 + 1)，最后count 依然是1



如何解决，让闭包里面的 hooks 函数拿到最新值，而不是闭包里面的值？


使用 ref 储存最新的值，使用时从ref 中取值
```
const [count, setCount] = useState(0);
const countRef = useRef(0);

//每次把最新的值存到 countRef 里面
countRef.current = count;

useEffect(() => {
  setTimeout(() => {
    // 过期闭包里面取值时，从ref （countRef ）中取
    alert("You clicked on: " + countRef.current);
  }, 3000);
}, []);
```


方法 一：传一个回调函数，回调函数的参数会是 previous state
```
setCount(count => {
  return count + 1
});
```




### hooks setState 异步问题
#### 并列的 setState 会合并，以最后一个为准
```
setCount(count + 1);
setCount(count + 8);

//最后会执行 setCount(count + 8);
```


#### setState 后面有 回调函数设值的方式，它会等待前面一个 setState 的结果生效后执行
```
const [count, setCount] = useState(0);
...

setCount(count + 1);
setCount((count) => {
  console.log(`kkk ${count}`);
  return count + 8;
});
// 最后 count 为 9
```

#### 多个回调函数的方式调用，后面一个会依次等待前面一个值生效后调用
```
setCount((count) => {
  return count + 1;
});

setCount((count) => {
  return count + 2;
});

setCount((count) => {
  return count + 3;
});

//count 结果为 1 + 2 + 3 = 6

```


#### 多个回调函数的方式调用，后面如果有一个直接设值的方式，那么这些setState 都会合并，只有最后一个有效
```
setCount((count) => {
  return count + 1;
});

setCount((count) => {
  return count + 2;
});

setCount((count) => {
  return count + 3;
});

setCount(count + 8);

// 最终 count = 0 + 8 = 8
```


### setState 同步问题
#### 通过js的事件绑定程序 addEventListener, setState是同步更新state
```
constructor() {
  this.state = {
    count: 10
  }

  this.handleClickOne = this.handleClickOne.bind(this)
  this.handleClickTwo = this.handleClickTwo.bind(this)
}

render() {
  return (
    <button onClick={this.hanldeClickOne}>clickOne</button>
    <button onClick={this.hanldeClickTwo}>clickTwo</button>
    <button id="btn">clickTwo</button>
  )
}

handleClickOne() {
  this.setState({ count: this.state.count + 1})
  console.log(this.state.count)
}

```

#### 通过js的事件绑定程序 addEventListener,包括 htmlType=submit 原生事件触发的程序，setState是同步更新state
```
componentDidMount() {
  document.getElementById('btn').addEventListener('click', () => {
    this.setState({ count: this.state.count + 1})
    console.log(this.state.count) 
    // 11
  })
}
```

#### 使用setTimeout/setInterval 等 React 无法掌控的 APIs情况下，setState是同步更新state
```
handleClickTwo() {
  setTimeout(() => {
    this.setState({ count: this.state.count + 1})
    console.log(this.state.count)
    // 11
  }, 10)  
}
```

### Promise来封装setState, 实现同步更新state
```
setStateAsync(state) {
	return new Promise((resolve) => {
		this.setState(state, resolve)
	});
}

async componentDidMount() {
	await this.setStateAsync({count: 1});
	console.log(this.state.count);//输出count=1
}
```


### react-router vs react-router-dom vs react-router-native
```
react-router hosts the core components for routing for React applications 
react-router-dom provides browser specific components for routing web apps 
react-router-native provides specific components for react-native or mobile apps created with React Native.
```

### HashRouter vs BrowserRouter
react-router提供了三种方式来实现路由，并没有默认的路由，需要在声明路由的时候，显式指定所使用的路由。

1. browserHistory (官方推荐的是browserHistory)
1. hashHistory
1. createMemoryHistory

#### BrowserRouter
```
It uses history API, i.e. it's unavailable for legacy browsers (IE 9 and lower and contemporaries)
Client-side React application is able to maintain clean routes like example.com/react/route but needs to be backed by web server. 

 Usually this means that web server should be configured for single-page application, i.e. same index.html is served for /react/route path or any other route on server side. On client side, window.location.pathname is parsed by React router. React router renders a component that it was configured to render for /react/route.
```

#### HashRouter
```
It uses URL hash, it puts no limitations on supported browsers or web server. Server-side routing is independent from client-side routing.


for examble: 
example.com/#/react/route, #/react/route URL hash cannot be read from server side. On client side, window.location.hash is parsed by React router. React router renders a component that it was configured to render for /react/route, similarly to BrowserRouter.
```