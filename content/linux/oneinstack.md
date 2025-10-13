---
title: "oneinstack 命令, 笔记"
metaTitle: "oneinstack 命令, 笔记"
metaDescription: "oneinstack 命令, 笔记"
---



## oneinstack问题
### oneinstack 在ubuntu 24 上安装mysql 跑不起来

Make sure the data directory exists and has correct ownership
```
sudo mkdir -p /data/mysql
sudo chown -R mysql:mysql /data/mysql
sudo chmod 750 /data/mysql
```

If MySQL previously failed, clear any incomplete files:
```
sudo rm -rf /data/mysql/*
```

Initialize the MySQL system tables
```
sudo /usr/local/mysql/bin/mysqld --initialize --user=mysql --basedir=/usr/local/mysql --datadir=/data/mysql



This will:
Create the internal tables under /data/mysql
Generate a temporary root password (look for the line like):

A temporary password is generated for root@localhost: Abc!123xyz


使用下面命令查看：
sudo grep 'temporary password' /data/mysql/mysql-error.log

```

#### Log in with that password
```
sudo /usr/local/mysql/bin/mysql -uroot -p

```
#### Change it immediately
```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewStrongPassword!123';
FLUSH PRIVILEGES;
```