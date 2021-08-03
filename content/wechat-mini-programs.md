---
title: "微信小程序"
metaTitle: "微信小程序 开发流程"
metaDescription: "微信小程序 开发流程"
---

### 简介
小程序是一种全新的连接用户与服务的方式，它可以在微信内被便捷地获取和传播，同时具有出色的使用体验。


### 开发工具下载
[微信小程序官方开发工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)


### 开发文档

[微信小程序官方开发文档链接](https://developers.weixin.qq.com/miniprogram/dev/api/)


### 小程序开发流程

1. 注册小程序
1. 代码开发
1. 提审
1. 上线

### 注册小程序
[微信小程序注册地址](https://mp.weixin.qq.com/)


### 代码开发
#### 项目目录结构
```
+-- app.js //小程序启动时加载的js
+-- app.wxss //小程序全局样式
+-- app.json //小程序全局配置
+-- components
|   +-- chatroom
    |   +-- index.js
    |   +-- index.json
    |   +-- index.wxml  //相当于html
    |   +-- index.wxss  //相当于css
+-- config
|   +-- api.js // 比如发请求对应的后端api 配置
+-- utils
|   +-- http.js // 向后端发请求的util
+-- enum
|   +-- role-type.js // 相当于常量的定义，比如 role type
+-- pages
    +-- index  //首页
    |   +-- index.js
    |   +-- index.json
    |   +-- index.wxml  //相当于html
    |   +-- index.wxss  //相当于css
    +-- contact // 联系我们页面
    |   +-- index.js
    |   +-- index.json
    |   +-- index.wxml
    |   +-- index.wxss
+-- index.html
```
#### app.json 配置说明
```
// pages 配置项目页面
// window 配置全局样式等
// tabBar 配置下部菜单
// usingComponents 配置项目用到的组件，通常这里放的是很多页面都用到的组件，配置在这里就不用在某个页面配置了
{
  "pages": [
    "pages/index/index",
    "pages/plaza/index"
  ],
  "window": {
    "backgroundColor": "#F6F6F6",
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#2e5e86",
    "navigationBarTitleText": "盈嘉demo",
    "navigationBarTextStyle": "white"
  },
  "sitemapLocation": "sitemap.json",
  "style": "v2",
  "tabBar": {
    "selectedColor": "#fbc02d",
    "color": "#8a8a8a",
    "list": [
      {
        "pagePath": "pages/plaza/index",
        "text": "广场",
        "selectedIconPath": "images/tabbar/square-selected.png",
        "iconPath": "images/tabbar/square.png"
      },
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "images/ic_home_normal.png",
        "selectedIconPath": "images/ic_home_pressed.png"
      }
    ]
  },
  "usingComponents": {
    "i-tabs": "/components/tabs/index",
    "i-icon": "/components/icon/index",
    "i-avatar": "/components/avatar/index",
    "i-service-preview": "/components/service-preview/index",
    "i-skeleton": "/components/skeleton/index"
  }
}
```

#### 每个页面的 index.js
```
const app = getApp()

Page({
  data: {
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl'), // 如需尝试获取用户信息可改为false
    proList:[
      {
        title: "title one",
        shortDesc: "short desc"
      },
      {
        title: "title two",
        shortDesc: "short desc two"
      },
    ]
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
  },
})


//说明：
setData: 和react setState 类似，设置此页面的数据
```

#### 每个页面的 index.wxml
```
  <view class='items-list'>
    <view class='pro-item' wx:for="{{proList}}" bindtap='toDetail' data-index='{{index}}'>
      <image class='pro-logo' src='{{item.img}}'></image>
      <view class='pro-body'>
        <view class='pro-tile'>{{item.title}}</view>
        <text class='pro-desc'>{{item.shortDesc}}</text>
        <view class='pro-footer'>
          <image class="btn-detail" src='/images/btn_detail.png'></image>
          <button open-type="contact" class="btn-ask"><image src='/images/btn_ask.png' /></button>
        </view>
      </view>
    </view>
  </view>


//说明：
wx:for 表示循环，在作用域里面就有index，和item可用

// 条件渲染
在框架中，使用 wx:if="" 来判断是否需要渲染该代码块：
<view wx:if="{{condition}}"> True </view>

{{proList}}: 两个花括号表示读js变量

bindtap='toDetail': 表示绑定（bind）点击事件（tap）


//更多 WXML 语法
https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/

//更多绑定事件
https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#%E4%BA%8B%E4%BB%B6%E5%88%86%E7%B1%BB

//更多页面组件
https://developers.weixin.qq.com/miniprogram/dev/component/
```

##### wxml 点击事件传参数 data-{参数名}
```
// 比如给 handleChangeCategory 传一个id
<view class="category-swiper-item" data-id="{{item.id}}" bind:tap="handleChangeCategory">
    <text>{{item.name}}</text>
</view>


// js 中可以通过 event.currentTarget.dataset.参数名 获取值
handleChangeCategory: throttle(function (event) {
    const categoryId = event.currentTarget.dataset.id
    
}),
```

##### 父子组件通信
```
//父组件（页面）通过属性给 自定义组件传递参数
//自定义组件 通过自定义事件给父组件（页面）传递参数


eg： 子组件使用父组件定义的tabs
//页面 js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['所有服务', '在提供', '正在找'],
  }
})

页面 wxml
<i-tabs tabs="{{tabs}}" catch:change="handleTabChange">
</i-tabs>




子组件tabs js, 定义好了它的属性（properties） tabs 为数组类型
Component({
    options: {
        multipleSlots: true
    },
    properties: {
        tabs: Array,
    },
})

子组件tabs wxml，就可以使用父组件（页面），传进来的 tabs 数组
<view class="tab-item" wx:for="{{tabs}}" wx:key="index">
    <view class="tab-label {{currentTabIndex === index ? 'active-tab':''}}" data-index="{{index}}"
          bind:tap="handleSwitchTab">
        {{item}}
    </view>
    <view wx:if="{{currentTabIndex === index}}" class="divider"/>
</view>



eg：
子组件通过自定义事件 change 告诉父组件 Tab 当前选中项的改变

子组件js中定义了自己的事件  handleSwitchTab --当currentTab 切换时回调
后面有一个 this.triggerEvent('change', { index })就是触发一个父组件 change 事件，后面 { index } 是传给父组件的参数

Component({

  methods: {
    handleSwitchTab: throttle(async function (event) {
        const index = event.currentTarget.dataset.index
        if (this.data.currentTabIndex === index) {
            return
        }
        this.setData({
            currentTabIndex: index,
        })
        this.triggerEvent('change', { index })
    }),
  }
})


父组件的wxml 中绑定了这个change 事件
<i-tabs tabs="{{tabs}}" catch:change="handleTabChange">
</i-tabs>


父组件的js 中定义了这个对应的 handleTabChange 事件，并可以通过event.detail 拿到子组件传递的 index 的值

handleTabChange: function (event) {
  const index = event.detail.index
  this._getInitServiceList(index, this.data.currentCategoryId)
},

```

#### faq
#### 小程序代码如何引用第三方库，比如and design 等css 或者js

### 提审

### 上线