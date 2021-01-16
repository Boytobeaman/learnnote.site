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


gatsby 和 react 支持直接import image
```