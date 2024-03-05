---
title: "pm2 常用快捷键"
metaTitle: "pm2 常用快捷键, how to run node js with pm2"
metaDescription: "pm2 常用快捷键, how to run node js with pm2"
---

#### 设置服务器重启时自动启动
```
pm2 startup
```


### pm2 管理node项目

```
step1:install pm2

npm install pm2@latest -g


step2:常用命令 项目名称以ORION为例

//首次启动
pm2 start app.js --name ORION

//以后再启动
pm2 start ORION

//重启
pm2 restart ORION

//关闭
pm2 stop ORION

//查看所有的项目
pm2 list

//stop all processes
pm2 stop all

// restart all processes
pm2 restart all




启动某个script 如： pm2-start-prod
pm2 start "npm run pm2-start-prod" --name backend-prod


// pm2 启动 npm start
pm2 start npm --name "Your APP Name" -- start

eg:
pm2 start npm --name "sms-processor" -- start



//pm2 启动package.json 里面的 develop
pm2 start npm --name "project-name" -- run develop


pm2 启动package.json 里面 名为littleAppleBot 的script
pm2 start --name "app_name" npm -- run littleAppleBot --

eg:
pm2 start --name "mp" npm -- run develop --


指定环境变量

NODE_ENV=production pm2 start server.js --name api
eg：
PORT=28004 pm2 start --name "strapi-blog-28004" npm -- run develop --

// .sh 文件没法执行，需要给权限
chmod +x ./test.sh



pm2 启动 python脚本
pm2 start main.py --interpreter /usr/local/bin/python3.7 --name proxy_pool



也可以使用 ecosystem.config.js 启动项目

使用  
pm2 init simple 
创建ecosystem.config.js 文件


配置案例
module.exports = {
  apps : [{
    name   : "app1",
    script : "./app.js",
    ignore_watch: ["node_modules", "output", "temp","download", "\\.git", "*.log"],
    env_production: {
       NODE_ENV: "production"
    },
    env_development: {
       NODE_ENV: "development"
    }
  }]
}

pm2 start ecosystem.config.js --only api-app

// 开启watch
pm2 start ecosystem.config.js --only api-app --watch

```
### Auto restart apps on file change
```
// 加上 --watch
pm2 start app.js --watch
```

### pm2 日志管理
```
default log location ~/.pm2/logs


https://github.com/keymetrics/pm2-logrotate#configure

pm2 install pm2-logrotate

// force rotate every minute
pm2 set pm2-logrotate:rotateInterval '*/1 * * * *'

// rotate every 1K (1KB)
pm2 set pm2-logrotate:max_size 1K

// 设置保留的文件个数，默认30个
pm2 set pm2-logrotate:retain 300


// 查看已有的配置
pm2 config pm2-logrotate

if you want to specify the log location
pm2 start npm --name "sms-processor" -o '/Users/anthony.lu/project/logs/sms-processor-out.log' -e '/Users/anthony.lu/project/logs/sms-processor-error.log' -- start


// 删除日志
pm2 flush # Clear all the logs

// See logs of one project
pm2 logs 'project-name'

// 或者使用项目id
pm2 logs -1


// 查看 1000 行
pm2 logs appName --lines 1000


// 仅查看 错误信息
pm2 logs appName --err --lines=100

```


### 删除、保存、重启某个项目,
```
//删除某个项目
pm2 delete ORIO

//remove all processes
pm2 delete all


//Saving current process list
pm2 save

//This brings back previously saved processes
pm2 resurrect

//Generating a startup script(开机重启)
pm2 startup

//Remove init script via
pm2 unstartup systemd

```