---
title: ""
metaTitle: ""
metaDescription: ""
---

## webpack
webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.  


## Webpack Four Core Concepts: 
- entry
- output
- loaders
- plugins



### plugins
html-webpack-plugin （自动生成HTML插件）

clean-webpack-plugin （自动清空某个目录的文件）

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Output Management!',
			template: 'index.html',  //模板文件
			filename: 'c.html',//生成的html文件
			inject: false |‘head’,//js在html文件的head标签里面
			chunks: ['main', 'c'], //对应的entry 里面定义的chunks
			minify: {
				removeComments: true,//remove comments
				collapseWhitespace: true //minify html,remove whitespace
			}
		})
	]
};
```



## Babel
### Babel is a JavaScript compiler
Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.  

JS loader (将es6转变为普通js)

```
npm install --save-dev babel-loader babel-core
npm install babel-preset-env --save-dev
```

### 配置文件
通常在项目跟目录下，名称一般为 .babelrc

### bebel preset
Babel presets can act as sharable set of Babel plugins and/or config options.

#### Official Presets
```
@babel/preset-env for compiling ES2015+ syntax
@babel/preset-typescript for TypeScript
@babel/preset-react for React
@babel/preset-flow for Flow
```

#### Using a Preset
```
{
  "presets": ["babel-preset-myPreset", "@babel/preset-env"]
}
```
#### Preset Ordering
Preset ordering is reversed (last to first).
```
{
  "presets": ["a", "b", "c"]
}
```
Will run in the following order: c, b, then a.

#### Preset Options
Both plugins and presets can have options specified by wrapping the name and an options object in an array inside your config.
```
{
  "presets": [
    "presetA", // bare string
    ["presetA"], // wrapped in array
    ["presetA", {}] // 2nd argument is an empty options object
		[
      "@babel/preset-env",
      {
        "loose": true,
        "modules": false
      }
    ]
  ]
}
```


### nextjs 配置 babel
例如要加 styled-components 插件的 server-side rendering 支持
https://styled-components.com/docs/tooling#babel-plugin  
注意：因为是nextjs 项目 要先定义好 "presets": ["next/babel"],
```
{
  "presets": ["next/babel"],
  "plugins": ["babel-plugin-styled-components"]
}
```

config

```
rules: [
		{ 
			test: /\.js$/,
			//如果有react文件 test: /(\.jsx|\.js)$/,
			exclude: path.resolve(__dirname, 'node_modules'), 
			include: path.resolve(__dirname, 'src'),
			loader: "babel-loader" 
		},
	]
```
新建 .babelrc 文件 （指定要转换的js版本）

```
{
  "presets": ["env"]
  //如果有react文件 "presets": ["react", "env"]
}
```

### css


```
npm install --save-dev style-loader css-loader
npm install --save-dev postcss-loader autoprefixer
```
配置

```
{
	test: /\.css$/,
	use: [
        {
            loader: 'style-loader',
        },
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,//让css里面的@import 的文件也经过postcss 的处理
            }
        },
        {
            loader: 'postcss-loader'
        }
    ]
},
```
新建postcss.config.js 文件


```
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```
