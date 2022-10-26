---
title: "umi js, dva 教程"
metaTitle: "umi js, dva 教程，umi 笔记，umi 面试问题"
metaDescription: "umi js, dva 教程，umi 笔记，umi 面试问题"
---

## umi 笔记



### umi4
umi 4 中提供了hook方式 获取dva 中的数据和dispatch
```
import { useDispatch, useSelector } from 'umi';


const TeacherPage: React.FC = () => {

  const dispatch = useDispatch();
  const storeState = useSelector((s) => s);

  // 整个store 中会有 loading 对象，它会记录dva 中 effects 的状态，比如是否正在发送请求，可以用此来控制前端的loading状态
  const { loading } = storeState;
  const loadingQueryTeacherList = loading?.effects?.["teacher/queryTeacherList"];


  const getTeacherList = () => {
    // 可以直接用hook 方式获取的dispatch， 触发dva 中的 effects
    dispatch({ type: 'teacher/queryTeacherList', payload: { ...pagination } });
  };

  useEffect(() => {
    getTeacherList();
  }, [pagination]);

  return (
    <div></div>
  )
}
```

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


### UMI 中的 .env 文件
Umi 中约定根目录下的 .env 为环境变量配置文件，即约定式配置文件，里面可以配置的内容已经由umi 约定好了，不可以添加自定义的变量
```
### 以 3000 端口启动 dev server
PORT=3000

### localhost 开启 https
HTTPS=1 umi dev

```

### 如果多种环境配置，比如 dev, uat, sit, prod

#### 安装cross-env 兼容windows 及 mac
#### package.json 配置
```
"scripts": {
    "start": "cross-env UMI_ENV=dev umi dev",
    "uat": "cross-env UMI_ENV=uat umi build",
    "sit": "cross-env UMI_ENV=sit umi build",
    "build": "cross-env UMI_ENV=prod umi build",
},
```

创建对应的配置文件
.umirc.dev.ts
```
export default {
  define: {
    'process.env.UMI_ENV': 'dev',
  }
}
```

.umirc.uat.ts
```
export default {
  define: {
    'process.env.UMI_ENV': 'uat',
  }
}
```

.umirc.sit.ts
```
export default {
  define: {
    'process.env.UMI_ENV': 'sit',
  }
}
```

.umirc.prod.ts
```
export default {
  define: {
    'process.env.UMI_ENV': 'prod',
  }
}
```

项目中，直接使用process.env.UMI_ENV变量，即可获取当前处于哪个环境
```
console.log(process.env.UMI_ENV);
```



### 为什么 dva effects 里面的路由跳转要用 yield put
```
import { routerRedux } from 'dva/router';


yield put(routerRedux.push('/login'));

直接使用 routerRedux.push('/login') 为何不行？
```