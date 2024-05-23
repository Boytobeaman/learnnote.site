---
title: "nginx 教程"
metaTitle: "nginx 常用命令，nginx 教程"
metaDescription: "nginx 常用命令，nginx 教程"
---

### 安装nginx
```
// 一键安装脚本
wget http://nginx.org/download/nginx-1.12.2.tar.gz && tar zxvf nginx-1.12.2.tar.gz && cd nginx-1.12.2 && ./configure && make && make install && ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx
```
### 常用命令
```
启动：
nginx

重载加载配置：
nginx -s reload


//查看nginx监听的端口是否存在
netstat -tlnup|grep nginx


关闭nginx服务器
pkill -9 nginx 
```


#### 配置文件
```
vim /usr/local/nginx/conf/nginx.conf

vim /usr/local/nginx/conf/vhost/www.movingbox.cn.conf

```



```
location / {
  proxy_pass http://127.0.0.1:3100;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto https;
  proxy_connect_timeout       300; #注意这里几个配置决定了API的timeout时间
  proxy_send_timeout          300;
  proxy_read_timeout          300;
  send_timeout                300;
}


location /demo/ {
      proxy_pass http://127.0.0.1:3101;
      proxy_http_version 1.1;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto https;
  }
```

### hide etag
```
server {
	  listen 80;
	  listen 443 ssl http2;

	  proxy_hide_header etag;
	  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
	}
```


### mac linux
```
// 使用brew下载nginx
brew install nginx


// nginx地址
/usr/local/etc/nginx

// 查看nginx配置有木有生效
//Locate the nginx.conf file my nginx is actually using
nginx -t

// 查看nginx所有的配置
nginx -T 
```

### Ngnix Location的匹配顺序
```
对于每个请求来说,nginx 会选择最匹配的一个 location 来处理这个请求,nginx 其实就是通过对比这些 location 规则来选择一个 location,对比的顺序可以总结为:

1.首先匹配前缀匹配(没有 RE 表达式),针对当前这个请求,每个前缀匹配都匹配一遍.
2.搜索=匹配,如果当前请求匹配上了,搜索将会停止,直接使用这个这个 location.
3.如果第二步没有匹配上,nginx 会按照如下步骤继续搜索最长前缀匹配:
3.1 如果最长前缀匹配有^~这个modifier,nginx 会停止搜索并直接使用这个 location.
3.2 如果没有使用 ^~,暂存这个 location并且继续搜索.
4.只要最长前缀匹配被暂存和选中,nginx 就会看当前的 location 是否有大小写敏感的 RE(~和~*),第一个匹配上这种会被当做有效的 location来处理这个请求.
5.如果没有 RE 的 location 匹配上,前面暂存的 location 就会被选中来处理这个请求.

```
#### 举例
```
修饰符
 =  ：精确匹配（必须全部相等）
 ~  ：大小写敏感（正则表达式）
 ~* ：忽略大小写（正则表达式），这里要注意忽略大小写的意思是请求的字符大小写都可以，
 但是不会进行大小转换，请求的大小写对应的文件必须存在。
 ^~ ：只需匹配uri部分
 @  ：内部服务跳转


location  = / {
  #  只处理请求 /.
}

location  / {  
  # 匹配任何请求，因为所有请求都是以"/"开始  
  # 但是更长字符匹配或者正则表达式匹配会优先匹配  
  [ configuration B ]   
} 

location /data/ {
  # 所有以 /data/ 匹配,但是还会继续搜索.
  # 如果没有其他 location 匹配上,就用这个处理请求.
}

location ^~ /img/ {
  # 所有以 /img/ 开头的请求并且会停止搜索.
}

location ~* .(png|gif|ico|jpg|jpeg)$ {
  # 以png, gif, ico, jpg ,jpeg结尾的请求. 
  # 如果请求是到 /img/ 路径的话 还是会被上面👆的 location 处理
}

如何防止图片盗链:
location ~ .(png|gif|jpe?g)$ {
  valid_referers none blocked yourwebsite.io *.yourwebsite.io;
  if ($invalid_referer) {
    return   403;
  }
}

在可写权限的目录禁止脚本:
location ~* /(media|images|cache|tmp|logs)/.*.(php|jsp|pl|py|asp|cgi|sh)$ {
  return 403;
}
```

