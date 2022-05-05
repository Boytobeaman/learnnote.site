---
title: "linux 常用快捷键"
metaTitle: "linux 常用快捷键"
metaDescription: "linux 常用快捷键"
---



### 查看系统版本

```
lsb_release -a


//readhat
cat /etc/redhat-release

```

### 查看linux 是不是64位
```
arch

//如果输出x86_64，则是64位
```


### 连接远程 linux
```
用 .pem file 连接
先 chmod 600 [fileName]

ssh -i KEYFILE bitnami@SERVER-IP
```


### curl
```
curl -v -x socks5h://127.0.0.1:10809 https://www.google.com

curl http://www.google.com --proxy socks5h://127.0.0.1:10809
```
### 常用命令
```
//复制指定目录下的全部文件到另一个目录中
//假设复制源目录 为 dir1 ,目标目录为dir2

//如果dir2目录不存在，则可以直接使用
cp -r dir1 dir2

//如果dir2目录已存在，则需要使用
cp -r dir1/. dir2


//如果dir2目录已存在,这时使用cp -r dir1 dir2,则也会将dir1目录复制到dir2中，明显不符合要求

//移动文件
mv file destination


//移动所有文件（包括隐藏文件）
mv .[^.]* destination

eg:
mv express_test/.[^.]* crawl.90m.top/
//将 express_test 里面的所有文件放到crawl.90m.top里面
```
### 系统时间
```
// 查看系统时间
date -R

//将系统日期设定成2009年11月3日的命令
(sudo) date -s 11/03/2009

//将系统时间设定成下午5点55分55秒的命令
(sudo) date -s 17:55:55

当前时间和日期写入BIOS，避免重启后失效
(sudo) hwclock -w


//设置Linux服务器时区
tzselect
```

## 解压和压缩
```
//把根目录下的bbs.tar.zip解压到/zzz/bbs下，前提要保证存在/zzz/bbs这个目录
//这个和cp命令有点不同，cp命令如果这个目录不存在，就会自动创建这个目录！

tar zxvf /bbs.tar.zip -C /zzz/bbs

用tar命令打包
将 当前目录下的zzz文件 打包到当前目录下并命名为zzz.tar.gz
tar -zcvf  zzz.tar.gz  ./zzz

//将/home/leon/Staging 目录打包，命名为august_project.tar.gz
tar -zcvf august_project.tar.gz /home/leon/Staging

```
### zip 和 unzip
```
以下命令均在/home目录下操作
cd /home #进入/home目录

1、把/home目录下面的mydata目录压缩为mydata.zip
zip -r mydata.zip mydata #压缩mydata目录

2、把/home目录下面的mydata.zip解压到mydatabak目录里面
unzip mydata.zip -d mydatabak

3、把/home目录下面的abc文件夹和123.txt压缩成为abc123.zip
zip -r abc123.zip abc 123.txt

4、把/home目录下面的wwwroot.zip直接解压到/home目录里面
unzip wwwroot.zip

5、把/home目录下面的abc12.zip、abc23.zip、abc34.zip同时解压到/home目录里面
unzip abc\*.zip

6、查看把/home目录下面的wwwroot.zip里面的内容
unzip -v wwwroot.zip

7、验证/home目录下面的wwwroot.zip是否完整
unzip -t wwwroot.zip

8、把/home目录下面wwwroot.zip里面的所有文件解压到第一级目录
unzip -j wwwroot.zip

```

### 测试能否访问网络或者某个网页
```
curl http://www.baidu.com/index.html
```

### linux 各个发行版的关系
![linux version difference](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/linux-version-difference.jpg "linux version difference")



## 服务管理

#### 服务与端口
```
/etc/services
//这个文件记录了端口与服务的映射关系
```
### netstat -tlunp
查看所有的服务

* -t 列出tcp 数据
* -u 列出udp 数据
* -l 列出正在监听的网络服务（不包含已经连接的网络服务）
* -n 用端口号来显示服务，而不是用服务名
* -p 列出该服务的进程ID(PID)

