---
title: "css 常见问题"
metaTitle: "css 常见问题"
metaDescription: "css 常见问题，css 面试问题"
---


### CSS盒模型


#### 盒子模型
```
盒子模型包括：content、padding、margin、border
```

### 标准模型和IE模型的区别
```
标准模型的宽高为content的宽高
IE模型的宽高包括border

标准模型：box-sizing：content-box
IE模型：box-sizing：border-box
```
### JS如何设置/获取盒模型对应的宽高
```
dom.style.width/height：内联样式的宽高
dom.currentStyle.width/height：渲染后的最终宽高（IE）
window.getComputedStyle(dom).width/height：DOM标准，不支持IE
dom.getBoundingClientRect().width/height：计算元素的绝对位置（视窗左顶点为起点，含left/right/height/width）
```

### BFC (Block formatting context)是什么，讲一下原理
```
块级格式化上下文

BFC是Web页面 CSS 视觉渲染的一部分，用于决定块盒子的布局及浮动相互影响范围的一个区域。

```

### 三种文档流

#### 常规流(Normal flow)
当position为 static 或 relative，并且float为none时会触发常规流；



### 脱离文档流
文档一旦脱离文档流，在算其父元素的高度时，就不包括其自身了。  
脱离文档流的方法：
```
1. 浮动 float:left; 2. position: absolute; 3. position:fixed
```
#### 浮动(Floats)

#### 绝对定位(Absolute positioning)

### BFC布局规则是？
```
内部的Box会在垂直方向，一个接一个地放置。
Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
BFC的区域不会与float box重叠 (Exclude external floats/清除外部浮动，比如两列布局，左侧一个float box，右侧一个BFC box)。
BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
计算BFC的高度时，浮动元素也参与计算 (Make float content and alongside content the same height)
```

### 哪些元素会生成BFC?
```
float不为none
position不为static/relative
display的值为inline-block、table-cell、table-caption
overflow的值不为visible
根元素
```

### 如何水平居中

#### 在css中使用text-align和display属性
```

比如 如果是 水平居中 块级元素下的行内元素，在块级元素上加 text-align: center;

eg：居中 content
<div className="bg-danger text-center">content</div>


eg: 居中 className="bg-success"的div，需要把他设置为display:"inline-block" 或者 display:"inline"，否则它会占满整行
注意： 设置成inline了就没法设置 它的宽高了
<div className="bg-danger text-center">
  <div className="bg-success" style={{display:"inline-block"}}>
    content
  </div>
</div>

```

#### 在CSS中使用display和margin属性
```
<style>
  .parent{
    background: gray;
  }
  .child{
    width: 200px;
    height: 200px;
    background: indigo;
    display: table; //这里可以不用设置display属性,设置display属性时不能设置为inline属性值，否则居中同样会失效
    margin: 0 auto;
  }
</style>


<!-- 父级标签 -->
<div class="parent">
    <!-- 子级标签-->
    <div class="child"></div>
</div>

```
#### 在CSS中使用position和transform属性
```
<style>
  .parent{
      width: 500px;
      height: 200px;
      position: relative;
      background: #000;
  }
  .child{
      background: green;
      width: 200px;
      height: 200px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
  }
</style>

<!-- 父级标签 -->
<div class="parent">
    <!-- 子级标签 -->
    <div class="child"></div>
</div>
```

#### 使用 flex 布局
```
<div class="parent" style={{
  width: "500px",
  height: "200px",
  display: "flex",
  justifyContent: "center",
  background: "grey",
}}>
    <div class="child" style={{
      background: "green",
      width: "200px",
      height: "200px",
    }}
    ></div>
</div>

```

### 垂直居中
```
html
<div id="box">
    <div id="child">test</div>
</div>

css
#box{
    width:300px;
    height:300px;
    background: #ddd;
    position: relative;
}

#child {
    width: 150px;
    height: 100px;
    background: orange;
    position: absolute;
    top: 50%;
    margin: -50px 0 0 0;
}

使用绝对定位 和 transform
#box {
    width: 300px;
    height: 300px;
    background: #ddd;
    position: relative;
}
#child {
    background: orange;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
}


使用flex布局

<div id="box">test vertical align</div>

#box {
    width: 300px;
    height: 300px;
    background: #ddd;
    display: flex;
    align-items: center;
}
```