### Redirecting from a Former Name to the Current Name
```
server {
  listen 80;
  listen 443 ssl;
  server_name www.old-name.com old-name.com;
  return 301 $scheme://www.new-name.com$request_uri;
}
```
### Forcing all Requests to Use SSL/TLS
```
server {
    listen 80;
    server_name www.domain.com;
    return 301 https://www.domain.com$request_uri;
}
```

### 一个简单的 302 案例
```
rewrite ^/oldlocation$ http://www.newdomain.com/newlocation redirect;
```


### 一个简单的 301 案例
```
rewrite ^/oldlocation$ http://www.newdomain.com/newlocation permanent;

eg: joinplastic.com 跳转配置
rewrite ^/products/palletBox/palletBox.php$ https://www.joinplastic.com/product-category/pallet-box/ permanent;
rewrite ^/products/foldableBox/foldablePlasticCrates.php$ https://www.joinplastic.com/product-category/folding-crate/ permanent;
rewrite ^/products/pallets/pallet.php$ https://www.pallet-wholesale.com/plastic-pallets/ permanent;
rewrite ^/products/attached-lid-containers/attached-lid-containers.php$ https://www.plastic-crates.com/product-category/totes-with-lids/ permanent;
rewrite ^/products/stackableBox/stackableBox.php$ https://www.joinplastic.com/product-category/plastic-stacking-crates/ permanent;


```

### 如果有花括号（量词），需要用双引号或者单引号将表达式包起来
Curly braces are used both in regex and for block control, you must enclose your regex with quotes (single or double)
```
location ~* "^/.{16,22}[^/]$" {
   return 301 https://www.ausplastic.com;
}
```

### 部署react 项目，直接访问二级路由回报 404 错误, 需要加上配置
```
location / {
  try_files $uri /index.html;
}
```



### nginx 配置 react 前端项目

```

server {
  listen 80;
  listen [::]:80;
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  ssl_certificate /usr/local/nginx/conf/ssl/www.movingbox.cn.crt;
  ssl_certificate_key /usr/local/nginx/conf/ssl/www.movingbox.cn.key;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
  ssl_ciphers TLS13-AES-256-GCM-SHA384:TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-128-GCM-SHA256:TLS13-AES-128-CCM-8-SHA256:TLS13-AES-128-CCM-SHA256:EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
  ssl_prefer_server_ciphers on;
  ssl_session_timeout 10m;
  ssl_session_cache builtin:1000 shared:SSL:10m;
  ssl_buffer_size 1400;
  add_header Strict-Transport-Security max-age=15768000;
  ssl_stapling on;
  ssl_stapling_verify on;
  server_name www.movingbox.cn movingbox.cn;
  access_log /data/wwwlogs/www.movingbox.cn_nginx.log combined;
  index index.html index.htm index.php;

  # 注意这里，react 生成的前端根目录在public下
  # 但由于要 lets encrypt 自动申请证书成功，不能直接在这里指向/public
  root /data/wwwroot/www.movingbox.cn;
  if ($ssl_protocol = "") { return 301 https://$host$request_uri; }
  if ($host != www.movingbox.cn) {  return 301 $scheme://www.movingbox.cn$request_uri;  }
  include /usr/local/nginx/conf/rewrite/none.conf;
  #error_page 404 /404.html;
  #error_page 502 /502.html;
  
  location ~ [^/]\.php(/|$) {
    #fastcgi_pass remote_php_ip:9000;
    fastcgi_pass unix:/dev/shm/php-cgi.sock;
    fastcgi_index index.php;
    include fastcgi.conf;
  }
  location ~ /(\.user\.ini|\.ht|\.git|\.svn|\.project|LICENSE|README\.md) {
    deny all;
  }

  # 注意这里，配置lets encrypt 自动申请证书
  location ^~ /.well-known/acme-challenge/ {
    default_type "text/plain";
    root /data/wwwroot/www.movingbox.cn/;
  }
  location /{
    root  /data/wwwroot/www.movingbox.cn/public/;
    try_files $uri $uri/index.html =404;
    # 注意这里，路由没有找到 返回404 code;
    # 交给前端 404.html 页面；
    error_page 404 /404.html;
  }

  # 注意这里，配置图片的参数如 expires, 同时要指定 root 目录，
  # 因为匹配到此条规则，就不会用上条规则的 root, 
  # 而是会用默认的 server 下的 root,即 root /data/wwwroot/www.movingbox.cn;
  location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|flv|mp4|ico)$ {
   root  /data/wwwroot/www.movingbox.cn/public/;
   expires 30d;
   access_log off;
  }

  # 注意这里，配置js\css 文件同上面一样, 同时要指定 root 目录，
  location ~ .*\.(js|css)?$ {
    root  /data/wwwroot/www.movingbox.cn/public/;
    expires 7d;
    access_log off;
  }
}

```


