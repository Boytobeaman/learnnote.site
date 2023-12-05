---
title: ""
metaTitle: ""
metaDescription: ""
---

## webpack
webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.  

## What is Webpack?
Webpack is a powerful module bundler for JavaScript applications. It takes modules with dependencies and generates static assets that can be served to a browser. It simplifies the process of managing and bundling various assets like JavaScript, CSS, and images, enabling efficient resource utilization and enhancing application performance.


## Webpack Four Core Concepts: 
- entry
- output
- loaders
- plugins


##  What are the key features of Webpack?
Webpack offers several key features that make it a popular choice among developers:

- Module bundling: Webpack allows you to bundle all the dependencies, including JavaScript, CSS, and other assets, into a single file or a few optimized files.
- Code splitting: It supports code splitting, which allows you to split your code into smaller chunks and load them asynchronously when needed, reducing initial loading times.
- Loaders: Webpack provides loaders to preprocess and transform different types of files, such as CSS, SCSS, TypeScript, and more, allowing you to incorporate them into your project seamlessly.
- Plugins: Plugins enhance the functionality of Webpack by providing additional optimization, code generation, and asset management capabilities.


## How does Webpack handle dependencies?
Webpack uses a dependency graph to manage dependencies. It starts with an entry point and recursively follows the dependencies of the modules to build a complete graph. Each module is treated as a separate entity and can have its own dependencies. Webpack analyzes the graph and bundles all the dependencies into one or more output files.

## What is a loader in Webpack?
Loaders in Webpack are transformations applied to source files as they are added to the dependency graph. They allow you to preprocess files before they are bundled. For example, you can use loaders to transpile TypeScript to JavaScript, convert SCSS to CSS, or optimize and compress images. Loaders are configured in the Webpack configuration file and specified using rules.


## Explain the concept of code splitting in Webpack.
Code splitting is a technique used in Webpack to split the code into smaller chunks that can be loaded on-demand. It helps reduce the initial loading time of an application by loading only the essential code required for the initial view and loading additional code as needed. Webpack achieves code splitting through dynamic imports or by configuring entry points for specific chunks.

## How can you optimize the size of Webpack bundles?
- Minification: Webpack offers plugins like UglifyJSPlugin or TerserPlugin to minify and compress the bundled code, reducing its size.
- Tree shaking: Tree shaking is a process in which Webpack eliminates dead code that is not used in the application, resulting in smaller bundle sizes.
- Code splitting: By splitting code into smaller chunks and loading them on-demand, you can reduce the initial bundle size and improve performance.
- Using dynamic imports: Utilizing dynamic imports allows you to load modules asynchronously when needed, reducing the initial loading time.


## What is the purpose of the Webpack Dev Server?
The Webpack Dev Server is a development server that provides an easy way to test and debug applications during development. It offers features like hot module replacement (HMR), which allows you to see changes instantly without refreshing the entire page. The dev server also provides an optimized build process for faster development iterations.

## How can you configure Webpack?
Webpack can be configured using a JavaScript configuration file (webpack.config.js). In this file, you define various settings such as entry points, output paths, loaders, plugins, and optimization options. Webpack provides a flexible configuration system that allows you to customize the bundling process according to your project's specific requirements.

## What are the differences between Webpack 4 and Webpack 5?

Webpack 5 introduced several notable features and improvements over Webpack 4, including:

- Improved build speed: Webpack 5 offers enhanced build performance with faster compilation times and improved caching mechanisms.
- Module federation: Webpack 5 introduced module federation, allowing you to share modules across multiple applications without the need for a monolithic bundle.
- Asset modules: Asset modules simplify the handling of various assets like images, fonts, and media files, making it easier to manage and optimize them.




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

### Babel 竞争者 SWC-Speedy Web Compiler
通过 rust 实现的 bable,速度快，但兼容性及生态比Babel 差

### 项目启动时，加载 node_modules 下某个js 因为js语法报错
通常 webpack 在构建时，是不会让 node_modules 下的文件走 babel tranpile 的，如果让 node_modules 下的文件也都走 babel tranpile会慢很多, 所以业界有个潜在的约定，npm 包发布前需要先用 babel 转出一份 es5 的代码。

但是有些 npm 包不遵守这个约定，没有转成 es5 就发上去，但有些包只支持 es5 的语法，遇到 const、let、()=> 类似的语法，就抛错了。

umi3 配置node_module 下的 pdfjs-dist 文件走babel tranpile
```
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: ['pdfjs-dist']
  }
});
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



### 构建工具