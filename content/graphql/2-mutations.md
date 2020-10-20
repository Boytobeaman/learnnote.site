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


#### strapi login 案例
```
export async function graphqlLogin(data: any) {
  return graphqlRequest(
    `mutation($input: UsersPermissionsLoginInput!) {
      login(input: $input  ){
        jwt
        user{
          id
          username
          email
          blocked
          role{
            name
          }
        }
      }
    }`,
      {
        variables: {
          input: data,
        },
      },
    );
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


#### strapi 删除 teacher 案例
```
mutation deTeacher($input: deleteTeacherInput!) { 
        deleteTeacher(input: $input) {
          teacher {
              id
          } 
        }
      }


{
  "input": {
    "where": {
      "id": "5"
    }
  }
}
```

#### strapi 更新 teacher 案例
```
mutation upTeacher($input: updateTeacherInput!) { 
        updateTeacher(input: $input) {
          teacher {
              id
          } 
        }
      }

{
  "input": {
    "where": {
      "id": "4"
    },
    "data": {
      "name": "update 4",
      "age": "20"
    }
  }
}
```
