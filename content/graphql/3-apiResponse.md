---
title: "graphql queries"
metaTitle: "graphql 返回数据，GraphQL queries 返回数据格式"
metaDescription: "graphql 返回数据，GraphQL queries 返回数据格式"
---


### success response
```
res ={
  data:{
    yourQueryEntity:{

    }
  }
}
```

### error response

```
res ={
  errors: [
    {
      message: "",
      ...
    },
  ]
}
```