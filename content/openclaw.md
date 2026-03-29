---
title: "openclaw 教程"
metaTitle: "openclaw 教程"
metaDescription: "openclaw 教程, openclaw 命令"
---

#### openclaw 中国代理配置
```
对于Windows 机器，在 openclaw 安装目录下

.openclaw/gateway.cmd

根据你实际代理的地址和端口，加上
set "HTTP_PROXY=http://127.0.0.1:7890"
set "HTTPS_PROXY=http://127.0.0.1:7890"
```


### openclaw 更新
```
openclaw update
```




### 配置 web 端域名访问, controlUi 的配置
```
"gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "controlUi": {
      "allowedOrigins": [
        "https://yourdomain.com"
      ]
    },
}

// 注意要加 https，服务端配置要好ssl证书, 不然不可以访问
```

### pairing required
```
List requests：

openclaw devices list


Approve the pending request:
openclaw devices approve --latest
# OR
openclaw devices approve <requestId>
```



### 查看openclaw token 和url
```
openclaw dashboard --no-open
```



### Check installed skills
```
openclaw skills list
```


### Uninstall the skill
```
openclaw skills uninstall <skill-name>
```

### 安装skills

```
clawhub install <slug>
or
openclaw skills install <slug>

eg:
clawhub install word-docx
openclaw skills install image-resizer

默认会安装在下面文件夹
/root/.openclaw/workspace/skills
```

### config web_search
```
openclaw config  --section web
```

### config
```
openclaw config set agents.defaults.thinkingDefault "minimal"
```

### restart openclaw
```
systemctl restart openclaw-gateway
```

### 查看日志
```
journalctl -u openclaw-gateway -f -n 30

```

### apikey 存储位置 openai, claude, gemini
```
~/.openclaw/agents/main/agent/auth-profiles.json
```