---
title: "graphql queries"
metaTitle: "graphql 拿数据，GraphQL queries"
metaDescription: "GraphQL 如何拿数据"
---

### query 请求
```
// 请求所有的company 及每个company 里面所有的user 和 product_category, 
// 每个product_category 关联的the_attribute 也会被返回
query{
  companies{
    company_name
    users{
      username
      email
    }
    product_categories{
      name
      the_attributes{
        id
        name
      }
    }
  }
}
```

#### 加过滤条件
```
//按照ID 过滤
query{
  companies(where:{id:"5f3aac26702c6e2efdb8c2b1"}){
    id
    company_name
    users{
      username
      email
    }
  }
}

// 加返回条数
query{
  companies(limit:2){
    id
    company_name
  }
}


// Fetch 1 user and 5 most recent todos for each user
query {
  users (limit: 1) {
    id
    name
    todos(order_by: {created_at: desc}, limit: 5) {
      id
      title
    }
  }
}
//Fetch users (with limit 1), and their todos (ordered by descending creation time, and limited to 5)
```

#### Passing arguments to your queries dynamically
```
query ($limit: Int!) {
  todos(limit: $limit) {
    id
    title
  }
}

In addition to the query above, we send a variables object:
{
   "limit": 10
}


// 前端运用实例
export async function fetchAPI(query:string, { variables } = {}) {
  return request(`${API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
}


export async function getStoreList() {
  let condition = {}

  return fetchAPI(`query HotStores($where: JSON) {
      hotStores(where:$where) {
        id
        staffLike
        staffDislike
        store_tags{
          id
          name
        }
        names(where:{type:"initialValue"}){
          id
          type
          value
        }
      }
    }`,
    { variables: { "where": condition} })
}
```
