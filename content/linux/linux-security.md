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