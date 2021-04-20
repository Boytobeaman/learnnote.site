### 什么是 react fast refresh

Fast Refresh is a feature that lets you edit React components in a running application without losing their state. 


### Create React App 与 React Fast Refresh
Starting from 4.x, Create React App enables React Fast Refresh by default. If your project is built off of Create React App, all you need to do is upgrade.

Dependency | Minimum | Best
------------ |------------ | -------------
react |	16.10.0 |	16.13.0+
react-dom |	16.10.0 |	16.13.0+
react-reconciler |	0.22.0 |	0.25.0+
webpack |	4.0.0 (for 0.3.x), 4.43.0 (for 0.4.x+)	 | 4.43.0+


### Custom Webpack
安装依赖
```
yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh
```
参考配置
https://github.com/pmmmwh/react-refresh-webpack-plugin 


### Limitations 限制

React Fast Refresh’s state preservation does not work for class components (包括高阶组件返回的 Class 组件) — it only works with function components and hooks.


### trick 技巧
推荐写函数命名组件，例如
#### Good:
```
const Foo = () => {};

export default Foo;
```

#### Bad:
```
export default () => {};
```