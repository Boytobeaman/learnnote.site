---
title: "chatwoot live chat"
metaTitle: "chatwoot live chat"
metaDescription: "chatwoot live chat"
---



### chatwoot 安装

安装完成，启动之前需要准备数据库及表，前提是数据库连接已配置完成
```
cd /home/chatwoot/chatwoot

bundle exec rails db:prepare


// 这一步设置一些初始数据，这样默认打开<chatwoot-installation-url> 就会跳到一个
// /installation/onboarding 页面，可以设置super user
RAILS_ENV=production bundle exec rails db:seed
```

### Access superadmin console

Access <chatwoot-installation-url>/super_admin

超级用户可以添加用户，添加账户

### Viewing Logs
```
# logs from the rails server
journalctl -u chatwoot-web.1.service -f

# logs from sidekiq
journalctl -u chatwoot-worker.1.service -f
```


### Login as chatwoot user
```
sudo -i -u chatwoot
cd chatwoot
```

### enter Rails console
```
RAILS_ENV=production bundle exec rails console


// remove BRAND_NAME value, 这一步去掉BRAND_NAME后重启就不会显示 chatwoot 了
InstallationConfig.find_by(name: 'BRAND_NAME')&.destroy

// 更改 BRAND_NAME
InstallationConfig.create_or_find_by(name: 'BRAND_NAME').update(value: 'YourBrand')

// 更改 brand url
InstallationConfig.create_or_find_by(name: 'WIDGET_BRAND_URL').update(value: 'https://yourdomain.com')



//退出 console
exit
```

### restart chatwoot
```
sudo systemctl restart chatwoot.target
```


### how to Enable User Registration
```
in project root .env
eg:
/home/chatwoot/chatwoot/.env

change to:
ENABLE_ACCOUNT_SIGNUP=true

then:
restart chatwoot
```

### cdn env
```
vim /home/chatwoot/chatwoot/.env


ASSET_CDN_HOST=<distribution>.cloudfront.net
```

### Optional: Restrict by Email Domain
.env
```
ALLOWED_ACCOUNT_EMAIL_DOMAINS=example.com,mycompany.com

//Only emails from those domains will be allowed to sign up.
```

### control the behaviour of rack attack in your instance
```
## Rack Attack configuration
## To prevent and throttle abusive requests.
# Disable if you are getting too many request errors for custom use cases
# ENABLE_RACK_ATTACK=true
# Control the allowed number of requests
# RACK_ATTACK_LIMIT=300
# Control whether you want to enable rack attack for widget APIs
# ENABLE_RACK_ATTACK_WIDGET_API=true
```



### 版本升级
```
cwctl --upgrade
```