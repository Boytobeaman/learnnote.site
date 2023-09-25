---
title: "sublime 常用快捷键"
metaTitle: "sublime 常用快捷键"
metaDescription: "sublime 常用快捷键"
---

#### format json 格式化 json

MAC
CTRL + COMMAND + J




全选
mac:
ctrl+command+g

windows: alt+f3


mac
向下多光标
shift+ctrl+down（下箭头）






### idea/vscode/sublime 公用快捷键
```
向下复制当前行 duplicate line or selection
Ctrl+D

删除当前行 Delete line
Ctrl+Y


选择所有匹配项 select all Occurrences of find match
Ctrl + Shift + L


撤销
Ctrl + z


保存
Ctrl + s
```


### subline 配置同步

step 1: 
安装 package
sync settings


step 2:
按照sync settings 里面的配置步骤创建gist,上传配置，或者在新设备里面下载配置

要记得 sync settings 对应的gist 配置,比如
```
{
	"access_token": "some_token",
	"gist_id": "some_id",
}
```


### sublime 配置js构建系统 create a new build system
```
Tools > Build System > New Build System


{   
  "cmd": ["node", "$file"],   
  "selector": "source.js"   
}


不行就指定node路径，使用命令查看路径
which node
{   
  "cmd": ["your/node/path", "$file"],   
  "selector": "source.js"   
}
```