### css 加载顺序
```
2.相同类型选择器制定的样式，在样式表文件中，越靠后的优先级越高

这里是样式表文件中越靠后的优先级越高，而不是在元素class出现的顺序

    <style>
        .black{
            color: black;
        }
        .red{
            color: red;
        }
    </style>
    <div class="red black">
        hello
    </div>
    // 显示为red
```

### css 选择器

#### Combinator selectors (select elements based on a specific relationship between them)

There are four different combinators in CSS:
```
descendant selector (space)
child selector (>)
adjacent sibling selector (+)
general sibling selector (~)
```

##### descendant selector(子孙选择器) (space)
```
//The following example selects all <p> elements inside <div> elements: 
div p {
  background-color: yellow;
}

```

##### Child Selector (子元素选择器) (>)
```
// The following example selects all <p> elements that are children of a <div> element:
// 和子孙选择器不同的是，子选择器选择的是div 的直接子元素，深层嵌套的不会被选择
div > p {
  background-color: yellow;
}
```

##### Adjacent Sibling Selector (+)
```html
// Sibling elements must have the same parent element, and "adjacent" means "immediately following".

// The following example selects all <p> elements that are placed immediately after <div> elements:
// 有（相同父元素的）在（其后面的）第一个兄弟元素
div + p {
  background-color: yellow;
}

// html
<body>

<div>
  <p>Paragraph 1 in the div.</p>
  <p>Paragraph 2 in the div.</p>
</div>

<p>Paragraph 3. Not in a div. (this will be selected)</p>
<p>Paragraph 4. Not in a div.</p>

</body>
```


##### General Sibling Selector (~)
```html
// The general sibling selector selects all elements that are siblings of a specified element.

// The following example selects all <p> elements that are siblings of <div> elements: 


div ~ p {
  background-color: yellow;
}


// html
<body>

<p>Paragraph 1.</p>

<div>
  <p>Paragraph 2.</p>
</div>

<p>Paragraph 3.</p>
<code>Some code.</code>
<p>Paragraph 4.</p>

</body>

// 3 和 4 将会被选， 但是 1 不会被选, 只能选择 其（div）后的 兄弟元素（p元素）
```


#### 属性选择器
```

[attribute]
//Style all <a> elements with a target attribute
a[target]


[attribute=value]
// Selects all elements with target="_blank"
[target=_blank]

[attribute~=value]
// Selects all elements with a title attribute containing the word "flower"
[title~=flower]	

[attribute*=value]
// Selects every <a> element whose href attribute value contains the substring "w3schools"
a[href*="w3schools"]


同时满足多个css属性规则，可以把规则并列
如 下面a标签必须同时有data-ved，ping，href 属性
#rso div[data-hveid] a[data-ved][ping][href]
```

#### CSS Pseudo-classes (伪类选择器)

#### :first-child
The :first-child pseudo-class matches a specified element that is the first child of another element.
```html
// In the following example, the selector matches any <p> element that is the first child of any element:

p:first-child {
  color: blue;
}

// html
<body>
    <p>This is some text.(将会被选，因为它是父元素body 下的（第一个元素） 且 是（p标签元素)）</p>
    <p>This is some text.</p>
    <p><b>Note:</b> For :first-child to work in IE8 and earlier, a DOCTYPE must be declared.</p>
</body>

// html 
<body>
    <h1>This is some text.</h1>
    <p>This is some text.(不会被选，因为它虽然是 body 下的第一个 p 元素，但不是body 的第一个子元素，这里第一个子元素为h1)</p>
    <p>This is some text.</p>
    <p><b>Note:</b> For :first-child to work in IE8 and earlier, a DOCTYPE must be declared.</p>
</body>
```
```html
// In the following example, the selector matches the first <i> element in all <p> elements:

p i:first-child {
  color: blue;
}

// html
<p>I am a 
  <i>strong (被选中，是p 下的第一个元素标签，且是i 标签)</i> person. I am a 
  <i>strong</i> person.
</p>
<p>
  <b>test</b>I am a 
  <i>strong (不被选中，不是p 下的第一个元素标签) </i> person. I am a 
  <i>strong</i> person.
</p>
<p>
  <b>Note:</b> For :first-child to work in IE8 and earlier, a DOCTYPE must be declared.
</p>

</body>
```
:nth-child(n)
The :nth-child(n) selector matches every element that is the nth child, regardless of type, of its parent.