查看80端口的使用的情况
```
lsof -i tcp:80


查看 10020 端口状态
lsof -i:10020

COMMAND   PID USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
node    58954 leon   22u  IPv6 9275377      0t0  TCP *:10020 (LISTEN)

杀掉10020对应的进程 PID(58954),因此10020端口就free了
kill -9 58954


对于windows
查看指定端口的占用情况，并找到其pid
netstat -aon|findstr "8080"

直接强制杀死指定端口
taskkill /pid 4136 -t -f
```

### pkill命令
根据进程名kill进程
```
pkill nginx
```

### 查看所有端口情况
```
lsof -i -P | grep -i 'listen'
```

### netstat -an
查看已经连接的服务

### Linux 服务
![Linux 服务](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/linuxServiceType.PNG "optional title")
RPM包安装服务的默认位置
文件位置 | 服务
------------ | -------------
/etc/init.d/ | 启动脚本位置
/etc/sysconfig/|初始化环境配置文件位置
/etc/|配置文件位置
/etc/xinetd.conf|xinetd配置文件
/etc/xinetd.d/|基于xinetd服务的
/var/lib/|服务产生的数据
/var/log/|日志

![Linux 服务](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/linuxServiceManage.PNG "optional title")
#### 独立服务的启动 （RPM包）
```
/etc/init.d/独立服务名
start| stop|status|restart

service 独立服务名
start| stop|status|restart

独立服务的自启动 设置
chkconfig --level 2345 httpd on
将 httpd(apache)服务 在2345运行级别时，设为自启动

或者修改文件 /etc/rc.local 文件，加上想启动的服务，如
/etc/init.d/httpd start
这样httpd 服务开机时就会自启动

```
#### 基于xinetd服务 （RPM包）
```
yum -y install xinetd
//先安装xinetd 服务

修改某个服务如rsync的启动
vi /etc/xinetd.d/rsync
把里面设置为 disable = no 就启动
      设置为 disable = yes 就不启动

然后重启 xinted 服务
service xinted restart

xinetd 服务启动和自启动是一体的，也就是说你把它启动了，他同时也会变成自启动
你把他设为自启动，他同时也启动了

xinetd 服务已越来越少了
```
### 源码包安装服务的启动
使用绝对路径，调用启动脚本来启动，如：
```
/usr/local/apache2/bin/apachectl start|stop
```
### 源码包安装服务的自启动
一般装在 /usr/local/下
```
修改 /etc/rc.d/rc.local （软连接同/etc/rc.local）
如 vi /etc/rc.d/rc.local
然后加入某个服务的启动脚本如：
/usr/local/apache2/bin/apachectl start
```
#### 让源码包服务被服务管理命令识别
方法建立软连接，如让源码包的apache服务能被service命令管理启动
```
ln -s /usr/local/apache2/bin/apachectl /etc/init.d/apache
```

```
chkconfig --list
//查看所有服务在不同运行级别下的自启动状态

chkconfig --list | grep httpd
只查看httpd 的自启动状态

chkconfig --level 2345 httpd off
将httpd的2345 级别的自启动关闭

grep rsync /etc/services
在services 里查看rsync
```
缩写 | 含义
------------ | -------------
usr | Unix System Resource（Unix 系统资源）
Content column 1 | Content column 2
Content column 1 | Content column 2
Content column 1 | Content column 2

### 查看磁盘还剩多少空间
```
df -h 
```


### 常用查看系统、资源、服务、用户等命令

#### 进程
```
ps -ef   # 查看所有进程 
top    # 实时显示进程状态
```

```
1.CPU占用最多的前10个进程
ps auxw|head -1;ps auxw|sort -rn -k3|head -10

2.内存消耗最多的前10个进程 
ps auxw|head -1;ps auxw|sort -rn -k4|head -10 

3.虚拟内存使用最多的前10个进程 
ps auxw|head -1;ps auxw|sort -rn -k5|head -10
```

#### 查看 nginx 的位置
```
// 查看 nginx 的位置
// 如果程序在运行中
ps -ef | grep nginx

//如果程序并没有运行
whereis nginx
```

#### free命令是一个快速查看内存使用情况的方法
```
free -h
```


### rpm(Redhat Linux Packet Manager)
rpm包的安装：
1.安装一个包
```
rpm -ivh rpm包名
如：
rpm -ivh apache-1.3.6.i386.rpm 
```
2.升级一个包，没安装过的不能使用升级命令
```
rpm -Uvh
```
3.移走一个包
```
rpm -e
```

