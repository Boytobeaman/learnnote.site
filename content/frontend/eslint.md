---
title: "ESLint"
metaTitle: "ESLint"
metaDescription: "ESLint,  helps you find and fix problems with your JavaScript code"
---


### install link
https://eslint.org/docs/latest/user-guide/getting-started#installation-and-usage

#### quick install step

```
//assumes you have a package.json file already. 已经项目初始化了
npm init @eslint/config


按照上面命令的引导步骤会生成 .eslintrc.js

```

### .eslintrc.js 结构
```
module.exports = {
  "env": {
      "browser": true,
      "es2021": true,
      "node": true,
      "es6": true,
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
  }
}



// 注意
env 中 browser 表示浏览器端，node表示commonjs 语法

React 项目 要在 extends里面加上 "plugin:react/jsx-runtime"
```


### .eslintignore
```

// prevent linting on tests
src/*.test.js
```

### vscode
一般要在vscode 里面安装 ESLint 插件

### 几大相关插件的区别

ESLint ✔️: Checks for certain code patterns to stop errors or potential bugs.  
Lint-Staged 🔧: Lints code before a commit occurs to keep production code clean.  
Prettier ✨: Keeps code formatting consistent based on our own preferences.