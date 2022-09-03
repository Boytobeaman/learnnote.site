---
title: "react mobx"
metaTitle: "react mobx, react vs mobx"
metaDescription: "react mobx, react vs mobx"
---

#### redux

#### redux vs mobx

Mobx的实现思想和Vue几乎一样


都是为了解决react 项目中的数据管理问题

redux 只有一个store, 而mobx 有多个store

MobX使用一个观察对象来存储，而Redux使用普通的Javascript数据来存储值。


#### mobx
observable 
decorate


#### observer
observer turns React (function) components into derivations of the data they render.
```
const TodoView = observer(({ todo }) => (
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => (todo.finished = !todo.finished)}
        />
        {todo.title}
    </li>
))
```


Computed values


Reactions
(produces a side effect)


### redux
##### Redux is a predictable state container for JavaScript apps


### Actions
Actions are payloads of information that send data from your application to your store.

You send them to the store using store.dispatch().

Here's an example action which represents adding a new todo item:
```
const ADD_TODO = 'ADD_TODO'

{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```
Actions are plain JavaScript objects. Actions must have a type property that indicates the type of action being performed.

### Action Creators
Action creators are exactly that—functions that create actions.

In Redux, action creators simply return an action:
```
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

### Reducers
Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.

```
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}
```
All combineReducers() does is generate a function that calls your reducers with the slices of state selected according to their keys

```
import { combineReducers } from 'redux'
​
const todoApp = combineReducers({
  visibilityFilter,
  todos
})
​
export default todoApp
```
### Store

**actions** : represent the facts about “what happened” 

**reducers** :update the state according to those actions.

The Store is the object that brings them together.

- Holds application state;
- Allows access to state via getState();
- Allows state to be updated via dispatch(action);
- Registers listeners via subscribe(listener);
- Handles unregistering of listeners via the function returned by subscribe(listener).


#### It's important to note that you'll only have a single store in a Redux application.

### create a store
```
import { createStore } from 'redux'
import todoApp from './reducers'
const store = createStore(todoApp)
```
You may optionally specify the initial state as the second argument to createStore(). This is useful for hydrating the state of the client to match the state of a Redux application running on the server.
```
const store = createStore(todoApp, window.STATE_FROM_SERVER)
```
### Dispatching Actions

```
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './actions'
​
// Log the initial state
console.log(store.getState())
​
// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
​
// Dispatch some actions
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))
​
// Stop listening to state updates
unsubscribe()
```

### Usage with React
```
npm install --save react-redux



import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'
​
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
​
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}
​
const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
​
export default FilterLink
```

### Passing the Store
The option we recommend is to use a special React Redux component called Provider
```
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'
​
const store = createStore(todoApp)
​
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```


### why we need redux-thunk

Redux Thunk middleware allows you to write action creators that return a function instead of an action.

### the role of react-redux
Official React bindings for Redux

The process of subscribing to the store, checking for updated data, and triggering a re-render can be made more generic and reusable. A UI binding library like React Redux handles the store interaction logic, so you don't have to write that code yourself.