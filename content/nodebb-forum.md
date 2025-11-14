---
title: "nodebb forum"
metaTitle: "nodebb forum"
metaDescription: "nodebb forum"
---

### How do I reset the admin password?

The ./nodebb can be used to reset any users password. All you need to know is the user id. To set a new password, you can use the following command:
```

./nodebb user reset <uid> --password <new-password>

//The admin user id in a default installation is 1
```


### 安装插件如email
```
https://domain.com/admin/extend/plugins#download


配置smtp:

管理员登陆后
settings--> email

SMTP Transport
勾选 Enable SMTP Transport

然后填入SMTP 认证信息
```


### 常见配置

```
将根目录 ./config.json 里面的url

由
http://localhost:4567

设置为真实的网址，如
https://forum.bearbattery.com

这样邮件链接里面就会用真实的网址，而不是localhost
```