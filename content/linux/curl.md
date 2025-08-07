---
title: "curl 命令"
metaTitle: "curl 命令"
metaDescription: "curl 命令"
---

### curl GET
```
curl http://localhost:4700/
```

### curl response time
```
curl -o /dev/null -s -w "Total Time: %{time_total}s\n" https://example.com

-o /dev/null: Discards the response body (you only want timing).
-s: Silent mode (no progress bar or errors).
-w: Custom output. time_total is the total time in seconds.


查看 TTFB 和 total time
curl -o /dev/null -s -w 'TTFB: %{time_starttransfer}\nTotal: %{time_total}\n' https://www.rhimopower.com/


查看 TTFB, total time 和 Size_bytes
curl -o /dev/null -s -w 'TTFB: %{time_starttransfer}\nTotal: %{time_total}\nSize_bytes: %{size_download}\n' https://6x6y.com/test/
```

### curl 获取 HTTP 头信息
```
curl -I https://www.example.com
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