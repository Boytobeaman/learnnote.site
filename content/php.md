---
title: "php"
metaTitle: "php 常见问题和命令, php 正则"
metaDescription: "php 常见问题和命令, php 正则， php 入门"
---

### 如何调试 wordpress 网站
#### php 如何将debugg 信息输出到 log file 中？ How to print a debug log? 
If you want to output a debug message to a log file, you can use the error_log function.

```
// Enable WP_DEBUG mode
define( 'WP_DEBUG', true );
 
// Enable Debug logging to the /wp-content/debug.log file
define( 'WP_DEBUG_LOG', true );



// 使用 error_log 可以把想输出的内容放到 /wp-content/debug.log 文件中
// 比如下面输出 SERVER_NAME
// eg: www.xxx.com
$SERVER_NAME = $_SERVER['SERVER_NAME'];
error_log(print_r($SERVER_NAME, TRUE)); 
```

#### str_replace 替换字符串
```
// Replace the characters "world" in the string "world Hello world!" with "Peter":
echo str_replace("world","Peter","world Hello world!");
// Peter Hello Peter!
```


#### preg_quote php正则中使用变量

```
$reg = '/^[a-z"]{1,'. preg_quote($number) .'}$/';
```
