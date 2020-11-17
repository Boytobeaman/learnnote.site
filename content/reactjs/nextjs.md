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