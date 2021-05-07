---
title: "package.json 版本说明"
metaTitle: "package.json 里模块版本说明"
metaDescription: "package.json 里模块版本说明， 如何指定package.json 里面的模块版本号"
---

### Using semantic versioning to specify update types your package can accept

![node package.json version](/images/frontend/wheelbarrel-with-tilde-caret-white-bg-w1000.jpg "node package.json version")


版本格式 | 说明
------------ | -------------
~version | Approximately equivalent to version，update you to all future patch versions, without incrementing the minor version.~1.2.3 will use releases from 1.2.3 to 小于1.3.0.
^version | Compatible with version, will update you to all future minor/patch versions, without incrementing the major version. ^2.3.4 will use releases from 2.3.4 to 小于3.0.0.
latest | Obtains latest release
1.2.x | 1.2.0, 1.2.1, etc., but not 1.3.0


### dependency vs devDependencies
#### dependency 会被打包到生产环境中
```
npm install <package...>

yarn add react

```
#### devDependencies 只在开发阶段使用，不会打包到生产环境
```
npm install some_module --save-dev

yarn add <package...> [--dev/-D]
```

### 全局安装
```
npm install <package...> -g

yarn global add <package...>
```