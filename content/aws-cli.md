---
title: "aws cli"
metaTitle: "aws cli"
metaDescription: "aws cli"
---

### 使用前配置
```
aws configure
```



### s3 相关命令

#### 给bucket 里面的图片加 cache control

```
// single object
aws s3 cp s3://s3-bucket/file.txt s3://s3-bucket/file.txt --metadata-directive REPLACE --cache-control max-age=86400


// all files in a bucket (use the recursive flag)
aws s3 cp s3://s3-bucket/ s3://s3-bucket/ --metadata-directive REPLACE --recursive --cache-control max-age=86400


// only images
aws s3 cp s3://s3-bucket/ s3://s3-bucket/ --metadata-directive REPLACE --exclude "*" --include "*.jpg" --include "*.gif"  --include "*.png" --recursive --cache-control max-age=86400



改变图片content-type
aws s3 cp s3://strapi90m/ s3://strapi90m/ --metadata-directive REPLACE --exclude "*" --include "*.jpg" --include "*.jpeg" --recursive --content-type image/jpeg --cache-control max-age=86400

aws s3 cp s3://strapi90m/ s3://strapi90m/ --metadata-directive REPLACE --exclude "*" --include "*.png" --recursive --content-type image/png --cache-control max-age=86400

aws s3 cp s3://strapi90m/ s3://strapi90m/ --metadata-directive REPLACE --include "*" --exclude "*.png" --exclude "*.jpg" --exclude "*.jpeg" --recursive --content-type image/jpeg --cache-control max-age=86400
```
