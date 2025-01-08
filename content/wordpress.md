---
title: "wordpress study"
metaTitle: "wordpress study"
metaDescription: "wordpress study"
---

### wordpress 常用插件

#### windpress
Tailwind CSS integration for WordPress

在setting页可以配置performance
wp-admin/admin.php?page=windpress#/settings

勾选
Use cached CSS if available

如果有新加的html等可以点击一下
generate 重新生成css



### 使用SQL删除Wordpress所有评论
```
DELETE FROM `wp_comments`
DELETE FROM `wp_commentmeta`;
```
