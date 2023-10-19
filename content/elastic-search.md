

## 基础概念


## linux 安装
centos 安装  elasticsearch

https://www.elastic.co/guide/en/elasticsearch/reference/8.1/rpm.html#rpm-repo

centos 安装  kibana
https://www.elastic.co/guide/en/kibana/current/rpm.html

generate an enrollment token for Kibana with the elasticsearch-create-enrollment-token tool:

centos 下位置
/usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana



查看安装版本
./bin/elasticsearch --version

eg
/usr/share/elasticsearch/bin/elasticsearch --version




配置文件位置，如端口host等
/etc/elasticsearch/elasticsearch.yml
### 常见问题


#### plugins
```
Listing plugins
sudo bin/elasticsearch-plugin list

Removing plugins
sudo bin/elasticsearch-plugin remove [pluginname]

Removing multiple plugins
sudo bin/elasticsearch-plugin remove [pluginname] [pluginname] ... [pluginname]


Updating plugins
sudo bin/elasticsearch-plugin remove [pluginname]
sudo bin/elasticsearch-plugin install [pluginname]
```


#### 备份还原  aws s3
```
https://www.elastic.co/guide/en/elasticsearch/reference/8.10/snapshot-restore.html

配置s3 key
/usr/share/elasticsearch/bin/elasticsearch-keystore add s3.client.default.access_key
/usr/share/elasticsearch/bin/elasticsearch-keystore add s3.client.default.secret_key

配置好了要重启elasticsearch

```


#### 占用内存过高
```

https://www.elastic.co/guide/en/elasticsearch/reference/8.1/advanced-configuration.html#set-jvm-heap-size
```

#### 索引
含有相同属性的文档的集合
（相当于数据库）

#### 类型
索引可以定义一个或者多个类型，文档必须属于一个类型
（相当于一张表）

#### 文档
文档是可以被索引的基本数据单位

#### TF IDF
##### TF (Term Frequency)
搜索文本中的各个词条在field文本中出现了多少次，出现次数越多，就越相关
##### IDF (Inverse Document Frequency)
搜索文本中的各个词条在整个索引的所有文档中出现了多少次，出现的次数越多，就越不相关

### elasticsearch 默认端口 9200
By default, Elasticsearch will use port 9200 for requests and port 9300 for communication between nodes within the cluster.
```
启动elasticsearch
windows:
bin/elasticsearch.bat


查看elasticsearch 状态
systemctl status elasticsearch
```

### kibana 默认端口 5601

```
启动kibana
windows:
bin/kibana.bat


http://localhost:5601



配置文件位置
/etc/kibana/kibana.yml


如果要开放外网访问，设置
server.host: 0.0.0.0
```

### 查看kabana 日志
```
journalctl -u kibana.service
```


### 常用命令,注意安装位置可能会有差异
```
Reset the password of the elastic built-in superuser with 
'/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic'.

Generate an enrollment token for Kibana instances with 
 '/usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana'.

Generate an enrollment token for Elasticsearch nodes with 
'/usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s node'.
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
from  表示跳过的hits,默认是0.  The from parameter defines the number of hits to skip, defaulting to 0
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

### filter
```
You only want to show them red shirts made by Gucci in the search results. Normally you would do this with a bool query:

GET /shirts/_search
{
  "query": {
    "bool": {
      "filter": [
        { "term": { "color": "red"   }},
        { "term": { "brand": "gucci" }}
      ]
    }
  }
}


GET /_search
{
  "query": { 
    "bool": { 
      "must": [
        { "match": { "title":   "Search"        }},
        { "match": { "content": "Elasticsearch" }}
      ],
      "filter": [ 
        { "term":  { "status": "published" }},
        { "range": { "publish_date": { "gte": "2015-01-01" }}}
      ]
    }
  }
}

filter 相当于等于的概念
如 { "term":  { "status": "published" }}, 
// status 的值必须是published

 { "range": { "publish_date": { "gte": "2015-01-01" }}}
// publish_date 必须是大于 2015-01-01 的值
```
## Term-level queries
Exists query  
Fuzzy  
IDs  
Prefix  
Range  
Regexp  
Term  
Terms  
Terms set  
Wildcard  

### Exists query
Returns documents that contain an indexed value for a field.
```
GET /_search
{
  "query": {
    "exists": {
      "field": "user"
    }
  }
}

