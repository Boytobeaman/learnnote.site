

### 基础概念

#### 索引
含有相同属性的文档的集合
（相当于数据库）

#### 类型
索引可以定义一个或者多个类型，文档必须属于一个类型
（相当于一张表）

#### 文档
文档是可以被索引的基本数据单位

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


### logstash
```

bin/logstash -f logstash.conf
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



### 分词器插件
```

比较好用的 中文分词器插件
https://github.com/medcl/elasticsearch-analysis-ik

安装位置
elasticsearch安装位置根目录/plugins
eg:
D:\software-install\elasticsearch-7.16.0\plugins
```