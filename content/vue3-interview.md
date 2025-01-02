---
title: "vuejs3"
metaTitle: "vue3 js 教程，vue3 笔记，vue3 面试问题"
metaDescription: "vue3 js 教程，vue3 笔记，vue3 面试问题"
---

## vue 面试问题

### v-if 与 v-show 的区别
v-if is "real" conditional rendering because it ensures that event listeners and child components inside the conditional block are properly destroyed and re-created during toggles.

v-if is also lazy: if the condition is false on initial render, it will not do anything - the conditional block won't be rendered until the condition becomes true for the first time.

In comparison, v-show is much simpler - the element is always rendered regardless of initial condition, with CSS-based toggling.

Generally speaking, v-if has higher toggle costs while v-show has higher initial render costs. So prefer v-show if you need to toggle something very often, and prefer v-if if the condition is unlikely to change at runtime.



























### computed 与 watch 的区别
computed 计算属性，返回计算的结果，必须有返回值，初始化时执行，不支持异步，返回值会缓存，只有依赖的变量发生改变时才重新计算


watch 监听属性，监听数据变化会触发相应操作，支持异步操作，不用有返回值