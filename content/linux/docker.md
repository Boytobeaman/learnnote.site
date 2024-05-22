---
title: "docker 常用快捷键"
metaTitle: "docker 常用快捷键, docker面试"
metaDescription: "docker 常用快捷键, docker面试, docker 启动 容器"
---

### 基本概念
* 镜像（Image）
* 容器（Container）
* 仓库（Repository）

```
镜像（ Image ）和容器（ Container ）的关系，就像是面向对象程序设计中的
类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被
创建、启动、停止、删除、暂停等。

按照 Docker 最佳实践的要求，容器不应该向其存储层内写入任何数据，容器存储
层要保持无状态化。所有的文件写入操作，都应该使用 数据卷（Volume）、或者
绑定宿主目录，在这些位置的读写会跳过容器存储层，直接对宿主（或网络存储）
发生读写，其性能和稳定性更高。

数据卷的生存周期独立于容器，容器消亡，数据卷不会消亡。因此，使用数据卷
后，容器删除或者重新运行之后，数据却不会丢失。
```

#### Docker Registry
```
Docker Registry 就是 集中的存储、分发镜像的服务

一个 Docker Registry 中可以包含多个仓库（ Repository ）；每个仓库可以包含多个标签（ Tag ）；每个标签对应一个镜像。

我们可以通过 <仓库名>:<标签> 的格式来指定具体是这个软件哪个版
本的镜像。如果不给出标签，将以 latest 作为默认标签。

最常使用的 Registry 公开服务是官方的 Docker Hub，这也是默认的 Registry，并
拥有大量的高质量的官方镜像。
```

### Docker and virtual machine comparison
![Alt Text](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/docker-vm-compare.jpg)

### 安装 Docker
Docker 分为 CE 和 EE 两大版本。CE 即社区版（免费，支持周期 7 个月），EE
即企业版，强调安全，付费使用，支持周期 24 个月。

Docker CE 分为 stable, test, 和 nightly 三个更新频道。每六个月发布一个 stable
版本 (18.09, 19.03, 19.09...)。

官网安装指南： https://docs.docker.com/install/


### 运行

```
docker run -it --rm \
ubuntu:16.04 \
bash
```
我们可以通过 exit 退出了这个容器

#### 进入容器
```
docker exec -it <container_name|container_id> /bin/bash

eg:
docker exec -it mymysql /bin/bash
docker exec -it 8d07b861dedc /bin/bash

exit
推出容器
```

### 获取镜像
```
docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]

docker pull ubuntu:16.04

上面的命令中没有给出 Docker 镜像仓库地址，因此将会从 Docker Hub 获取镜
像。而镜像名称是 ubuntu:16.04 ，因此将会获取官方镜像 library/ubuntu
仓库中标签为 16.04 的镜像。
```

### 查看镜像、容器、数据卷所占用的空间
```
docker system df
```

常用命令



查看docker 版本
```
docker version
```

获取image
```
docker pull
```

创建image
```
docker build

docker build [选项] <上下文路径/URL/->

docker build --tag=friendlyhello .

$ docker image ls

REPOSITORY            TAG                 IMAGE ID
friendlyhello         latest              326387cea398

the tag defaulted to latest. 
The full syntax for the tag option would be something like
--tag=friendlyhello:v0.0.1

镜像推送

```
#### Share your image
```
1.login

docker login
//input your username and password

2.Tag the image
docker tag image username/repository:tag

ex:
docker tag friendlyhello anthonylxc/get-started:part1

3.Publish the image
docker push username/repository:tag

//If you don't specify a tag, Docker will use a tag called latest

ex:
docker push anthonylxc/get-started:part1

4.Pull and run the image from the remote repository
From now on, you can use docker run and run your app on any machine with this command:
docker run -p 4000:80 username/repository:tag

ex:
docker run -p 4000:80 anthonylxc/get-started:part1
```
#### Create a volume 
```
docker volume create

eg:
docker volume create todo-db


新建的数据卷会放到默认宿主文件夹下
/var/lib/docker/volumes

```

#### 删除数据卷
```
docker volume rm [OPTIONS] VOLUME [VOLUME...]

eg:
docker volume rm todo-db
```


#### volumn 类型

```
命名数据卷 named volume

docker-compose.yaml

version: '3',
services:
  mongodb:
    image:mongo
    ports:
      - 27017:27017
    volumns:
      -db-data:/var/lib/mysql/data
  mongo-express:
    image:mongo-express
    ...
volumns:
  db-data


这里的 db-data 就是命名的数据卷
volumns:
  db-data
```


列出image
```
docker images
```
### docker 启动 容器

运行 container
```
docker run

eg:
docker run -p 3306:3306 --name mymysql -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.6

// 端口映射
-p {HOST_PORT}:{CONTAINER_PORT}
-p 3306:3306
将宿主机的3306 端口和container 的3306 端口作映射

//挂存储卷
-v /home/mysql/data:/var/lib/mysql

将宿主机的 /home/mysql/data 目录和 container 的 /var/lib/mysql 作映射，将数据保存在宿主机的/home/mysql/data 里，重启container后数据不丢失

//设置环境变量
-e MYSQL_ROOT_PASSWORD=123456

--detach , -d
//Run container in background and print container ID
```

