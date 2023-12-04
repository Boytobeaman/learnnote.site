---
title: "seo"
metaTitle: "seo 相关问题，"
metaDescription: "seo 相关问题，seo优化问题"
---



### ld json 信息，Structured Data Markup
如下，要特别注意下面几个地方  

name：会在搜索引擎显示的产品名称  
image：会在搜索引擎显示的产品图片  
offers.priceCurrency: 产品价格单位  
offers.price: 产品价格  
offers.url: 产品链接地址  
offers.availability: 是否有库存， http://schema.org/InStock 是有库存  
offers.seller.name: 产品买家名称
```
<script type="application/ld+json">
{
  "@context": "http://schema.org/",
  "@type": "Product",
  "name": "Uni-Pak title | 40 x 48 x 45 | BCE",
  "image": [
            "https://d2j6dsome.cloudfront.net/images/someimg/8.jpg",
            "https://d2j6dsome.cloudfront.net/images/someimg/3.jpg",
            "https://d2j6dsome.cloudfront.net/images/someimg/1.jpg",
            "https://d2j6dsome.cloudfront.net/images/someimg/6.jpg",
            "https://d2j6dsome.cloudfront.net/images/someimg/4.jpg",
            "https://d2j6dsome.cloudfront.net/images/someimg/1.jpg",
            "https://d2j6dsome.cloudfront.net/images/someimg/6.jpg"
  ],
    "description": "The 40\" x 48\"dling tasks in a wide variety of applications. Shop online with some.",
  "sku": "UP404845-0",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "171",
    "url": "https://www.some.com/product/Unick-Container",
    "valueAddedTaxIncluded": false,
      "itemCondition": "http://schema.org/NewCondition",

    "availability": "http://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Bulk Container Express"
    }
  }
}
</script>
```