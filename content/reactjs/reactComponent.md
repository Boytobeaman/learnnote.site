---
title: "react component"
metaTitle: "react component, react component基础，react component快速入门"
metaDescription: "react component，react component 问题"
---

### 如何在react 某个组件中加script，比如地图组件，加载渲染地图所需js

#### 在 useEffect 里面动态加上script 标签
```
useEffect(() => {
  const script = document.createElement('script');
  script.src = "/path/to/resource.js";
  script.async = true;
  document.body.appendChild(script);
  return () => {
    document.body.removeChild(script);
  }
}, []);


如果很多组件都需要加外部 js script,可以写一个 custom hook

import { useEffect } from 'react';
const importScript = resourceUrl=> {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = resourceUrl;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, [resourceUrl]);
};
export default importScript;

使用时：
import importScript from 'customHooks/importScript';
const Demo = props => {
  importScript("/path/to/resource.js");
}
```