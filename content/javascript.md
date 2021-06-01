---
title: "JavaScript"
metaTitle: "javascript 教程，javascript 笔记，javascript 面试问题"
metaDescription: "javascript 教程，javascript 笔记，javascript 面试问题"
---

javascript 笔记


### js的模块化

#### CJS，CommonJS

只能在 NodeJS 上运行，使用 require("module") 读取并加载模块。

缺点：不支持浏览器，执行后才能拿到依赖信息，由于用户可以动态 require（例如 react 根据开发和生产环境导出不同代码 的写法），无法做到提前分析依赖以及 Tree-Shaking 。

#### AMD，Asynchronous Module Definition

可以看作 CJS 的异步版本，制定了一套规则使模块可以被异步 require 进来并在回调函数里继续使用，然后 require.js 等前端库也可以利用这个规则加载代码了，目前已经是时代的眼泪了。

#### UMD，Universal Module Definition
```
同时兼容 CJS 和 AMD，并且支持直接在前端用 <script src="lib.umd.js"></script> 的方式加载。现在还在广泛使用，不过可以想象 ESM 和 IIFE 逐渐代替它。
```
##### 代码案例
```
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    //    方法
    function myFunc(){};

    //    暴露公共方法
    return myFunc;
}));

```

#### IIFE,Immediately Invoked Function Expression
只是一种写法，可以隐藏一些局部变量，前端人要是不懂这个可能学的是假前端。可以用来代替 UMD 作为纯粹给前端使用的写法

#### ESM, ECMAScript Module
```
现在使用的模块方案，使用 import export 来管理依赖。由于它们只能写在所有表达式外面，所以打包器可以轻易做到分析依赖以及 Tree-Shaking。当然他也支持动态加载（import()）

浏览器直接通过 <script type="module"> 即可使用该写法。NodeJS 可以通过使用 mjs 后缀或者在 package.json 添加 "type": "module" 来使用，注意他还有一些 实验性的功能 没有正式开启。考虑到大量 cjs 库没有支持，如果要发布 esm 版的库还是通过 rollup 打包一下比较好（同时相关依赖可以放到 devDependencies 里）。
```

### Summary
1. ESM is the best module format thanks to its simple syntax, async nature, and tree-shakeability.
1. UMD works everywhere and usually used as a fallback in case ESM does not work
1. CJS is synchronous and good for back end.
1. AMD is asynchronous and good for front end.



### ES6 模块特性 与 CommonJS 的区别
ES6 模块输出的是值的引用，输出接口动态绑定，而 CommonJS 输出的是值的拷贝


CommonJS 输出值的拷贝
```
// a.js
var b = require('./b');
console.log(b.foo);
setTimeout(() => {
  console.log(b.foo);
  console.log(require('./b').foo);
}, 1000);

// b.js
let foo = 1;
setTimeout(() => {
  foo = 2;
}, 500);
module.exports = {
  foo: foo,
};
// 执行：node a.js
// 执行结果：
// 1
// 1
// 1
```


### ES6 输出值的引用
```
// a.js
import { foo } from './b';
console.log(foo);
setTimeout(() => {
  console.log(foo);
  import('./b').then(({ foo }) => {
    console.log(foo);
  });
}, 1000);

// b.js
export let foo = 1;
setTimeout(() => {
  foo = 2;
}, 500);
// 执行：babel-node a.js
// 执行结果：
// 1
// 2
// 2
```

### 如何写一个js 库（ module ）？
其实很简单，要看你需要支持哪些平台：

#### 只支持 NodeJS 的 require 写法
```
package.json："main": "index.js"，

其中 index.js 使用 cjs 写法（module.exports = xxx;）
```

#### 只支持 NodeJS 的 import 写法
```
package.json："main": "index.mjs" 或 "type": "module", "main": "index.js"

其中 index.mjs 或 index.js 使用 esm 写法（export default xxx）
```

#### 同时支持 NodeJS 的 require 和 import 写法
```
利用 条件 export，直接看文档里面有例子。
```



### nodejs 环境如何运行 es6 代码
```

1. 安装依赖（babel 7.x 以后的写法）
$ npm i -g @babel/core @babel/node



2. 安装 presets 并配置 .babelrc 文件
npm i @babel/preset-env --save-dev

.babelrc 文件配置内容：
{
  "presets": ["@babel/preset-env"]
}

3. 执行 babel-node
通过 babel-node 即可执行含有 import/export 等 es6 语法的 js 文件
babel-node test.js
```