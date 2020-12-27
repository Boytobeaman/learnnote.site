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