---
title: "data fetching"
metaTitle: "data fetching"
metaDescription: "data fetching, 前端向后端请求数据"
---

## axios
Promise based HTTP client for the browser and node.js

### Installing
```
npm install axios

//or

yarn add axios
```

### CommonJS usage
In order to gain the TypeScript typings (for intellisense / autocomplete) while using CommonJS imports with require() use the following approach:
```
const axios = require('axios').default;
```
### es6 usage
```
import axios from "axios";
```

### usage
```
// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  


// Performing a POST request
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


// Send a POST request
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

### Response Schema
```
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: {}
}
```

### Handling Errors
```
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });


// error.response.data.data.errors 为一个对象 {}
如：
{
  cat_id: [ "cat_id must be a `string` type, but the final value was: `2`." ]
}
```


### axios 上传文件的坑
```
const formData = new FormData();
formData.append('refId', id);
formData.append('ref', 'lele-list');
formData.append('field', 'feature_img');

// 根据图片URL请求得到图片文件的stream
let img_data = await axios.get(image_url,{ responseType:"stream" });

formData.append('files', img_data.data);

const postRes = await axios({
    url:`${api_host}${upload_path}`,
    method: 'POST',
    data: formData,
    headers: formData.getHeaders(),
})



坑 413
Payload Too Large 或者 Request entity too large

其中headers 不要写死，要用 formData.getHeaders()，不然请求接口会得到 413 的错误返回
formData.getHeaders() 会得到如下格式的内容
{content-type:'multipart/form-data; boundary=--------------------------052377681319410737845590'}
```


## fetch
The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. It also provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network.

### usage
```
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));


// post 请求

fetch(
  "https://somedomain.top/DEMO_APP/util/mockAPI",
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({delay: 15000}) , //body data type must match "Content-Type" header
  }
)
  .then((res) => res.json())
```

## SWR (stale-while-revalidate)
The name “SWR” is derived from stale-while-revalidate, a HTTP cache invalidation strategy popularized by HTTP RFC 5861. SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.

### usage
```
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```
In this example, the useSWR hook accepts a key string and a fetcher function. key is a unique identifier of the data (normally the API URL) and will be passed to fetcher. fetcher can be any asynchronous function which returns the data, you can use the native fetch or tools like Axios.



### 后端无法在前端写入cookie 的问题
```
在axios中默认是不让后端写入cookie的，所以你要设置axios.defaults.withCredentials = true


umi-request 中去掉credentials: 'omit'的配置或者不配置

import { extend, ResponseError } from 'umi-request';
const request = extend({
  errorHandler, // 默认错误处理
  // credentials: 'omit', // 默认请求不带cookie
  timeout: 0,
});

```