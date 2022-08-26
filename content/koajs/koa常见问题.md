---
title: "KOA 常见问题"
metaTitle: "KOA 常见问题"
metaDescription: "KOA 常见问题"
---

## 常见的前端传参和后端接受的形式

### ctx.params
```
ctx.params

eg:
const { id } = ctx.params;


Path parameters 路径参数
前端请求：
http://localhost:8100/users/123

后端接受和路由：
users.js

router.get('/:id', function (ctx, next) {
  const { id } = ctx.params;
  ctx.body = 'this is a users response!'
})

```

### ctx.request.query 或者 ctx.query
```
Query string parameters

前端请求：
http://localhost:8100/users/123?name=jim&age=18


后端接收
ctx.request.query 或者 ctx.query
//{name: 'jim', age: '18'}

```
### ctx.request.body
```
Request bodies
前端请求：
POST 方法
前端请求的body传
{
	"name":"xiaoming",
	"age":13
}

后端接收：
const {name, age} = ctx.request.body;
```

