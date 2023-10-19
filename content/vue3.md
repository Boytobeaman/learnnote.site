---
title: "vuejs"
metaTitle: "vue js 教程，vue 笔记，vue 面试问题"
metaDescription: "vue js 教程，vue 笔记，vue 面试问题"
---

## vue 教程



### vue 文件结构
A Vue SFC, as the name suggests, encapsulates the component's logic (JavaScript), template (HTML), and styles (CSS) in a single file. Here's the previous example, written in SFC format:

```
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```


### Lifecycle Hooks
#### onMounted
the onMounted hook can be used to run code after the component has finished the initial rendering and created the DOM nodes:
```
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```

#### onUpdated

Registers a callback to be called after the component has updated its DOM tree due to a reactive state change.
```

<script setup>
import { onUpdated } from 'vue'

onUpdated(() => {
  console.log(`the component is now onUpdated.`)
})
</script>
```

#### onUnmounted
Registers a callback to be called after the component has been unmounted.
```
<script setup>
import { onMounted, onUnmounted } from 'vue'

let intervalId
onMounted(() => {
  intervalId = setInterval(() => {
    // ...
  })
})

onUnmounted(() => clearInterval(intervalId))
</script>

```

### 父子组件事件传递
```
父组件

<script setup lang="ts">

function callback () {
  console.log(`callback called`)
}

</script>

<template>
<ChildComponent @some-event="callback" />
</template>



子组件
ChildComponent

<script setup lang="ts">
defineEmits(['someEvent'])
</script>

<template>
  <button @click="$emit('someEvent')">click me</button>
</template>

```

同样，组件的事件监听器也支持 .once 修饰符：
```
<ChildComponent @some-event.once="callback" />
```


Event Arguments 事件参数
```

子组件中传递参数
<button @click="$emit('someEvent', 'some value')">click me</button>


父组件中接受参数

function callback (val) {
  console.log(`callback called === ${val}`)
}


```

#### Declaring Emitted Events
```
The $emit method that we used in the <template> isn't accessible within the <script setup> section of a component, but defineEmits() returns an equivalent function that we can use instead:

我们在 <template> 中使用的 $emit 方法不能在组件的 <script setup> 部分中使用，但 defineEmits() 会返回一个相同作用的函数供我们使用：

<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```