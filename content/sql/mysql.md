---
title: "mysql"
metaTitle: "mysql"
metaDescription: "mysql"
---
#### mysql 远程连接数据库

#####  默认情况下，mysql帐号不允许从远程登陆，只能在localhost登录。本文提供了二种方法设置mysql可以通过远程主机进行连接。

mysql 默认端口“3306”，用户名为“root”，

在localhost登入mysql后，更改 "mysql" 数据库里的 "user" 表里的 "host" 项，将"localhost"改称"%"

```
mysql>update user set host = '%' where user = 'root';
```

你想myuser使用mypassword（密码）从任何主机连接到mysql服务器的话。

```
mysql>GRANT ALL PRIVILEGES ON *.* TO 'myuser'@'%'IDENTIFIED BY 'mypassword' WITH GRANT OPTION;

mysql>FLUSH PRIVILEGES
```


### Mysql清空表 truncate 与删除表中数据 delete 的区别
如表名wp_comments
```
truncate table wp_comments;

delete * from wp_comments;

// Mysql 8
delete from wp_comments;
```
其中truncate操作中的table可以省略，delete操作中的*可以省略。这两者都是将wp_comments表中数据清空，不过也是有区别的，如下：
- truncate是整体删除（速度较快）， delete是逐条删除（速度较慢）。
- truncate不写服务器log，delete写服务器log，也就是truncate效率比delete高的原因。
- truncate不激活trigger(触发器)，但是会重置Identity（标识列、自增字段），相当于自增列会被置为初始值，又重新从1开始记录，而不是接着原来的ID数。而delete删除以后，Identity依旧是接着被删除的最近的那一条记录ID加1后进行记录。
- 如果只需删除表中的部分记录，只能使用DELETE语句配合where条件。 DELETE FROM wp_comments WHERE……



### 有表A,创建一个具有相同表结构的B,不复制内容

```
create table B like A;
OR
create table B as select * from A where 1=2; 
```

### 复制表结构及数据到新表
```
CREATE TABLE newTable SELECT * FROM oldTable

postgresql
create table my_table_copy as select * from my_table limit 5000
```


### mysql让主键id重新排序
```
对数据表操作之前备份一下是个好习惯
1、备份表结构
create table table_bak like table_name;

2、备份表数据
insert into table_bak select * from table_name;

3、删除原来主键字段(如id)
alter table table_name drop id;

4、添加主键，自增，放在第一位
alter table table_name add id int(11) primary key auto_increment first;

搞定
5、检查没问题的话，备份的表可以删了
delete from table_bak;



连接mysql
```
mysql -u root -p

然后输入密码
```

查看数据库
```
show databases;

记住命令后面都分号
```
查看mysql版本等信息
```
status


在sql语句中可以使用
SELECT VERSION();
```

使用数据库
```
use database_a;
```


### 创建原创连接账号
```
mysql -uroot -p

CREATE USER 'some_user'@'%' IDENTIFIED BY 'some_password';

GRANT ALL PRIVILEGES ON *.* TO 'some_user'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
```


### aws RDS mysql 问题
#### 无法还原数据库
```
change the parameter group value of log_bin_trust_function_creators to 1.

detail:
https://aws.amazon.com/premiumsupport/knowledge-center/error-1227-mysqldump/


```


### mysql 数据库备份还原

#### 备份数据库
```
mysqldump -u[用户名] -p[密码] 数据库名称 > 文件

eg:
mysqldump -uroot -p123456 test>e:/mysqltest/test.dump


//备份某个数据库
mysqldump -u root -p [db_name] > [db_name].sql

eg:
./mysqldump -u root -p wp.50d.top > wptop.sql
```

#### 还原数据库
```
准备好备份的数据库文件（.sql file）
mysql -p -u[user] [database] < db_backup.sql

eg:
找到对应的mysql bin目录并进入（/usr/local/mysql/bin）
./mysql -p -u root aqetech.com < /tmp/test_50d_top.sql

然后输入密码
```