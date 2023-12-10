### 安装依赖
```
// 安装到 package.json 的 dependencies 里面

yarn add <package-name>
npm install <package-name>


// 安装到 package.json 的 devDependencies 里面
yarn add <package-name> --dev

npm install <package-name> --save-dev


//全局安装
npm i -g json

yarn global add json

```

### npm 删除包
```
To remove a dev dependency:
npm uninstall -D package-name or 
npm uninstall --save-dev package-name

npm uninstall jest

To remove a global package:
npm uninstall -g package-name



// will remove jest both in devDependencies or dependencies
yarn remove jest


To remove a global package:
yarn global remove json
```

### yarn 国内加速，修改镜像源


### 使用第三方软件快速修改、切换 yarn 镜像源
```
npm install -g yrm
```


### config
```
yarn config set python /usr/bin/python2
```

### 列出当前可用的所有镜像源
```
yrm ls
```

### 使用淘宝镜像源
```
yrm use taobao
```

### 测试访问速度
```
yrm test taobao
```


### 如何修改第三方包，以满足自己的业务需求
```
比如 这两个包有些问题需要修改
@react-pdf-view/search
@react-pdf-viewer/locales


第一步：
直接在node_module 源文件中修改

第二步：执行下面命令，生成patches 包
npx patch-package @react-pdf-view/search
npx patch-package @react-pdf-viewer/locales

//执行这一步后，会在项目根目录下生成 patches 文件夹，里面记录了你的改动，这个文件夹可以提交到代码仓库里面

第三步:
在package.json 里面新增如下命令，每次安装依赖后会自动安装patch-package

"postinstall": "npx patch-package" 
```


### yarn或者npm install 出现问题 getaddrinfo ENOENT raw.githubusercontent.com
#### 问题原因

是由于Github的raw文件读取地址raw.githubusercontent.com遭受DNS污染

#### 解决方式
```
1. 修改HOSTS文件
查出raw.githubusercontent.com的真实IP，进入这个网址：https://www.ipaddress.com/

hosts文件中添加
199.232.68.133(查出来的ip地址) raw.githubusercontent.com


2. 修改电脑 DNS 配置
使用Google DNS 服务
8.8.8.8
8.8.4.4
```