---
title: "bt panel"
metaTitle: "bt panel 常用快捷键"
metaDescription: "bt panel 常用快捷键"
---


### 宝塔面板


#### PHP安装目录
```
/www/server/php
```
#### PHP配置文件
```
/www/server/php/{52|53|54|55|56|70|71|72|73|74}/etc/php.ini
```

#### 宝塔面板PHP启动、PHP停止、PHP重启及PHP启载命令如下：
```
启动：/etc/init.d/php-fpm-{52|53|54|55|56|70|71|72|73|74} start
停止：/etc/init.d/php-fpm-{52|53|54|55|56|70|71|72|73|74} stop
重启：/etc/init.d/php-fpm-{52|53|54|55|56|70|71|72|73|74} restart
启载：/etc/init.d/php-fpm-{52|53|54|55|56|70|71|72|73|74} reload

eg:
/etc/init.d/php-fpm-83 start
```