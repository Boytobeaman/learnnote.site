---
title: "网络性能重要指标"
metaTitle: "网络性能重要指标, TTFB, FCP, LCP, FID, CLS"
metaDescription: "网络性能重要指标, 衡量用户体检的重要网络性能指标"
---

### Web Vitals are a set of useful metrics that aim to capture the user experience of a web page. The following web vitals are all included:


#### Time to First Byte (TTFB)



#### First Contentful Paint (FCP)



#### Largest Contentful Paint (LCP)


#### First Input Delay (FID)


#### Cumulative Layout Shift (CLS)



### 前端性能优化

### DOMContentLoaded 与 load事件
```
DOMContentLoaded
The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.

load
The load event is fired when a resource and its dependent resources have finished loading.



window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded --- DOM fully loaded and parsed');
});

DOMContentLoaded 相当于 jQuery ready() Method
jQuery ready() 兼容性更好，考虑到了老的IE浏览器等场景
$(document).ready(function(){
  //your code
});




window.addEventListener('load', (event) => {
  console.log('load ---- page is fully loaded');
});
```

#### async defer in script
```
With async (asynchronous), browser will continue to load the HTML page and render it while the browser load the script at the same time, but block parsing html when execute the script.

带 async 的script 下载时，不会block html 的渲染，但一旦下载完成后执行script 时，html 的渲染会暂停

async scripts load in the background and run when ready. The DOM and other scripts don’t wait for them, and they don’t wait for anything. A fully independent script that runs when loaded.

带async的脚本一定会在load事件之前执行，可能会在DOMContentLoaded之前或之后执行。

async 使用场景：
第三方脚本如：广告脚本
<!-- Google Analytics is usually added like this -->
<script async src="https://google-analytics.com/analytics.js"></script>


With defer , browser will run your script when the page finished parsing. (not necessary finishing downloading all image files

Scripts with defer never block the page.
Scripts with defer always execute when the DOM is ready, but before DOMContentLoaded event.
defer脚本会在文档渲染完毕后，DOMContentLoaded事件调用前执行。

The defer attribute is only for external scripts
The defer attribute is ignored if the <script> tag has no src.


在加载多个JS脚本的时候，async是无顺序的加载，而defer是有顺序的加载。
```
![async defer in script](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/async-defer-in-script.png)