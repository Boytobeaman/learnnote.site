---
title: "http"
metaTitle: "http 教程，http 笔记，http 面试问题"
metaDescription: "http 教程，http 笔记，http 面试问题"
---

http 常用状态码



HTTP状态码分类
分类 | 分类描述
------------ | -------------
1** | 信息，服务器收到请求，需要请求者继续执行操作
2** | 成功，操作被成功接收并处理
3** | 重定向，需要进一步的操作以完成请求
4** | 客户端错误，请求包含语法错误或无法完成请求
5** | 服务器错误，服务器在处理请求的过程中发生了错误




状态码 | 含义
------------ | -------------
200 | 成功/ok
301 | moved permanently （永久重定向）
302 | Found 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI
304 | Not Modified 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源
307 | 临时重定向。与302类似。使用GET请求重定向
400 | Bad Request （客户端请求的语法错误，服务器无法理解）
401 | unauthorized （请求要求用户的身份认证，比如没有传jwt 或者jwt 失效）
403 | forbidden （访问被禁止，比如某些接口没有对特定的用户开放）
404 | not found （访问的资源不存在）
500 | internal server error
503 | service unavailable

