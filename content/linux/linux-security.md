---
title: "linux 安全"
metaTitle: "linux 安全，Linux 常用安全软件"
metaDescription: "linux 安全，Linux 常用安全软件"
---



### fail2ban 安装与配置
```
sudo apt update
sudo apt install fail2ban
```

#### 基本配置
fail2ban 的主要配置文件位于：

/etc/fail2ban/jail.conf - 主配置文件（不建议直接修改）
/etc/fail2ban/jail.local - 用户自定义配置（推荐在此修改）


#### fail2ban 常用命令
启动/停止/重启服务
```
sudo systemctl start fail2ban    # 启动服务
sudo systemctl stop fail2ban     # 停止服务
sudo systemctl restart fail2ban  # 重启服务
sudo systemctl enable fail2ban   # 设置开机自启
```

#### 查看服务状态
```
sudo systemctl status fail2ban
```

#### 查看 fail2ban-client 的状态，如启用了对哪些服务的保护
```
sudo fail2ban-client status

// 默认情况下只开启了对 ssh 的保护
Status
|- Number of jail:	1
`- Jail list:	sshd
```

#### 查看被封禁的 IP
```
sudo fail2ban-client status sshd
```

#### 解封特定 IP
```
sudo fail2ban-client set sshd unbanip 192.168.1.100
```

#### 手动封禁 IP
```
sudo fail2ban-client set sshd banip 192.168.1.100
```


### 常见filter及其位置
```
ls /etc/fail2ban/filter.d
```

### 查看日志
```
tail -f /var/log/fail2ban.log
```



### 添加自定义filter，注意filter 的名字不能太长
遇到的一个filter 长度问题  
iptables v1.8.7 (nf_tables): chain name `f2b-nginx-botsearch-oneinstack' too long (must be under 29 chars)

```
如自定义filter 名称为 nginx-404
vim /etc/fail2ban/filter.d/nginx-404.conf

填入如下，表示匹配 404 的访问

[Definition]
failregex = ^<HOST> - - \[.*\] "(GET|POST|HEAD) /.* HTTP/\d\.\d" 404
ignoreregex =



然后编辑, 表示 5分钟内有10次 404 的访问即禁止访问 一个小时
vim /etc/fail2ban/jail.local


[nginx-404]
enabled  = true
filter   = nginx-404
logpath  = /data/wwwlogs/*_nginx.log
backend  = polling
port     = http,https
maxretry = 10
findtime = 120
bantime  = 3600


然后重启
sudo systemctl restart fail2ban

查看自定义filter nginx-404 的状态
sudo fail2ban-client status nginx-404
```


### 针对wordpress 的filter
Block XML-RPC brute force
```
vim /etc/fail2ban/filter.d/wordpress-xmlrpc.conf

[Definition]
failregex = <HOST> -.*POST /xmlrpc.php


vim /etc/fail2ban/jail.local

[wordpress-xmlrpc]
enabled = true
filter = wordpress-xmlrpc
logpath = /data/wwwlogs/*_nginx.log
backend  = polling
maxretry = 3
findtime = 300
bantime = 3600
action = iptables[name=wordpress-xmlrpc, port=http, protocol=tcp]
```

wordpress-login (Protect /wp-login.php)
```
vim /etc/fail2ban/filter.d/wordpress-login.conf

[Definition]
failregex = <HOST> -.*"(GET|POST) /wp-login.php
            <HOST> -.*"(GET|POST) /wp-login.php.*HTTP.*" 200
ignoreregex =



vim /etc/fail2ban/jail.local

[wordpress-login]
enabled = true
filter = wordpress-login
logpath = /data/wwwlogs/*_nginx.log
backend  = polling
maxretry = 5
findtime = 600
bantime = 3600
action = iptables[name=wordpress-login, port=http, protocol=tcp]



常见问题：

如果设置了具体的 logpath
需要设置
backend  = polling
使其生效
backend = polling — this disables the systemd journal reading and enables direct file reading
```