#### :last-child Selector
The :last-child selector matches every element that is the last child of its parent.
The :nth-last-child(n) selector matches every element that is the nth child, regardless of type, of its parent, counting from the last child.
Tip: p:last-child is equal to p:nth-last-child(1)

#### :first-of-type Selector
```
Specify a background color for the first <p> element of its parent:
p:first-of-type {
  background: red;
}

// 重点：:first-of-type 和 :first-child 的区别是
:first-child 要求 必须是父元素的第一个元素
:first-of-type 不要求是不是父元素的第一个元素，只要是声明类型的第一个元素就可以

<body>
    <h1>The first paragraph.</h1>
    <p>The first paragraph.（将会被选中，它是p元素中的第一个，虽然不是父元素的第一个元素）</p>
    <p>The second paragraph.</p>
</body>

```
#### :last-of-type
The :last-of-type selector matches every element that is the last child, of a particular type, of its parent.

### 总结： 
```
:first-child, :last-child 必须是父元素的第一个子元素或最后一个子元素，
:nth-child(n), :nth-last-child(n) 必须是父元素的正数第n个子元素或者倒数第n个子元素

:first-of-type, :last-of-type 在指定的某种 元素类型 中比较，是父元素下的第一个或者最后一个这种元素就可以
:nth-of-type(n),:nth-last-of-type(n) 在指定的某种 元素类型 中比较，是父元素下的正数第n个或者倒数第n个这种元素就可以

```
#### :not Selector
The :not(selector) selector matches every element that is NOT the specified element/selector.
```
:not(p) {
  color: #ff0000;
}

// 多个not class 既不为action-column，又不为ant-table-selection-column
td:not(.action-column):not(.ant-table-selection-column){
    cursor: pointer;
}
```



### 拿元素的位置

container.getBoundingClientRect()

{
  bottom: 477.68751525878906
  height: 187.1041717529297
  left: 202.125
  right: 385
  top: 290.5833435058594
  width: 182.875
  x: 202.125
  y: 290.5833435058594
}


### Repaint(重绘) 和 Reflow(回流)
Repaint occurs when some changes only its skin styles, such as color and visibility. Reflow occur when the page of DOM changes its layout.


### css position
The position property specifies the type of positioning method used for an element
value | description
------------ | -------------
static | Default value. Elements render in order, as they appear in the document flow
absolute | The element is positioned relative to its first positioned (not static) ancestor element
fixed | The element is positioned relative to the browser window
relative | The element is positioned relative to its normal position, so "left:20px" adds 20 pixels to the element's LEFT position
sticky | The element is positioned based on the user's scroll position
initial | Sets this property to its default value
inherit | Inherits this property from its parent element.





### Bootstrap 4 media queries code snippet
```
要点：
min-width 是包含指定值的
max-width 不包含指定值

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {  
 
}
 
/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {  
 
}
 
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { 
 
}
 
/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {  
    
}
```


#### We occasionally use media queries that go in the other direction (the given screen size or smaller)
```
// Extra small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) { ... }

// Small devices (landscape phones, less than 768px)
@media (max-width: 767.98px) { ... }

// Medium devices (tablets, less than 992px)
@media (max-width: 991.98px) { ... }

// Large devices (desktops, less than 1200px)
@media (max-width: 1199.98px) { ... }

// Extra large devices (large desktops)
// No media query since the extra-large breakpoint has no upper bound on its width
```



#### mixins for targeting a single segment of screen sizes using the minimum and maximum breakpoint widths
```
// Extra small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) { ... }

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) and (max-width: 767.98px) { ... }

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) and (max-width: 991.98px) { ... }

// Large devices (desktops, 992px and up)
@media (min-width: 992px) and (max-width: 1199.98px) { ... }

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { ... }
```