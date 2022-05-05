---
title: "下载文件"
metaTitle: "页面直接下载文件，不是新窗口打开，html 5 a 标签 download 属性"
metaDescription: "页面直接下载文件，不是新窗口打开，html 5 a 标签 download 属性"
---

### HTML a tag download Attribute
The download attribute specifies that the target (the file specified in the href attribute) will be downloaded when a user clicks on the hyperlink.  
The optional value of the download attribute will be the new name of the file after it is downloaded

#### Download file when clicking on the link (instead of navigating to the file)
```
<a href="/images/myw3schoolsimage.jpg" download>


// Specify a value for the download attribute, which will be the new filename of the downloaded file ("w3logo.jpg" instead of "myw3schoolsimage.jpg")
<a href="/images/myw3schoolsimage.jpg" download="w3logo">
```

#### 如果a 标签 不带 download 属性，通常是打开文件，而不是下载
```
// OPEN FILE IN SAME WINDOW
<a href="myfile.pdf" target="_self">Click to Download</a>


// OPEN FILE IN NEW WINDOW
<a href="myfile.pdf" target="_blank">Click to Download</a>
```


### Download Restrictions
The download attribute only works for same-originl URLs


### 如何解决cor， 使用接口获取数据，然后下载 downloadFileByCORURL, 这种情况要求文件所在后端相应要有 access-Control-Allow-Origin *，不然前端还是被跨越挡住
```
export const downloadFileByBlob = (fileName, data) => {
  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(data);
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(a.href);
};

export function downloadFileByCORURL(url, filename) {
  axios
    .get(`${url}`, {
      responseType: 'blob',
    })
    .then(res => {
      downloadFileByBlob(`${filename}`, res.data);
    });
}
```


### 如果要下载的资源，没有 ，可以使用自己的后端获取文件转发给前端
```
// express 后端 获取文件流然后转发给前端
const getBlobFile = async (req, res, next) => {

    let { url } = req.body;

    try {

        if(!url){
            return responseHandler(res, {code: 400, msg: "url is required"});
        }

        let resp = await axios.get(`${url}`,{
            responseType:"stream"
        })

        res.header('Content-Type', resp.headers["content-type"]);
        resp.data.pipe(res)

    } catch (error) {

        return responseHandler(res, {code: 500, msg: error.message});
    }
}


//前端调用方式不变
export function downloadFileByBackend(url, filename) {
  axios
    .post(
      `${COMMON_API_URL}${COMMON_API_PREX}/util/getBlobFile`,
      {
        url,
      },
      {
        responseType: 'blob',
      },
    )
    .then(res => {
      if (res?.data) {
        downloadFileByBlob(`${filename}`, res.data);
      } else {
        message.warn(`获取blob数据出错`);
      }
    });
}
```