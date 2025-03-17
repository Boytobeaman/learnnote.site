---
title: "ssh"
metaTitle: "ssh"
metaDescription: "ssh"
---




## SSH

Secure Shell（SSH）是一种加密网络协议，用于在不安全的网络上安全地运行网络服务。利用SSH可以实现加密并安全地远程登录计算机系统。
#### SSH-涉及文件
文件 | 说明
------------ | -------------
id_rsa | 保存私钥
id_rsa.pub | 保存公钥
authorized_keys | 保存已授权的客户端公钥
known_hosts | 保存已认证的远程主机ID

#### SSH 服务端配置, centos 开启ssh
检测ssh服务是否启动 ： 
netstat -ntlp | grep ssh

如果ssh服务没有启动：
systemctl restart sshd.service


添加客户端公钥，将客户端的公钥文件中的内容添加到 /root/.ssh/authorized_keys
vim /root/.ssh/authorized_keys

修改配置文件
vim /etc/ssh/sshd_config
要把PubkeyAuthentication配置为 yes 允许使用基于密钥认证的方式登录

连接：
使用默认的ssh秘钥对连接：
ssh username@host -p port
eg:
ssh root@34.213.2*.224

指定秘钥对的ssh连接 ： 
ssh -i parivate-rsa-path username@host -p port
eg:
ssh -i C:/Users/86185/.ssh/id_rsa root@34.213.2*.224

注意：这里是parivate-rsa-path，私钥，这里客户端要用私钥解密 服务端加密来的信息

### 查看ssh 运行状态
```
systemctl status ssh
```


### 查看ssh 登陆日志
```
// 默认日志位置
/var/log/auth.log

tail -f /var/log/auth.log
```

## ssh 常见问题
### 登陆失败
userauth_pubkey: signature algorithm ssh-rsa not in PubkeyAcceptedAlgorithms [preauth]

### Add this line in /etc/ssh/sshd_config
```
PubkeyAcceptedAlgorithms +ssh-rsa
```
### restart ssh
```
sudo systemctl restart sshd
```