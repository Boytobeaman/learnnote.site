### yarn 国内加速，修改镜像源


### 使用第三方软件快速修改、切换 yarn 镜像源
```
npm install -g yrm
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