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

### UMI 中的环境变量配置
```
参考链接：
https://umijs.org/zh-CN/docs/config#%E5%A4%9A%E7%8E%AF%E5%A2%83%E5%A4%9A%E4%BB%BD%E9%85%8D%E7%BD%AE


在yarn start 命令下（umi dev）生效
.umirc.local.ts 或者 config/config.local.ts


在yarn build 命令下（umi build）生效
.umirc.ts 或者 config/config.ts

注意:
// .umirc.local.ts is only available with umi dev. It won't work with umi build

配置变量案例

// .umirc.ts 文件 配置 APP_VARIABLE 变量
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: ['pdfjs-dist']
  },
  layout: {},
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/raw-adobe', component: '@/pages/raw-adobe.js' },
  ],
  fastRefresh: {},
  define: {
    APP_VARIABLE: "my production",
  },
});



// .umirc.local.ts 文件 配置 APP_VARIABLE 变量
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    APP_VARIABLE: "my development",
  }
});



项目中使用
import React from 'react';

function MyApp() {

    console.log(`APP_VARIABLE ===== ${APP_VARIABLE}`)

    return (
        <div>test</div>
    )
}


如果使用 yarn start 命令（开发环境）
APP_VARIABLE 为 my development


如果使用 yarn build 命令打包项目，部署打包后的项目
APP_VARIABLE 为 my production
```
