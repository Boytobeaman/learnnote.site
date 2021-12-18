---
title: "前端应用缓存问题"
metaTitle: "前端应用缓存问题，react 发版后缓存问题"
metaDescription: "前端应用缓存问题，react 发版后缓存问题，如何保证前端页面及时获取最新版本"
---

### 对于如react,vue 这样的单页应用，打包后会生成一个index.html 文件，以及这个文件引用的各种css与js文件


#### 一般这样解决
前端每次发版时，对于的css与js 文件，都加上不同的hash 值，这样不同版本文件不同就不会有缓存问题。

#### Umi js 3 设置
```
在 .umirc.ts 里面加上配置

{
  hash: true
}


最后打包及引用的css与js 都加上hash 如：
umi.024c384e.css
umi.5f2c9e3c.js
```

但是还有一个问题，如何保证 index.html 也及时更新掉，因为即使每次打包后，服务端html、 css与js 都更新了，但是前端浏览器里面可能还是缓存的上一个版本的 index.html 文件，它里面引用的依然是老的版本的css与js 文件，这样如果重新发请求到服务端请求老版本的 css 与js 就会拿不到东西，就会出问题。

可以在前端页面head里面加上
```
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```
让 index.html 页面不缓存，每次主动刷新页面，重新获取服务端的最新文件，保证了html是最新的就保证了对应的 css和js 会引用最新版本的

#### 用户不点击浏览器刷新图标，如何让其比较自然地获取最新的页面？
可以在登录或者退出应用时，用 window.location.href = `/a` 来实现路由跳转，这样跳转会重新向后端获取最新的html，避免缓存，不要使用react router 实现的路由跳转