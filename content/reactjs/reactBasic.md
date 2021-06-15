---
title: "react basic"
metaTitle: "react basic, react 基础，react 快速入门"
metaDescription: "react basic, react 基础，react 快速入门"
---

### 快速搭建React开发环境
React官方脚手架——create-react-app

```
//安装
npm install -g create-react-app

//到想要的项目文件目录下 执行
create-react-app imoc

//开启调试环境
npm start 

改变默认调试端口(package.json)

for windows:
"scripts": { "start": "set PORT=5000 && react-scripts start",

for Linux and Mac:
"scripts": { "start": "PORT=5000 react-scripts start",


//弹出配置文件，可以自定义配置 webpack
npm run eject 

// 安装第三方库 lodash,redux
npm install lodash --save
npm install redux --save

```

添加bootstrap css
```
step 1:
npm install --save bootstrap reactstrap
//安装的bootstrap应该是4.1版本的

step 2:
Import Bootstrap CSS in the src/index.js file:
import 'bootstrap/dist/css/bootstrap.css';

step 3:
Import required reactstrap components within src/App.js file or your custom component files:
import { Button } from 'reactstrap';

```
##### 有用插件
babel-plugin-import  按需加载css

```
"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd-mobile",
          "style": "css"
        }
      ],
      [
        "transform-decorators-legacy"
      ]
    ]
  },
```

#### 浏览器插件

- React Developer Tools
- Redux DevTools

##### Redux-router4


```
npm install react-router-dom --save
```
Router4 使用react-router-dom 作为浏览器端的路由

核心概念：动态路由，Router,Link,Switch
#### Route props
```
match
location
history
```
###### 入门组件
- BrowserRouter 包裹整个应用
- Router 路由对应渲染的组件，可嵌套
- Link 跳转专用
###### 其他组件
- url 参数，Router组件参数可用冒号标识参数
- Redirect 组件 跳转
- Switch 只渲染一个子Route 组件

