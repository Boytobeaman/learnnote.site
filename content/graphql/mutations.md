---
title: "graphql Mutations"
metaTitle: "GraphQL 如何改变数据，GraphQL Mutations"
metaDescription: "GraphQL Mutations是一种可能导致后端状态“突变”或改变的GraphQL查询类型，就像典型的“POST”、“PUT”、“PATCH”、“DELETE” api一样。"
---

### Mutations

#### strapi teacher example,创建一个Teacher, 成功了返回老师的ID
```
mutation createTeacher($input: createTeacherInput!) { 
        createTeacher(input: $input) {
          teacher {
              id
          } 
        }
      }

{
  "input": {
    "data": {
      "name": "Steve Jobs",
      "age": "52"
    }
  }
}
```