### 运行级别
运行级别 | 含义
------------ | -------------
0 | 关机
1 | 单用户模式，可以想象为windows的安全模式，主要用于系统修复
2 | 不完全的命令行模式，不含NFS服务
3 | 完全的命令行模式，就是标准的字符界面
4 | 系统保留
5 | 图形模式
6 | 重启动

#### 查看运行级别 runlevel
```
runlevel
N 5
//表示现在级别是5，也就是图形模式，N表示进入5级别之前的级别,N表示没有，也就是开机后就到了5级别，图形模式
```


### Linux 文件基本属性
Linux系统是一种典型的多用户系统，不同的用户处于不同的地位，拥有不同的权限。为了保护系统的安全性，Linux系统对不同的用户访问同一文件（包括目录文件）的权限做了不同的规定。

### ls –l
命令来显示一个文件的属性以及文件所属的用户和组
```
[root@www /]# ls -l
total 64
dr-xr-xr-x   2 root root 4096 Dec 14  2012 bin
dr-xr-xr-x   4 root root 4096 Apr 19  2012 boot


ls -lh
//可以友好地显示文件大小, gives human readable file sizes, long format.
```

Linux中第一个字符代表这个文件是目录、文件或链接文件等等。

当为[ d ]则是目录;
当为[ - ]则是文件

接下来的字符中，以三个为一组，且均为『rwx』 的三个参数的组合。其中，[ r ]代表可读(read)、[ w ]代表可写(write)、[ x ]代表可执行(execute)。 要注意的是，这三个权限的位置不会改变，如果没有权限，就会出现减号[ - ]而已。
![Linux document property permission](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/linux_directory_property.png "Linux document property permission")

### 删除隐藏文件
```
rm -fr .*
(删除当前目录下的所有隐藏文件)


```
### Linux查看文件和文件夹大小
```
//查看目前所有文件系统的可用空间及使用情形
df -h

//查看文件或文件夹的磁盘使用空间
du -h --max-depth=1 your_dest_dir
//调节--max-depth参数，用来控制你想要查看的目录的深度, 
//--max-depth=1 your_dest_dir 只会返回目标文件夹和目标文件夹下首层文件夹的大小，不会返回更深层的文件夹的大小，也不会返回文件的大小。


//要还想返回目标文件夹下首层的文件大小，可以使用下述命令：
du -h --max-depth=0 your_dest_dir/*
//它不仅返回了首层的文件夹大小，也返回了首层的文件大小
```

### 更改文件属性
#### chgrp：更改文件属组
```
chgrp [-R] 属组名 文件名

-R：递归更改文件属组，就是在更改某个目录文件的属组时，如果加上-R的参数，那么该目录下的所有文件的属组都会更改。
```

#### chown：更改文件属主，也可以同时更改文件属组
```
chown [–R] 属主名 文件名
chown [-R] 属主名：属组名 文件名
```

#### chmod：更改文件9个属性
```
每种身份(owner/group/others)各自的三个权限(r/w/x)分数是需要累加的，例如当权限为： [-rwxrwx---] 分数则是：

owner = rwx = 4+2+1 = 7
group = rwx = 4+2+1 = 7
others= --- = 0+0+0 = 0
所以等一下我们设定权限的变更时，该文件的权限数字就是770啦！变更权限的指令chmod的语法是这样的

 chmod [-R] xyz 文件或目录

 xyz : 就是刚刚提到的数字类型的权限属性，为 rwx 属性数值的相加。

eg:要将.bashrc这个文件所有的权限都设定启用
chmod 777 .bashrc

// 将cc.av 的用户（u）加上（+）可执行（x）权限
chmod u+x cc.av

//将bb.av 的组（g）和 其他用户（o）都加上写（w）的权限
chmod g+w,o+w bb.av


//所有用户（a），都将赋予对dd.av 的读写执行权限
chmod a=rwx dd.av
```
##### 符号类型改变文件权限
```
还有一个改变权限的方法呦！从之前的介绍中我们可以发现，基本上就九个权限分别是(1)user (2)group (3)others三种身份啦！ 那么我们就可以藉由u, g, o来代表三种身份的权限！

此外， a 则代表 all 亦即全部的身份！那么读写的权限就可以写成r, w, x！也就是可以使用底下的方式来看：

```
![linux_chmod](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/linux_chmod.PNG "linux_chmod")