列出container
```
docker ps
// 查看正在运行中的container
// container 是运行的images

docker ps -a
// 查看所有的container，包括停止的
```
查看container日志
```
docker logs -f <container_id|container_name>

eg:
docker logs -f 8d07b861dedc
docker logs -f mymysql


// 有时日志内容很多，你只想看到最新的 100条，并动态刷新
docker logs -f 242e94beff4d --tail 100
```
停止container
```
docker stop <container_id|container_name>

eg:
docker stop 8d07b861dedc
docker stop mymysql
```
重启container
```
docker restart 容器ID或容器名 ：不管容器是否启动，直接重启容器 



Restart all running containers:
docker restart $(docker ps -q)

```

删除container
```
docker rm
```

删除image
```
docker rmi image_id

eg：
docker rmi e445ab08b2be
```

在host 和container之间拷贝文件
```
docker cp
```

保存改动为新的image
```
docker commit
```

镜像登陆
```
docker login

```

#### Dockerfile
Define a container with Dockerfile

Command | Meaning
------------ | -------------
FROM | base image
RUN | 执行命令
ADD | 添加文件
COPY | 拷贝文件到容器
CMD | 执行命令
EXPOSE | 暴露端口
WORKDIR | 指定路径 Set the working directory
MAINTAINER | 维护者
ENV | 设置环境变量
ENTRYPOINT | 容器入口
USER | 指定用户
VOLUME | mount point


#### COPY 命令
```
eg:
COPY src /app/


copy src 文件夹下的所有文件到 /app/ 下，不包含src这个文件夹，
如：src 下有一个文件 index.js

最终到container 里面结构是
app
  index.js
```

### K8S
就是基于容器的集群管理平台，它的全称，是kubernetes。

```
一个K8S系统，通常称为一个K8S集群（Cluster）

这个集群主要包括两个部分：

一个Master节点（主节点）
一群Node节点（计算节点）
```
![Alt Text](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/k8s-master-slave-node.jpg)

```
Master节点主要还是负责管理和控制。Node节点是工作负载节点，里面是具体的容器。
```

#### k8s Master节点
![Alt Text](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/k8s-master-node.jpg)
```
Master节点包括API Server、Scheduler、Controller manager、etcd。

API Server是整个系统的对外接口，供客户端和其它组件调用，相当于“营业厅”。

Scheduler负责对集群内部的资源进行调度，相当于“调度室”。

Controller manager负责管理控制器，相当于“大总管”。

```

#### k8s node 节点
![Alt Text](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/k8s-node.jpg)

```
Pod是Kubernetes最基本的操作单元。一个Pod代表着集群中运行的一个进程，它内部封装了一个或多个紧密相关的容器。除了Pod之外，K8S还有一个Service的概念，一个Service可以看作一组提供相同服务的Pod的对外访问接口。

Docker，不用说了，创建容器的。

Kubelet，主要负责监视指派到它所在Node上的Pod，包括创建、修改、监控、删除等。

Kube-proxy，主要负责为Pod对象提供代理。

Fluentd，主要负责日志收集、存储与查询。
```



### Docker Compose

#### linux 下docker compose 不会随着docker 一起安装需要单独安装
```
https://docs.docker.com/compose/install/
```
***
```
Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration.

Docker compose is used for starting containers on the same host
```
#### Using Compose is basically a three-step process:
```
1.Define your app’s environment with a Dockerfile so it can be reproduced anywhere.

2.Define the services that make up your app in docker-compose.yml so they can be run together in an isolated environment.

3.Run docker-compose up and Compose starts and runs your entire app.


docker compose up -d
//If you want to run your services in the background, you can pass the -d flag (for “detached” mode) 

docker compose ps
//to see what is currently running

docker compose run
//allows you to run one-off commands for your services
//For example, to see what environment variables are available to the web service:
//docker-compose run web env

docker compose down
//Stop the application, either by running docker-compose down from within your project directory in the second terminal, or by hitting CTRL+C in the original terminal where you started the app.



docker compose down --volumes
//tear everything down

重启：
docker-compose restart
```

### A docker-compose.yml looks like this:
```
version: '3'
services:
  web:
    build: .
    ports:
    - "5000:5000"
    volumes:
    - .:/code
    - logvolume01:/var/log
    links:
    - redis
  redis:
    image: redis
volumes:
  logvolume01: {}
```

Compose has commands for managing the whole lifecycle of your application:
```
Start, stop, and rebuild services
View the status of running services
Stream the log output of running services
Run a one-off command on a service
```

#### Docker Swarm:
```
Docker swarm is for running and connecting containers on multiple hosts. Docker swarm is a container cluster management and orchestration tool. It manages containers running on multiple hosts and does things like scaling, starting a new container when one crashes, networking containers.
```

#### Kubernetes:
```
A container orchestration tool developed by Google. Kubernetes goal is very similar as that for Docker swarm.
```

安装docker (centos)
```
https://docs.docker.com/install/linux/docker-ce/centos/
```
安装docker (utuntu)
```
apt-get update
apt-get install -y docker.io
```

安装docker (shell 脚本，通用方法)
```
sudo wget -qO- https://get.docker.com |sh
```
启动并加入开机启动
```
sudo systemctl start docker
sudo systemctl enable docker
```




