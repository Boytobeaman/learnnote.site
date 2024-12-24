---
title: "curl 命令"
metaTitle: "curl 命令"
metaDescription: "curl 命令"
---

### curl GET
```
curl http://localhost:4700/
```

### curl 获取 HTTP 头信息
```
curl -i https://www.example.com
```

### CURL POST
```


POST application/json

curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/data

with a data file
curl -d "@data.json" -X POST http://localhost:3000/data




POST application/x-www-form-urlencoded

application/x-www-form-urlencoded is the default:
curl -d "param1=value1&param2=value2" -X POST http://localhost:3000/data

explicit:
curl -d "param1=value1&param2=value2" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/data
```

### curl  使用代理
```
curl -x proxy.server.com:3128 https://www.example.com
```

### curl 下载文件
```
curl -o filename.txt https://www.example.com/file.txt

```