#### 如果我们需要将文件权限设置为 -rwxr-xr-- ，可以使用 chmod u=rwx,g=rx,o=r 文件名 来设定:
```
#  touch test1    // 创建 test1 文件
# ls -al test1    // 查看 test1 默认权限
-rw-r--r-- 1 root root 0 Nov 15 10:32 test1
# chmod u=rwx,g=rx,o=r  test1    // 修改 test1 权限
# ls -al test1
-rwxr-xr-- 1 root root 0 Nov 15 10:32 test1
```
##### 而如果是要将权限去掉而不改变其他已存在的权限呢？例如要拿掉全部人的可执行权限，则：
```
#  chmod  a-x test1
# ls -al test1
-rw-r--r-- 1 root root 0 Nov 15 10:32 test1

a 表示所有用户，-表示减去什么权限，x表示执行权限
```

### 查看文件内容
```
cat 文件名

//加上文件行数查看
cat -n 文件名

```

### Linux 用户和用户组管理
```
cat /etc/passwd 
//可以查看所有用户的列表

w 
//可以查看当前活跃的用户列表

cat /etc/group 
//查看用户组


groups 
//查看当前登录用户的组内成员

groups gliethttp 
//查看gliethttp用户所在的组,以及组内成员

whoami 
//查看当前登录用户名

cat /etc/passwd|grep -v nologin|grep -v halt|grep -v shutdown|awk -F":" '{ print $1"|"$3"|"$4 }'|more
//一个简明的layout命令


useradd
//添加用户
eg：
useradd name1
//会自动创建用户家目录/home/name1
//此时此用户的用户名和所属组分别为name1 : name1


//修改 name1 用户的password
passwd name1


//将name1的所属组设置为root
//修改完毕，现在可以用name1帐号登录，然后用命令 su - ，即可获得root权限进行操作。
//此时此用户的用户名和所属组分别为name1 : root

usermod -g root name1

//另外要使 name1 有 root 权限还需要
切换到root用户，运行visudo命令
在打开的配置文件中，找到root ALL=(ALL) ALL，
在下面添加一行
xxx ALL=(ALL) ALL 
其中xxx是你要加入的用户名称，这里是name1
输入:wq保存并退出配置文件，改动立即生效


```
### 切换用户
```
su为switch user，即切换用户的简写
su [user_name]  || su - [user_name]
eg:
su centos


// su - 与su 区别
su - USERNAME切换用户后，同时切换到新用户的工作环境中

su USERNAME切换用户后，不改变原用户的工作目录，及其他环境变量目录



su 如果不指定USERNAME（用户名），默认即为root
所以切换到root的身份的命令即为：
su -root或是直接 su -

通过命令exit或logout，或者是快捷键Ctrl+D即可返回原用户身份


sudo

使用su切换用户时需知晓对应用户的登陆密码，即若切换成root用户身份，需知道root用户的登陆密码。
作为root用户管理员，如何授权其他普通用户，在不需要知晓root密码的情况下，执行root权限的命令操作？此时即可使用sudo。

sudo是一种权限管理机制，依赖于/etc/sudoers，其定义了授权给哪个用户可以以管理员的身份能够执行什么样的管理命令；

格式：sudo -u USERNAME COMMAND

默认情况下，系统只有root用户可以执行sudo命令。需要root用户通过使用visudo命令编辑sudo的配置文件/etc/sudoers，才可以授权其他普通用户执行sudo命令。

```


## lets encript 

#### nginx
```
 location ~ /.well-known {
      allow all;
}

# Pass requests for / to localhost:5000:
location / {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-NginX-Proxy true;
      proxy_pass http://localhost:5000/;
      proxy_ssl_session_reuse off;
      proxy_set_header Host $http_host;
      proxy_cache_bypass $http_upgrade;
      proxy_redirect off;
}
```
#### apache
```
//在相应站点的配置文件里，如 autopostapi.ahotech.xyz.conf
的80 和 443 配置里面都加上
<Directory /.well-known/acme-challenge/ >
     Order Deny,Allow
     Allow from All
</Directory>

//配置(node.js)代理
<Location />
  ProxyPass http://127.0.0.1:1340/
  ProxyPassReverse http://127.0.0.1:1340/
</Location>
```