eg: 必须存在 ali_company_id，也就是这个字段不为空，不为null
{
  "query": {
    "bool": {
      "must":[
        {"multi_match": {
          "query": "plastic milk crate",
          "fields": ["controlled_rank_str^10","product_title"]
        }},
        {"exists": {
          "field": "ali_company_id"
        }}
      ]
    }
  }
}
```

##### 避免返回结果10000条总数的限制,加上 track_total_hits
```
{
  "query": {
    "match_all": {}
  },
  "track_total_hits": true
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

##### Individual fields can be boosted with the caret (^) notation
```
const result= await client.search({
    index: productIndex,
    query: {
        multi_match: {
            query: keyword,
            fields: ["controlled_rank_str^3", "product_title", ]
        }
    },
    // size: 200
})
// 这里 controlled_rank_str 字段的匹配权重将增大3倍
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


初始化client

```
const { Client } = require('@elastic/elasticsearch')


const client = new Client({
    cloud: {
      id: 'se-es:dXMtY2vvvvv4ZGE2',
    },
    auth: {
      username: 'elastic',
      password: 'PPw0m999ddddddddddddddd'
    }
})




const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'changeme'
  },
  tls: {
    ca: fs.readFileSync('./http_ca.crt'),
    rejectUnauthorized: false
  }
})
```


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

### client.update(...)
```
Updates a document with a script or partial document.

client.update({
  index: productIndex,
  id,
  doc: es_doc
})

// 注意 update 里面数据的key 叫 doc, 不是index接口里面的document
```


### updateByQuery 批量更新
```

// 匹配到 ali_company_id 值的所有 productIndex， 将其disabled设置为false
client.updateByQuery({
  index: productIndex,
  refresh: true,
  script: {
    lang: 'painless',
    source: 'ctx._source["disabled"] = false'
  },
  query: {
    term: {
      ali_company_id:{
        value: "some value"
      }
    }
  }
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

### 删除某条记录
```
client.delete({
  index: `some-index-name`,
  id
})
```


### 查看分词状态
```
GET /movie/_analyze
{
  "text": "eating an apple a day & keep your doctor away",
  "field": "name"
}
```


### 查看排名得分细节依据, 加上 explain true
```
GET /ali-products/_search
{
  "query": {
    "match": {
      "product_title": "folding crates"
    }
  },
  "explain": true
}
```

#### 使用结构化的方式 重新创建索引, 设置字段的 analyzer，默认是 standard
如果对应的是英文搜索，设置成 english 比较好，这样如果搜索 eating, 结果中有 eat 也会匹配上
```
PUT /movie
{
  "settings": {
    "number_of_replicas": 1,
    "number_of_shards": 1
  },
  "mappings": {
    "properties": {
      "name":{
        "type": "text",
        "analyzer": "english"
      }
    }
  }
}
```

### Mapping parameters mapping 对应的字段

#### analyzer
Only text fields support the analyzer mapping parameter.  
The standard analyzer is the default analyzer which is used if none is specified.

常见的还有 analyzer 还有
simple
whitespace  
stop  
pattern  
fingerprint  


可以安装分词器插件，比如针对中文有ik 分词器  
https://github.com/medcl/elasticsearch-analysis-ik

```
PUT my-index-000001
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "whitespace"
      }
    }
  }
}
```
##### Language Analyzers
Elasticsearch provides many language-specific analyzers like english or french.

#### 插件安装分词器
plugin can be installed using the plugin manager
```
// 安装 analysis-smartcn
sudo bin/elasticsearch-plugin install analysis-smartcn


// 卸载 analysis-smartcn
sudo bin/elasticsearch-plugin remove analysis-smartcn

// 安装 中文 analysis-ik 分词器， 根据elasticsearch 版本替换下载 url 中的版本
sudo bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v8.1.2/elasticsearch-analysis-ik-8.1.2.zip

centos 默认 安装位置
/etc/elasticsearch/analysis-ik

安装后可以使用的 Analyzer: ik_smart , ik_max_word
‘
最佳实践：
对于中文 一般可以使用 analyzer: ik_max_word 构建索引,来保证查全率; 使用 search_analyzer: ik_smart 保证查准率

比如 test_chinese 索引的content字段
PUT test_chinese/
{
  "mappings": {
    "properties":{
      "content":{
        "type":"text",
        "analyzer":"ik_max_word",
        "search_analyzer":"ik_smart"
      }
    }
  }
}

```
The plugin must be installed on every node in the cluster, and each node must be restarted after installation.

#### 测试分词器效果
```
GET _analyze?pretty
{
  "analyzer": "standard",
  "text": "中华人民共和国"
}

// 安装中文 analysis-ik 分词器后测试
GET _analyze?pretty
{
  "analyzer": "ik_max_word",
  "text": "中华人民共和国"
}


GET _analyze?pretty
{
  "analyzer": "ik_smart",
  "text": "驻洛杉矶领事馆遭亚裔男子枪击 嫌犯已自首"
}
```

### mappings 里字段的 type

```
Text: 被分析索引的字符串类型
Keyword: 不能被分析只能被精确匹配的字符串类型
Date: 日期类型，可以配合format一起使用
```