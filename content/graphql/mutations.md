---
title: "graphql Mutations"
metaTitle: "GraphQL 如何改变数据，GraphQL Mutations"
metaDescription: "GraphQL Mutations是一种可能导致后端状态“突变”或改变的GraphQL查询类型，就像典型的“POST”、“PUT”、“PATCH”、“DELETE” api一样。"
---

### Mutations


#### 常见案例
```
mutation {
  insert_todos(objects: [{title: "new todo"}]) {
    returning {
      id
    }
  }
}


//增加成功后 返回字段由 returning 指定
mutation {
  insert_todos(objects: [{title: "new todo"}]) {
    returning {
      id
      title
      is_completed
      is_public
      created_at
    }
  }
}
```

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