### ubuntu add samba

```
1.Start by updating the apt packages index:

sudo apt update


2.Install the Samba package with the following command:
sudo apt install samba

3.Once the installation is completed, the Samba service will start automatically. To check whether the Samba server is running, type:
sudo systemctl status nmbd


4.创建一个用于分享的samba目录。 
sudo mkdir /home/linuxidc/linuxidc.com/share

5.给创建的这个目录设置权限 
sudo chmod 777 /home/linuxidc/linuxidc.com/share

添加用户(下面的anthony是我的用户名，之后会需要设置samba的密码)。 
sudo smbpasswd -a anthony



sudo cat /etc/samba/smb.conf



sudo vim /etc/samba/smb.conf

在配置文件smb.conf的最后添加下面的内容：
[august_project]
path=/home/anthony/august_project
public = yes
create mask = 0777
directory mask = 0777
available = yes
browseable = yes
comment = Shared Folder require password
valid users = anthony
force user = anthony
writable = yes

重启
sudo service smbd restart
or
/etc/init.d/smbd restart
```

### find
```
find [目录] 条件(目录不指定默认是当前目录)

选项:
-name:通过名称搜索，不仅仅只是文件名
-size：通过大小搜索：不仅仅只是文件大小
-type：通过文件类型搜索
-maxdepth：指定搜索层级，可配合其他一起使用




eg:
找的所在目录下所有 文件 类型的，大小为 2809856 bytes 的文件并删除

find . -type 'f' -size 2809856c -delete

-size -160k
表示小于 160 kilobytes
-size  +160k 
表示 大于 160 kilobytes
-size 160k 
表示 等于 160 kilobytes

如果文件单位是 bytes，则在数字后面加上c， 如文件大小 160 bytes
-size 160c

use case:

//Find Files Using Name in Current Directory
//Find all the files whose name is tecmint.txt in a current working directory.
find . -name tecmint.txt

//Find all the files under /home directory with name tecmint.txt.
find /home -name tecmint.txt

//Find Files Using Name and Ignoring Case
//Find all the files whose name is tecmint.txt and contains both capital and small letters in /home directory.
find /home -iname tecmint.txt

//Find Directories Using Name
//Find all directories whose name is Tecmint in / directory.
find / -type d -name Tecmint

//Find all PHP Files in Directory
find . -type f -name "*.php"
```


#### 什么是serverless
```
Serverless computing is a cloud computing execution model in which the cloud provider runs the server, and dynamically manages the allocation of machine resources. Pricing is based on the actual amount of resources consumed by an application, rather than on pre-purchased units of capacity
```


### wget
```
By default, wget downloads files in the current working directory where it is run.

wget https://wordpress.org/latest.zip


指的下载位置
-P or --directory-prefix

wget https://wordpress.org/latest.zip -P cable.90m.top
```


### 如何开放 Linux 端口，以便公网访问

#### 云平台服务器要参考云平台的端口开放流程


#### iptable 的配置
```
//查看 iptables 运行状态
service iptables status


// 查看具体端口配置
iptables -nL --line-number



//将端口 8001添加到安全组
iptables -A INPUT -ptcp --dport 8001 -j ACCEPT


//保存 iptables 配置
service iptables save


删除某一个端口规则，比如8080端口
// 先使用命令查看具体端口（8080）配置的位置
iptables -nL --line-number

比如在第4行，下面命令就删除了8080端口的开发
iptables -D INPUT 4


//卸载 (oneinstack自带的和新安装的iptables-services )
yum remove iptables 

yum remove　iptables-services 
```



### localhost，127.0.0.1， 0.0.0.0，本机IP 的区别
```
localhost 是一个域名，在过去它指向 127.0.0.1 这个IP地址。在操作系统支持 ipv6 后，它同时还指向ipv6 的地址 [::1]

127.0.0.1 这个地址通常分配给 loopback 接口。loopback 是一个特殊的网络接口(可理解成虚拟网卡)，用于本机中各个应用之间的网络交互。只要操作系统的网络组件是正常的，loopback 就能工作。

本机IP，确切地说，“本机地址”并不是一个规范的名词。通常情况下，指的是“本机物理网卡所绑定的网络协议地址”。比如IPv4 或者IPv6地址

在服务器中，0.0.0.0指的是本机上的所有IPV4地址，，如果我绑定的端口指定了0.0.0.0，那么通过内网地址或外网地址都可以访问我的应用。但是如果我只绑定了内网地址，那么通过外网地址就不能访问
```

