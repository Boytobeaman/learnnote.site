

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


#### 查询条件

##### Match query
```
{
  "query": {
    "match": {
      "message": {
        "query": "this is a test"
      }
    }
  }
}
```

#### Short request example
```
{
  "query": {
    "match": {
      "message": "this is a test"
    }
  }
}
```
##### Multi-match query 多字段搜索
```
{
  "query": {
    "multi_match" : {
      "query":    "this is a test", 
      "fields": [ "subject", "message" ] 
    }
  }
}

```
##### Fields can be specified with wildcards 通配符指定字段
```
{
  "query": {
    "multi_match" : {
      "query":    "Will Smith",
      "fields": [ "title", "*_name" ] 
    }
  }
}
// the title, first_name and last_name fields 都可以被搜索.
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


## Elasticsearch nodejs client library

### 安装
```
npm install @elastic/elasticsearch

//To install a specific major of the client, run the following command:
npm install @elastic/elasticsearch@<major>
```

## elasticsearch version 8.1 js api


### 创建一个index
```
await client.indices.create({
  index: 'tweets',
  operations: {
    mappings: {
      properties: {
        id: { type: 'integer' },
        text: { type: 'text' },
        user: { type: 'keyword' },
        time: { type: 'date' }
      }
    }
  }
}, { ignore: [400] })
```
### indexing some data
```
// Let's start by indexing some data
await client.index({
  index: 'game-of-thrones',
  document: {
    character: 'Ned Stark',
    quote: 'Winter is coming.'
  }
})

// forcing an index refresh
await client.indices.refresh({ index: 'game-of-thrones' })
```


### index 时避免重复
```
// 创建记录时增加id，下面指定的id 将会成为es 这条记录的_id

client.index({
  index: productIndex,
  id: product.id,
  document: doc
})

```

### client.index、client.create 与client.update 区别
```
```

### 统计数量
```
const count = await client.count({ index: productIndex })

{
  count: 20,
  _shards: { total: 1, successful: 1, skipped: 0, failed: 0 }
}
```

### search
```
const result= await client.search({
  index: 'game-of-thrones',
  query: {
    match: { quote: 'winter' }
  }
})

console.log(result.hits.hits)
```

### 删除 index
```
client.indices.delete({
  index: `some-index-name`
})
```