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

### remove pure-ftpd
```
apt-get remove --purge pure-ftpd pure-ftpd-common
```

### Create FTP User
```

创建系统用户的组
sudo groupadd ftpgroup


创建系统用户，加入刚刚创建的组
sudo useradd ftpuser -g ftpgroup -s /sbin/nologin


创建ftp存储目录，并使相应的系统用户拥有权限
sudo mkdir -p /data/wwwroot/ftpfolder

sudo chown -R ftpuser:ftpgroup /data/wwwroot/ftpfolder


创建虚拟用户 user1
sudo pure-pw useradd user1 -u ftpuser -g ftpgroup -d /data/wwwroot/ftpfolder/user1

用户创建完成后需要运行下面命令创建/更新用户数据库。或者在运行 pure-pw useradd 等命令时加上 -m 参数直接创建/更新数据库以省略本步。 
sudo pure-pw mkdb


使用 apt-get 安装的 pure-ftpd 默认没有开启虚拟用户的的认证方式，所以就算创建了虚拟用户，仍然无法登陆ftp。pure-ftpd 的默认配置文件位置在 /etc/pure-ftpd 文件夹下，启用虚拟用户认证的方式需要在认证文件夹 /etc/pure-ftpd/auth 下创建对应认证方式的软连接。

cd /etc/pure-ftpd/auth/
创建虚拟用户认证的软连接
sudo ln -s ../conf/PureDB 60puredb

还需要检查一下设置中虚拟用户方式是否是开启状态
cat 60puredb 
结果为 /etc/pure-ftpd/pureftpd.pdb 。内容为虚拟用户数据库文件


之后再重启 pure-ftpd 服务
sudo systemctl restart pure-ftpd

此时已经可以通过 ftp 客户端使用创建好的虚拟用户进行连接了



# 修改密码
eg: 修改 user1 的密码
sudo pure-pw passwd user1

# 修改后要更新一下
sudo pure-pw mkdb

# 显示用户列表
sudo pure-pw list

# 删除用户
pure-pw userdel someuser
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