---
title: "css in js"
metaTitle: "css in js"
metaDescription: "css in js，如何使用 css in js, 常见的css in js 框架"
---

### WHY CSS-IN-JS

1. JavaScript enhances the capabilities of CSS (e.g. nesting, automatic vendor-prefixing, unit testing—depending on the library).
1. Selectors are locally scoped, as CSS-in-JS libraries generate unique class names so that you don’t have to worry about specificity collision.
1. You can achieve better performance, as CSS-in-JS only loads styles that are currently in use.



### CSS in JS library
1. STYLED COMPONENTS
1. EMOTION
1. JSS




### @fluentui/react-components

微软 @fluentui/react-components
link:  
https://react.fluentui.dev/?path=/docs/concepts-developer-styling-components--page



### 开始使用
```
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: { color: 'red' },
});

function Component() {
  const classes = useStyles();

  return <div className={classes.root} />;
}
```

### Merging component styles
```
import { makeStyles, mergeClasses } from '@fluentui/react-components';

const useStyles = makeStyles({
  blueBold: {
    color: 'blue',
    fontWeight: 'bold',
  },
  red: {
    color: 'red',
  },
});

function Component() {
  const classes = useStyles();

  const first = mergeClasses(classes.blueBold, classes.red); // { color: 'red', fontWeight: 'bold' }
  const second = mergeClasses(classes.red, classes.blueBold); // { color: 'blue', fontWeight: 'bold' }
}
```


### makeStyles 加伪类
```
const useStyles = makeStyles({
  linkStyle: {
    color: "#0078d4",
    ":focus": {
      textDecoration: "underline",
    },
  },
});
```