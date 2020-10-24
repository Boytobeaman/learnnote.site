### example
```
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(9800);
```
### express vs koa
```
1. express 中间件是异步回调，koa2 原生支持 async/await
```

### Introduction
```
Koa is a new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs. 
```

### Context
A Koa Context encapsulates node's request and response objects into a single object which provides many helpful methods for writing web applications and APIs. 
```
app.use(async ctx => {
  ctx; // is the Context
  ctx.request; // is a Koa Request
  ctx.response; // is a Koa Response
});
```

#### ctx.req
```
Node's request object.
```

#### ctx.res
```
Node's response object.

Bypassing Koa's response handling is not supported. Avoid using the following node properties:
res.statusCode
res.writeHead()
res.write()
res.end()
```

#### ctx.request
```
A Koa Request object.

ctx.request.url = ctx.url

// '/hello/:name'
ctx.params.name

// ?user=jim&age=18
ctx.request.query = ctx.query   
//==> obj {age:"18"user:"jim"}

ctx.request.querystring = ctx.querystring
//===> str "user=jim&age=18"
```
#### ctx.response
```
A Koa Response object.


ctx.response.type = ctx.type
```
#### ctx.state
```
The recommended namespace for passing information through middleware and to your frontend views.

ctx.state.user = await User.find(id);
```


### koa middleware
```
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});
```
middleware的顺序很重要，也就是调用app.use()的顺序决定了middleware的顺序。

如果一个middleware没有调用await next()，会怎么办？答案是后续的middleware将不再执行了。这种情况也很常见，例如，一个检测用户权限的middleware可以决定是否继续处理请求，还是直接返回403错误：
```
app.use(async (ctx, next) =>{
  if(await checkUserPermission(ctx)){
    await next();
  } else{
    ctx.responst.status = 403
  }
})
```
#### example 中间件开发
一个打印日志的中间件
```
// ./middleware/logger-async.js

function log(ctx){
    console.log(ctx.method, ctx.header.host + ctx.url)
}

module.exports = function(){
    return async function(ctx, next){
        log(ctx);
        await next()
    }
}
```
usage 
```
const Koa = require('koa');  // koa v2
const loggerAsync = require('./middleware/logger-async');
const app = new Koa();

app.use(loggerAsync());

app.use((ctx) => {
  ctx.body = 'hello world!';
});
```

### koa2使用cookie
koa提供了从上下文直接读取，写入cookie的方法
```
ctx.cookies.get(name, [options])读取上下文请求中的cookie
ctx,cookies.set(name, value, [options])在上下文中写入cookie

koa2中操作的cookies是使用了npm的cookies模块，源码在：https://github.com/pillarjs/cookies，所以在读写cookie的使用参数与该模块的使用一致。
```
code example
```
const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) => {
  if(ctx.url === '/index') {
    ctx.cookies.set(
      'cid',
      'hello world',
      {
        domian: 'localhost',  //  写cookie所在的域名
        path: '/index', //  写cookie所在的路径
        maxAge: 10*60*1000, //  cookie有效时长
        expires: new Date('2017-02-15'),  //  cookie失效时间
        httpOnly: false,  //  是否只用于http请求获取
        overwrite: false  //  是否允许重写
      }
    )
    ctx.body = 'cookie is ok';
  } else {
    ctx.body = 'hello world';
  }
});


app.listen(3000, () => {
  console.log('[demo] cookie is starting at port 3000');
});
```

### koa-router
```
const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
```

### 处理post请求
```
router.post('/path', async fn)

用post请求处理URL时，我们会遇到一个问题：post请求通常会发送一个表单，或者JSON，它作为request的body发送，但无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！

所以，我们又需要引入另一个middleware来解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中。

koa-bodyparser 就是用来干这个活的。


app.use(bodyParser());
由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。

```