## scp 本地与远程直接copy 文件
```
scp [-1246BCpqrv] [-c cipher] [-F ssh_config] [-i identity_file]
[-l limit] [-o ssh_option] [-P port] [-S program]
[[user@]host1:]file1 [...] [[user@]host2:]file2
```
Linux scp 命令用于 Linux 之间复制文件和目录。  
scp 是 secure copy 的缩写, scp 是 linux 系统下基于 ssh 登陆进行安全的远程文件拷贝命令。  
scp 是加密的，rcp 是不加密的，scp 是 rcp 的加强版。  

### 将本地文件复制到远程服务器
```
scp local_file remote_username@remote_ip:remote_folder

example:
将本地 /Users/luxingchao 下的 a.txt 复制到远程 47.240.**.15 服务器的 /root/dest_folder 目录下
scp /Users/luxingchao/a.txt root@47.240.**.15:/root/dest_folder

```
#### 复制本地目录到远程服务器
复制目录命令格式： 
```
scp -r local_folder remote_username@remote_ip:remote_folder 

example:
将本地 test_folder 复制到远程 /root/dest_folder 目录下
scp -r /Users/luxingchao/test_folder root@47.240.**.15:/root/dest_folder
```

#### 将本地 test_folder文件夹下的所有文件 复制到远程 /root/dest_folder_b 目录下
```
scp -r /Users/luxingchao/test_folder/* root@47.240.**.15:/root/dest_folder_b
```

#### -i 从指定文件中读取传输时使用的密钥文件
```
scp -i /Users/luxingchao/aws/ls-su-us-west-2.pem /Users/luxingchao/a.txt centos@54.218.**.214:/tmp

注意： 必须上传到服务器的 /tmp 这个路径下，因为只有这个路径有写入权限，可以上传之后移动你的文件到你需要的指定目录
```

### 从远程复制到本地
```
//复制文件
//将远程的 /root/dest_folder/a.txt 移动到 本地/Users/luxingchao/test_folder 下
scp root@47.240.**.15:/root/dest_folder/a.txt /Users/luxingchao/test_folder

//复制目录
//将远程的 /root/dest_folder (包含 dest_folder本身) 移动到 本地/Users/luxingchao/test_folder 下
scp -r root@47.240.**.15:/root/dest_folder/ /Users/luxingchao/test_folder


// -i 复制时从指定文件中读取传输时使用的密钥文件
scp -i /Users/luxingchao/aws/ls-su-us-west-2.pem centos@54.218.*.214:/tmp/a.txt /Users/luxingchao/test_folder

scp -i /Users/luxingchao/aws/ls-su-us-west-2.pem centos@54.218.*.214:/data/mongodata/ab.txt /Users/luxingchao/
```


### scp 配置代理
scp 使用 Secure copy protocol  
scp based on the Secure Shell protocol(SSH)  

在家目录下的.ssh 目录下编辑 config 文件， 没有就新建  
里面加上这个内容，表示代理 GitHub ssh 协议 的流量
```
Host github.com
   HostName github.com
   User git
   # 走 HTTP 代理
   # ProxyCommand socat - PROXY:127.0.0.1:%h:%p,proxyport=7890
   # 走 socks5 代理（如 Shadowsocks）
   ProxyCommand nc -v -x 127.0.0.1:7890 %h %p
Host 54.218.*.214
   HostName 54.218.*.214
   User git
   # 走 HTTP 代理
   # ProxyCommand socat - PROXY:127.0.0.1:%h:%p,proxyport=7890
   # 走 socks5 代理（如 Shadowsocks）
   ProxyCommand nc -v -x 127.0.0.1:7890 %h %p
```


### rz 命令
```
//安装rz sz 命令
yum install lrzsz


rz命令本地上传文件到服务器
eg:
rz 
//会打开选择文件对话框

sz命令发送文件到本地
eg:
sz filename
```