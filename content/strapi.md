---
title: "strapi"
metaTitle: "strapi 使用笔记"
metaDescription: "strapi 使用笔记"
---

### 数据库

collection name | description
------------ | -------------
strapi_administrator | 超级管理员
strapi_role | strapi role （Super Admin/Editor/Author）



### 常用技巧
To list all the available services, run
```
yarn strapi services:list
```
To list all the available controllers, run 
```
yarn strapi controllers:list
```

#### 忘记密码
```
//重置密码
yarn strapi admin:reset-user-password --email="YOUR_EMAIL" --password="YOUR_NEW_PASSWORD"
npm run strapi admin:reset-user-password --email="YOUR_EMAIL" --password="YOUR_NEW_PASSWORD"
```


### strapi v4 filter
https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#find-users-having-john-as-first-name


#### 过滤某个字段
```
const qs = require('qs');
const query = qs.stringify({
  filters: {
    username: {
      $eq: 'John',
    },
  },
}, {
  encodeValuesOnly: true,
});

await request(`/api/users?${query}`);

```

### null 的查询
```
// 比如indexed 字段为null 或者为 false, filter可以这样写

filters:{
  $or:[
    {
      indexed:{
        $eq: false
      }
    },
    {
      indexed:{
        $null: true
      }
    }
  ]
}
```
#### 利用 and 和 or 完成复杂条件过滤
Find books with 2 possible dates & a specific author
```
const query = qs.stringify({
  filters: {
    $or: [
      {
        date: {
          $eq: '2020-01-01',
        },
      },
      {
        date: {
          $eq: '2020-01-02',
        },
      },
    ],
    author: {
      name: {
        $eq: 'Kai doe',
      },
    },
  },
}, {
  encodeValuesOnly: true,
});

```

#### Deep filtering
Find restaurants owned by a chef who belongs to a 5-star restaurant
```
const query = qs.stringify({
  filters: {
    chef: {
      restaurants: {
        stars: {
          $eq: 5,
        },
      },
    },
  },
}, {
  encodeValuesOnly: true,
});
```

### Field selection 指定要返回的字段
Select only title & body fields
```
const query = qs.stringify({
  fields: ['title', 'body'],
}, {
  encodeValuesOnly: true,
});
```

### Population 关联表内容如何返回
populate one-level deep for all relations, use the * wildcard in combination with the populate parameter
```
const query = qs.stringify({
  populate: '*', 
}, {
  encodeValuesOnly: true,
});
```

populate only specific relations one-level deep, use the relation name (e.g. categories) in combination with the populate parameter
```
const query = qs.stringify({
  populate: ['categories'], 
}, {
  encodeValuesOnly: true,
});

```

Populate 2 levels: author and author.company

To populate specific relations, one or several levels deep, use the LHS bracket notation for fields names in combination with the populate parameter
```
const query = qs.stringify({
  populate: {
    author: {
      populate: ['company'],
    }
  } 
}, {
  encodeValuesOnly: true,
});
```

#### 指定关联表的返回字段

例如：过滤出某个product_id的ali products,利用 fields: ['id']说明只返回id 字段，populate指定只返回 searched_keywords这个关联关系表，且searched_keywords 只返回'id' 和 'keyword'字段

```
const aliProQuery = qs.stringify({
    populate: {
        searched_keywords: {
            fields: ['id', 'keyword'],
        }
    }, 
    fields: ['id'],
    filters: {
        product_id: {
            $eq: product_id,
        },
    },
  }, {
    encodeValuesOnly: true,
});
```


### 定时任务

#### 第一步 激活cron 功能
```
在 /config/server.js 中配置cron.enabled = true,并指定cron.tasks 对于的文件


eg:

const cronTasks = require("./cron-tasks");

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  cron: {
    enabled: true,
    tasks: cronTasks,
  },
});

```

#### 第二步 编写具体的 cron 文件，如cron-tasks.js
```
eg:

// path: ./config/cron-tasks.js
module.exports = {
   /**
   * Cron job with timezone example.
   * Every Monday at 1am for Asia/Dhaka timezone.
   * List of valid timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
   */

  
  myJob: {
     task: ({ strapi }) => {/* Add your own logic here */ },
     options: {
        rule: '0 0 1 * * 1',
        tz: 'Asia/Dhaka',
     },
   },
 };
```

### rule 对于规则
```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```


### 增加自定义api
在某个content-type 目录下，比如 /api/ali-product

在其 routes 目录下 已有个默认的 ali-product.js
需要再创建一个 es-ali-product.js 文件, 如下
```
module.exports = {
  routes: [
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/es-ali-products/hello',
      handler: 'ali-product.hello',
    },
    { // Path defined with a URL parameter
      method: 'POST',
      path: '/es-ali-products/aliProductChange',
      handler: 'ali-product.aliProductChange',
    }
  ]
}
// 注意 path: '/es-ali-products/aliProductChange'
// 其中 es-ali-products 不能与已有的 ali-products 路由一样；
```

然后在原有的
/src/api/ali-product/controllers/ali-product.js 中增加方法

```
'use strict';

/**
 *  ali-product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ali-product.ali-product',({ strapi }) =>  ({
  // Method 1: Creating an entirely custom action
    async hello(ctx) {
      console.log(`hello called in ali-product.js`)
      try {
        ctx.body = 'hello';
      } catch (err) {
        ctx.body = err;
      }
    },

    async aliProductChange(ctx) {

      try {
        const { id } = ctx.params;
        const { query } = ctx;
        const { body } = ctx.request;
        
        ctx.body = 'aliProductChange';
      } catch (err) {
        ctx.body = err;
      }
    }
  })
);

```