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


#### 忘记密码
```
//重置密码
yarn strapi admin:reset-user-password --email="YOUR_EMAIL" --password="YOUR_NEW_PASSWORD"
npm run strapi admin:reset-user-password --email="YOUR_EMAIL" --password="YOUR_NEW_PASSWORD"
```