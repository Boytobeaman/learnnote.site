---
title: "ftp"
metaTitle: "ftp 教程，ftp 笔记，ftp 面试问题"
metaDescription: "ftp 教程，ftp 笔记，ftp 面试问题"
---


## ftp 常见问题

### Server sent passive reply with unroutable address. Using server address instead

#### 连接上了无法查看文件目录
```
可能是服务器端口 20000-30000 没有开启访问


默认情况下服务器ftp有如下配置
PassivePortRange          20000 30000
```

### install ftp in ubuntu
```
// update your base system with the latest available packages
apt-get update -y

// Install Pure FTPd
apt-get install pure-ftpd -y

//verify the status of Pure FTPd with the following command:
systemctl status pure-ftpd
```

### Create FTP User
```
adduser azuser

```

### Create a Self-signed SSL/TLS certificate
```
openssl req -x509 -nodes -newkey rsa:2048 -keyout /etc/ssl/private/pure-ftpd.pem -out /etc/ssl/private/pure-ftpd.pem -days 365

```
### Configure Pure FTPd to use SSL/TLS
```
vim /etc/pure-ftpd/pure-ftpd.conf


Change the following lines:
TLS                          2
TLSCipherSuite               HIGH:MEDIUM:+TLSv1:!SSLv2:!SSLv3
CertFile                     /etc/ssl/private/pure-ftpd.pem




// Enforce TLS Encryption
// create the /etc/pure-ftpd/conf/TLS file and put number 1 into the file
echo 1 | sudo tee /etc/pure-ftpd/conf/TLS
echo 2 | sudo tee /etc/pure-ftpd/conf/TLS


systemctl restart pure-ftpd
```

### 配置 Pure-FTPd
配置文件默认位于 /etc/pure-ftpd/pure-ftpd.conf

以下为常用配置，可以通过 vim 进行修改。
```

# 指定IP地址和端口号，默认为21端口，为安全考虑可更改为其它端口
Bind                         0.0.0.0,21898

# 指定PureDB用户数据库文件
PureDB                        /etc/pure-ftpd/pureftpd.pdb

# 拒绝匿名登录
NoAnonymous                  yes

# 被动模式端口范围，默认为30000到50000
PassivePortRange             30000 50000

```


### pureftp passwd 文件位置
```
etc/pure-ftpd/pureftpd.passwd

oneinstack
/usr/local/pureftpd/etc/pureftpd.passwd
```