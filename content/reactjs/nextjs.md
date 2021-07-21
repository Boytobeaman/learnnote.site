---
title: "nextjs 笔记"
metaTitle: "nextjs 笔记, nextjs 服务端渲染，nextjs ssr"
metaDescription: "nextjs 笔记, nextjs 服务端渲染，nextjs ssr"
---

### Static Generation with Data using getStaticProps
```
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```


### Server-side Rendering 
you need to export getServerSideProps instead of getStaticProps from your page
```
export async function getServerSideProps(context) {

  
  return {
    props: {
      // props for your component
    }
  }
}
```


### import image
nextjs 不支持直接import image
需要安装 next-optimized-images 或者 next-images；
并且配置next.config.js
```
import ab from "../assets/ab.jpg"

console.log(ab)
// ab 为图片url
/_next/static/images/ab-3fb8017e0db6fb938d1a1007ef227d86.jpg


最新的next 11 版本支持直接import 图片:

import LogoImage from '~/assets/images/bim-logo.png';

console.log(LogoImage)
{
  src: "/_next/static/image/assets/images/bim-logo.cfexxxx9.png", 
  height: 702, 
  width: 2252, 
  blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgA…+/RXjYWL48wIo+RyImQAXARzogUBDGwAAAABJRU5ErkJggg=="
}



gatsby 和 react 支持直接import image
```

### 改变运行端口 -p 端口
更改package.json 的 scripts
```
"dev": "next dev -p 3200",
```


### 部署nextjs 到服务器上
```
如果使用了typestript，要在服务器上安装 typescript
npm install typescript -g


先cd 到next项目根目录 build 项目
yarn build

然后
NODE_ENV=production PORT=5010 pm2 start npm --name "component.90m.top" -- run start


然后配置nginx 端口 
到next 启动的端口
如package.json里面的 scripts.start 端口配置 5010
"scripts": {
  "dev": "PORT=5010 next dev",
  "build": "next build",
  "start": "PORT=5010 next start",
},


具体配置如下：（删除oneinstack 里面默认生成的其他 图片或者 js的nginx规则）
location / {
  proxy_pass http://127.0.0.1:5010;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto https;
  proxy_connect_timeout       300;
  proxy_send_timeout          300;
  proxy_read_timeout          300;
  send_timeout                300;

  #配置 图片缓存, 嵌套规则
  location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|flv|mp4|ico)$ {
    expires 30d;
    access_log off;
    add_header    Cache-Control  max-age=86400;
  }
  location ^~ /_next/image {
    add_header    Cache-Control  s-maxage==86400;
  }

}

location ^~ /.well-known/acme-challenge/ {
  default_type "text/plain";
  root /data/wwwroot/platform.90m.top/;
}


```