### 利用nginx 做负载均衡 load balancer

参考 https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/#overview
```
upstream my_http_servers {
    server 127.0.0.1:444;      # httpServer1 listens to port 444
    server 127.0.0.1:445;      # httpServer2 listens to port 445
    server 127.0.0.1:446;      # httpServer3 listens to port 446
    server 127.0.0.1:447;      # httpServer4 listens to port 447
}
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    location / {
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   Host      $http_host;
        proxy_pass         http://my_http_servers;
    }
}

// my_http_servers 为自定义的名称
// proxy_pass   http://my_http_servers; 注意 my_http_servers 前要有 http://
// server 可以为本地ip，也可以为 其他ip 如: server 54.218.*8.*4:28000;
```

### Choosing a Load-Balancing Method
```
//Round Robin

upstream backend {
   # no load balancing method is specified for Round Robin
   server backend1.example.com;
   server backend2.example.com;
}

//Least Connections – A request is sent to the server with the least number of active connections, again with server weights taken into consideration

upstream backend {
    least_conn;
    server backend1.example.com;
    server backend2.example.com;
}

```


### 多个位置用到 反向代理的 地址,可以将其放到 upstream 里面
```
upstream my-backend {
  localhost:9000;
}
server {
  listen 80;
  server_name my-awesome-php.site;
  root /path/to/root;
  # The protected location
  location /protected {
    auth_basic "Give me codes.";
    auth_basic_user_file /path/to/.htpasswd;
    location ~ \.php$ {
      include fastcgi.conf;
      fastcgi_pass my-backend;
    }
  }      

  # Normal files (blank location is OK, just means serve from root)
  location / {
  }
  # PHP for normal stuff
  location ~ \.php$ {
    include fastcgi.conf;
    fastcgi_pass my-backend;
  } 

}
```



### 为一个域名配置 nginx 服务器
#### 创建配置文件
配置文件通常在  
/etc/nginx/sites-enabled  
/etc/nginx/sites-available  
下，以 your_domain.conf 命名


for example:
```
server {  
    listen 80;  
    server_name example.com www.example.com;  
    root /var/www/example.com;  
} 
```


#### 创建网站根目录
根据配置文件里面指定的 root，创建网站根目录及入口文件
如：
vim /var/www/example.com/index.html  


```
<html>  
<head>  
    <title>Welcome to example.com!</title>  
</head>  
<body>  
    <h1>Hello, world!</h1>  
</body>  
</html>  

```

#### 重启nginx 服务，使配置生效
```
sudo systemctl restart nginx 
```


### 为域名添加安全证书
Secure Nginx with Let's Encrypt on Ubuntu 20.04

#### Step 1 — Installing Certbot

```
sudo apt install certbot python3-certbot-nginx
```

#### Step 2 — Confirming Nginx’s Configuration
Certbot needs to be able to find the correct server block in your Nginx configuration for it to be able to automatically configure SSL. Specifically, it does this by looking for a server_name directive that matches the domain you request a certificate for.

#### Step 3 — Allowing HTTPS Through the Firewall/云服务的安全组端口配置
要开放80，443 端口访问


#### Step 4 — Obtaining an SSL Certificate
```
sudo certbot --nginx -d example.com -d www.example.com
```


#### Step 5 — Verifying Certbot Auto-Renewal

```
sudo systemctl status certbot.timer
```
To test the renewal process, you can do a dry run with certbot:
```
sudo certbot renew --dry-run
```