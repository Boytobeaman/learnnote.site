---
title: "umi js, dva 教程"
metaTitle: "umi js, dva 教程，umi 笔记，umi 面试问题"
metaDescription: "umi js, dva 教程，umi 笔记，umi 面试问题"
---

## umi 笔记

#### dva model effects异步中通过select获取当前的state
```
* getThirdIOTAuth(action, { put, select }) {

    let thirdIOTAuthData = yield select(state => state.IOTDataModel.thirdIOTAuthData)
    //IOTDataModel 为此 model 的命名空间（namespace）的名称

})

```