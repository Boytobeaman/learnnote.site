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
    "priceValidUntil": "2024-03-31",
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

// 加上 aggregateRating
"aggregateRating": {  
  "@type": "AggregateRating",  
  "ratingValue": "4.5",  
  "reviewCount": "100"  
},


// 加上一个review
"review": {  
  "@type": "Review",  
  "author": {  
    "@type": "Person",  
    "name": "John Doe"  
  },  
  "reviewRating": {  
    "@type": "Rating",  
    "ratingValue": "4.5",
    "bestRating": "5"
  },  
  "description": "Great product!"  
}

//使用数组 加上多个review
"review": [  
    {  
      "@type": "Review",  
      "author": {  
        "@type": "Person",  
        "name": "John Doe"  
      },  
      "reviewRating": {  
        "@type": "Rating",  
        "ratingValue": "4.5",  
        "bestRating": "5"  
      },  
      "description": "Great product!"  
    },  
    {  
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Jane Smith"  
      },  
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },  
      "description": "Excellent quality and fast shipping!"  
    }  
  ] 
```

### BreadcrumbList schema
```
<script type="application/ld+json">  
{  
  "@context": "https://schema.org",  
  "@type": "BreadcrumbList",  
  "itemListElement": [  
    {  
      "@type": "ListItem",  
      "position": 1,  
      "name": "Home",  
      "item": "https://example.com/"  
    },  
    {  
      "@type": "ListItem",  
      "position": 2,  
      "name": "Category",  
      "item": "https://example.com/category"  
    },  
    {  
      "@type": "ListItem",  
      "position": 3,  
      "name": "Subcategory",  
      "item": "https://example.com/category/subcategory"  
    },  
    {  
      "@type": "ListItem",  
      "position": 4,  
      "name": "Product Name",  
      "item": "https://example.com/category/subcategory/product"  
    }  
  ]  
}  
</script>  
```

### an example of organization information in JSON-LD code
```
// name 可能会显示在谷歌搜索结果上
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "image": "https://www.example.com/example_image.jpg",
    "url": "https://www.example.com",
    "sameAs": ["https://example.net/profile/example1234", "https://example.org/example1234"],
    "logo": "https://www.example.com/images/logo.png",
    "name": "Example Corporation",
    "description": "The example corporation is well-known for producing high-quality widgets",
    "email": "contact@example.com",
    "telephone": "+47-99-999-9999",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rue Improbable 99",
      "addressLocality": "Paris",
      "addressCountry": "FR",
      "addressRegion": "Ile-de-France",
      "postalCode": "75001"
    },
    "vatID": "FR12345678901",
    "iso6523Code": "0199:724500PMK2A2M1SQQ228"
  }
  </script>
```