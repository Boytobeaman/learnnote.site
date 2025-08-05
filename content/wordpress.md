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



### woocommerce如何为产品分类product category 和产品标签product tag 页面额外加描述，放在产品列表后面
#### 使用ACF创建一个WYSIWYG字段，用来记录 after_loop_description
```
// 需要安装ACF
1. Create a Custom Field for Product Categories/Tags

Go to ACF > Field Groups and click Add New.

Title it something like: Product Category Extra Description.

2. Add a Field
Click Add Field.

Label: After Loop Description

Field Name: after_loop_description

Field Type: WYSIWYG (or Textarea if you prefer simple text)

3. Set Location Rules
Set the location to:

Taxonomy → is equal to → Product categories
AND/OR

Taxonomy → is equal to → Product tags
```

#### 使用hooks, 在特定地方展示 after_loop_description 字段
```
// woocommerce_after_shop_loop 就是 产品列表结束后
function add_after_loop_description_inside_main() {
    if (is_product_category() || is_product_tag()) {
        $term = get_queried_object();
        $after_description = get_field('after_loop_description', $term);

        if ($after_description) {
            echo '<div class="woocommerce-after-loop-description">';
            echo wp_kses_post($after_description);
            echo '</div>';
        }
    }
}
add_action('woocommerce_after_shop_loop', 'add_after_loop_description_inside_main', 20);
```


### wordpress 安全

#### 使用 nginx 关闭 xmlrpc
```
location = /xmlrpc.php {
    return 404;
}


或者
if you prefer to return 403 instead of 404

location = /xmlrpc.php {
    deny all;
}
```

### block ip
```
# Block specific IP
if ($remote_addr = 128.199.105.213) {
    return 403;
}

Block multiple IPs:

server {

    deny 123.45.67.89;
    deny 98.76.54.32;
    allow all;

}

```

### Wordpress数据库安全
Suspiciously long or encoded options (common for injections)

```
SELECT option_name, LENGTH(option_value) AS len FROM wp_options WHERE LENGTH(option_value) > 10000 ORDER BY len DESC LIMIT 10;
```

### wordpress 常用插件
```
Broken Link Checker
// 查看 Broken Link
```