##### axios(简洁好用的发送请求库)发送异步请求
- 使用proxy 配置转发
- axios拦截器，统一loading处理
- redux 里使用异步处理数据，渲染页面
#### react 里面的数据
- state (can be changed)
- props (can't be changed--immutable)
#### React 生命周期
- getDefaultProps
- getInitialState
- componentWillMount
- render
- componentDidMount
- componentWillUnmount


![react component lifecicle](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/documents/images/1106982-20170811224737742-1564011484.jpg)

#### redux

```
import { createStore } from 'redux';

// 这个就是reducer 处理函数，参数是状态和新的action
function counter(state=0, action) {
  switch (action.type){
    case '加机关枪':
      return state+1
    case '减机关枪':
      return state-1
    default:
      return 10
  }
}

// 新建保险箱
const store = createStore(counter)

function listener() {
  const current = store.getState()
  console.log(`现有机枪${current}把`)
}

//订阅事件，每次store有状态变化，都会执行listener函数
//实际上会订阅render函数，每次状态改变，重新render组件
store.subscribe(listener)

store.dispatch({type: "加机关枪"})
//store.dispatch会被传递到组件内部，以便可以修改状态
//redux的内容一般单独放在一个文件里面index.redux.js
```
##### redux-thunk
##### 异步任务需要redux-thunk中间件，redux默认只处理同步


```
npm install redux-thunk --save

使用applyMiddleware开启thunk中间件
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
const store = createStore(counter, applyMiddleware(thunk))

action 可以返回函数，使用dispatch提交action
```



##### react-redux
提供Provider 和 connect 两个接口来链接

Provider 组件在应用最外层，传入store即可，只用一次。
connect 负责从外部获取组件需要的参数

#### Introducing JSX


```
const element = <h1>Hello, world!</h1>;
```

This funny tag syntax is neither a string nor HTML. It is called JSX。

##### Embedding Expressions in JSX

You can embed any JavaScript expression in JSX by wrapping it in curly braces.

```
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
###### notice：We split JSX over multiple lines for readability. While it isn’t required, when doing this, we also recommend wrapping it in parentheses() to avoid the pitfalls of automatic semicolon insertion.

##### JSX is an Expression Too
This means that you can use JSX inside of if statements and for loops, assign it to variables, accept it as arguments, and return it from functions:


```
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```
##### Specifying Attributes with JSX

You may use quotes to specify string literals as attributes:


```
const element = <div tabIndex="0"></div>;
```

You may also use curly braces to embed a JavaScript expression in an attribute:


```
const element = <img src={user.avatarUrl}></img>;
```
###### Don’t put quotes around curly braces when embedding a JavaScript expression in an attribute. You should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.

###### Warning:
Since JSX is closer to JavaScript than HTML, React DOM uses camelCase property naming convention instead of HTML attribute names.
For example, **class becomes className** in JSX, and **tabindex becomes tabIndex**.

##### Specifying Children with JSX

If a tag is empty, you may close it immediately with />, like XML:


```
const element = <img src={user.avatarUrl} />;
```
JSX tags may contain children:

```
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```
##### JSX Represents Objects
Babel compiles JSX down to React.createElement() calls.

These two examples are identical:

```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
React.createElement() performs a few checks to help you write bug-free code but essentially it creates an object like this:

```
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```

#### css inside JSX
```
<span style={{marginRight:15,marginTop:10}}>😃</span>

margin-top-->marginTop
15px-->15
```
### Functional and Class Components

The simplest way to define a component is to write a JavaScript function:


```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
You can also use an ES6 class to define a component:

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
#### Rendering a Component
Previously, we only encountered React elements that represent DOM tags:

```
const element = <div />;
```
However, elements can also represent user-defined components:

```
const element = <Welcome name="Sara" />;
```
When React sees an element representing a user-defined component, it passes JSX attributes to this component as a single object. We call this object “props”.

For example, this code renders “Hello, Sara” on the page:


```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
Let’s recap what happens in this example:
1. We call ReactDOM.render() with the <Welcome name="Sara" /> element.
1. React calls the Welcome component with {name: 'Sara'} as the props.
1. Our Welcome component returns a 
```
<h1>Hello, Sara</h1>
```
element as the result.
1. React DOM efficiently updates the DOM to match 
```
<h1>Hello, Sara</h1>.
```
###### ==Caveat==:
Always start component names with a capital letter.
For example, <div /> represents a DOM tag, but <Welcome /> represents a component and requires Welcome to be in scope.

##### Composing Components

For example, we can create an App component that renders Welcome many times:


```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
### Converting a Function to a Class
You can convert a functional component like Clock to a class in five steps:
1. Create an ES6 class, with the same name, that extends React.Component.
1. Add a single empty method to it called render().
1. Move the body of the function into the render() method.
1. Replace props with this.props in the render() body.
1. Delete the remaining empty function declaration.

### State and Lifecycle


```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
Let’s quickly recap what’s going on and the order in which the methods are called:
1. When <Clock /> is passed to ReactDOM.render(), React calls the constructor of the Clock component. Since Clock needs to display the current time, it initializes this.state with an object including the current time. We will later update this state.
1. React then calls the Clock component’s render() method. This is how React learns what should be displayed on the screen. React then updates the DOM to match the Clock’s render output.
1. When the Clock output is inserted in the DOM, React calls the componentDidMount() lifecycle hook. Inside it, the Clock component asks the browser to set up a timer to call the component’s tick() method once a second.
1. Every second the browser calls the tick() method. Inside it, the Clock component schedules a UI update by calling setState() with an object containing the current time. Thanks to the setState() call, React knows the state has changed, and calls render() method again to learn what should be on the screen. This time, this.state.date in the render() method will be different, and so the render output will include the updated time. React updates the DOM accordingly.
1. If the Clock component is ever removed from the DOM, React calls the componentWillUnmount() lifecycle hook so the timer is stopped.

##### Using State Correctly 
Do Not Modify State Directly

For example, this will not re-render a component:

```
// Wrong
this.state.comment = 'Hello';
```
nstead, use setState():

```
// Correct
this.setState({comment: 'Hello'});
```
The only place where you can assign this.state is the constructor.

##### State Updates May Be Asynchronous

React may batch multiple setState() calls into a single update for performance.

Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.

```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
To fix it, use a second form of setState() that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:

```
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
We used an arrow function above, but it also works with regular functions:

```
// Correct
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```
##### State Updates are Merged

When you call setState(), React merges the object you provide into the current state.

For example, your state may contain several independent variables:


```
constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```
Then you can update them independently with separate setState() calls:

```
componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```
The merging is shallow, so this.setState({comments}) leaves this.state.posts intact, but completely replaces this.state.comments.

### Handling Events


```
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

#### Passing Arguments to Event Handlers
#### 事件传参


```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

#### Forms


```
<input type="text" value={this.state.value} onChange={this.handleChange} />
<textarea value={this.state.value} onChange={this.handleChange} />

<select value={this.state.value} onChange={this.handleChange}>
    <option value="grapefruit">Grapefruit</option>
    <option value="lime">Lime</option>
    <option value="coconut">Coconut</option>
    <option value="mango">Mango</option>
</select>

handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```
input textarea select 添加事件都用


```
onChange={this.handleChange}

handleChange(event) {
    this.setState({value: event.target.value});
  }
```

select multiple options in a select tag:
```
<select multiple={true} value={['B', 'C']}>
```

表单的提交事件用

```
onSubmit={this.handleSubmit}

<form onSubmit={this.handleSubmit}>
</form>

handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }
```

### react 使用自定义的环境变量（.env）
```
reference:
https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables

1. create a file called .env in the root of your project

2. write content
REACT_APP_NOT_SECRET_CODE=abcdef

3.use in jsx render function
<input type="hidden" defaultValue={process.env.REACT_APP_NOT_SECRET_CODE} />

注意：变量要以REACT_APP_ 开头，npm start重启后才生效


### 不同环境可以使用不同的 env 文件
Here's the priority of the files for the development build and the production build:
Files on the left have more priority than files on the right:

Dev.: (npm start): .env.development.local, .env.development, .env.local, .env

Prod.: (npm run build): .env.production.local, .env.production, .env.local, .env

Test.: npm test: .env.test.local, .env.test, .env (note .env.local is missing)
```

### Higher-Order Components
```
Concretely, a higher-order component is a function that takes a component and returns a new component.

const EnhancedComponent = higherOrderComponent(WrappedComponent);
```
#### reverse content component example
```
const reverse = (PassedComponent) =>
      ({ children, ...props }) =>
        <PassedComponent {...props}>
          {children.split("").reverse().join("")}
        </PassedComponent>;
const name = (props) => <span>{props.children}</span>
const ReversedName = reverse(name)

class App extends React.Component {


  render() {
    return (
      <div className="App">
        <ReversedName>world</ReversedName>
      </div>
    );
  }
}


```
### react router dom 实现原理
```
H5 提供了一个好用的 history API
使用 window.history.pushState() 使得我们即可以修改 url 也可以不刷新页面，一举两得。

let onClickLogin = () => {
    setUI('Login')
    window.history.pushState(null, '', '/login')
  }
```

### Link 与 a 标签 区别

Link最终会转成 a 标签,react-router 接管了其默认的链接跳转行为(阻止a标签默认事件)，区别于传统的页面跳转

Link 的“跳转”行为只会触发相匹配的 Route 对应的页面内容更新，而不会刷新整个页面,避免了不必要的重渲染

而 a 标签就是普通的超链接了，用于从当前页面跳转到 href 指向的另一个页面（非锚点情况）
