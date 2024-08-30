---
title: "redis 常用命令"
metaTitle: "redis 常用命令"
metaDescription: "redis 常用命令"
---

### redis 常用命令

### 安装redis
```
By default, Redis will bind to localhost (127.0.0.1) on port 6379.

配置文件位置
/etc/redis/redis.conf

// 查看配置文件位置
redis-cli INFO | grep config_file

Mac 一般位置
/opt/homebrew/etc/redis.conf
```

### centos 安装redis
```
1.nstall EPEL using yum
sudo yum install epel-release

2. Once the EPEL installation has finished you can install Redis, again using yum:
sudo yum install redis -y

3. This may take a few minutes to complete. After the installation finishes, start the Redis service:
sudo systemctl start redis.service

4. If you’d like Redis to start on boot, you can enable it with the enable command:
sudo systemctl enable redis

5. You can check Redis’s status by running the following:
sudo systemctl status redis.service


查看redis 是否可用
redis-cli ping
```

### ubuntu 安装redis
```
1. Update the package list for upgrades and new installations
sudo apt update

2. Install Redis by running the following command:
sudo apt install redis-server

3.Once the installation is complete, Redis will start automatically. You can check the status of the Redis service by running:
sudo systemctl status redis-server


```

### 查看redis 安装版本信息
```
redis-server --version
```

### redis-cli 进入redis 命令行模式
```
redis-cli
```

### 命令语法格式
```
COMMAND KEY_NAME


COMMAND 为命令，如
SET：设置值
DEL：删除值
GET：获取值

KEY_NAME 为属性名


example:
SET runoobkey redis
// ok 成功的话返回 ok

GET runoobkey

DEL runoobkey
// 1 成功删除一条数据 返回 1
```


### 查找所有符合给定模式 pattern 的 key
```
KEYS PATTERN


// 获取 redis 中所有的 key 可用使用 *
KEYS *

// 查找以 runoob 为开头的 key：
KEYS runoob*
```

#### 返回 key 所储存的值的类型
```
TYPE key
```
### 数据类型
Redis 字符串(String)  



Redis 哈希(Hash)  
Redis hash 是一个 string 类型的 field（字段） 和 value（值） 的映射表，hash 特别适合用于存储对象。
##### HMSET 设置hash 值
```
HMSET runoobkey name "redis tutorial" description "redis basic commands for caching" likes 20 visitors 23000


// HGETALL 取出一个hash 的所有值
HGETALL runoobkey

// HMGET 获取所有给定字段的值
HMGET key field1 [field2]
```


### 设置过期时间
```
// EXPIRE and TTL commands

SET resource:lock "Redis Demo"
EXPIRE resource:lock 120


以秒为单位返回 key 的剩余过期时间
TTL KEY_NAME
TTL resource:lock => 113

// 当 key 不存在时，返回 -2 
// 当 key 存在但没有设置剩余生存时间时，返回 -1
```


### Redis 数据备份与恢复
```
SAVE 命令用于创建当前数据库的备份
redis 127.0.0.1:6379> SAVE 
OK


BGSAVE, 创建 redis 备份文件也可以使用命令 BGSAVE，该命令在后台执行。
127.0.0.1:6379> BGSAVE

Background saving started


恢复数据
如果需要恢复数据，只需将备份文件 (dump.rdb) 移动到 redis 安装目录并启动服务即可。获取 redis 目录可以使用 CONFIG 命令，如下所示：

redis 127.0.0.1:6379> CONFIG GET dir
1) "dir"
2) "/usr/local/redis/var"
```

### Redis 安全
我们可以通过 redis 的配置文件设置密码参数，这样客户端连接到 redis 服务就需要密码验证，这样可以让你的 redis 服务更安全。

#### 查看是否设置了密码验证：
```
127.0.0.1:6379> CONFIG get requirepass
1) "requirepass"
2) ""

// 默认情况下 requirepass 参数是空的，这就意味着你无需通过密码验证就可以连接到 redis 服务。


//可以通过以下命令来修改该参数
CONFIG set requirepass "yourpwd"
//这个是临时设置密码

要永久设置redis密码需要修改配置文件 redis.conf
//设置
requirepass yourpwd
//然后重启redis

// 再次操作redis 就需要验证密码了，使用AUTH验证
AUTH 命令基本语法格式如下
AUTH "your password"
```

### Redis 配置远程连接

```
注释掉
bind 127.0.0.1

将
protected-mode yes改成
protected-mode no

重启redis
systemctl restart redis
```
