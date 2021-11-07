
### Basic Features





#### Static File Serving 静态文件
Next.js可以在根目录下的文件夹public下提供静态文件（例如图片）。
代码中你可以以（/）开始引用public下的文件。

例如添加 public/my-image.png 这个图片
```
<img src="/my-image.png" alt="my image" />
```
This folder is also useful for robots.txt, favicon.ico, Google Site Verification, and any other static files (including .html)!


#### Data Fetching 获取数据


##### getStaticProps (Static Generation): Fetch data at build time.


##### getServerSideProps (Server-side Rendering): Fetch data on each request.