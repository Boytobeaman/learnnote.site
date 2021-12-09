

### elasticsearch 默认端口 9200
By default, Elasticsearch will use port 9200 for requests and port 9300 for communication between nodes within the cluster.
```
启动elasticsearch
windows:
bin/elasticsearch.bat
```

### kibana 默认端口 5601

```
启动kibana
windows:
bin/kibana.bat


http://localhost:5601
```



### 查询
```
GET /bank/_search

{
  "query": { "match_all": {} },
  "sort": [
    { "account_number": "asc" }
  ],
  "size": 3,
  "from": 2
}

_search 表示查询
query 是查询条件, 这里是所有
size  表示每次查询的条数, 分页的条数. 如果不传, 默认是10条. 在返回结果的hits中显示.
from  表示从第几个开始
```
