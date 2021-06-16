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

#### 变量类型
GraphQL comes with a set of default scalar types out of the box:
```
Int: A signed 32‐bit integer.
Float: A signed double-precision floating-point value.
String: A UTF‐8 character sequence.
Boolean: true or false.
ID: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.

eg:
query supplier($id: ID!) {}

后面加感叹号表示值不能为 null  
! after the type name. This means that our server always expects to return a non-null value for this field
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


// 排序 asc(正序排列) 和 desc(倒序排列) 
query cus_teacher($sort: String) { 
        teachers(sort: $sort){
          id
          name
          age
        }
      }

{
  "sort": "name:desc"
}

//多个过滤条件 start 和 sort
query cus_teacher($start: Int,$sort: String) { 
        teachers(start: $start,sort: $sort){
          id
          name
          age
        }
      }


{
  "start": 1,
  "sort": "id:asc"
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


### 给某个字段加别名 alias
```
// 根据 不同的条件查询出不同的 keyword_ranks 数组，
//分别将对应的字段命名为keyword_ranks_creative，keyword_ranks_p4p
query keywords($where: JSON, $aliplatform_num: Int!) {
  keywords(where:$where, limit: 1000) {
    id
    name
    keyword_ranks_creative:keyword_ranks(where:{type:"creative"},sort:"time:desc",limit: $aliplatform_num){
      id
      rank
      type
      time
      description
      aliplatform{
        id
        name
      }
    }
    keyword_ranks_p4p:keyword_ranks(where:{type:"p4p"},sort:"time:desc",limit: $aliplatform_num){
      id
      rank
      type
      description
      aliplatform{
        id
        name
      }
    }
    sem_search_volumn
  }
}
```
