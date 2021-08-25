### 与jQuery 区别
```
数据与视图的分离，解耦
以数据驱动视图，只关心数据变化

```

### vue 三要素
```
响应式：vue 如何监听到data 的每个属性的变化
模板引擎：vue 的模板如何被解析，指令如何处理？
渲染：vue 的模板如何被渲染成 html? 以及渲染过程
```
#### 响应式
```
修改data属性之后，vue 立刻监听到(使用Object.defineProperty)
data属性被代理到vm 上


var mv = {}
var data = {
    price: 100,
    name: 'zhangsan'
}

var key, value
for (key in data){
    (function (key) {
        Object.defineProperty(mv, key, {
            get: function () {
                    console.log('get')
                return data[key]
            }
            set: function (newVal) {
                    console.log('set')
                data[key] = newVal
            }
        })
    })(key)
}
```

### vue 的整个实现流程
```
第一步：解析模板成 render 函数
第二步：响应式开始监听
第三步：首次渲染，显示页面，且绑定依赖
第四步：data属性变化，触发 rerender
```

### Example
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="public/static/js/vue.js" type="text/javascript"></script>
</head>
<body>
    <!-- 挂载点，模板，实例 -->
    <div id="root">
        <div>
            <input type="text" v-model="inputValue" />
            <button @click="handleSubmit">Submit</button>
        </div>
        <ul>
            <todo-item 
                v-for="(item, index) of list"
                :key="index"
                :content="item"
                :index="index"
                @delete="handleDelete"
            ></todo-item>
        </ul>
    </div>
    <script>
        Vue.component('todo-item',{
            props: ['content','index'],
            template: '<li @click="handleClick">{{content}}</li>',
            methods:{
                handleClick: function () {
                    this.$emit('delete',this.index)
                }
            }
        })
        new Vue({
            el:"#root",
            data:{
                inputValue: '',
                list:[]
            },
            methods:{
                handleSubmit: function () {
                    this.list.push(this.inputValue);
                    this.inputValue = '';
                },
                handleDelete: function (index) {
                    this.list.splice(index,1)
                }
            }
            
        })
    </script>
</body>
</html>
```




### template syntax


#### Attributes
```
v-bind

v-bind Shorthand（用冒号: 替代 v-bind: ）
<!-- shorthand -->
<a :href="url"> ... </a>

<!-- full syntax -->
<a v-bind:href="url"> ... </a>

<!-- shorthand with dynamic argument -->
<a :[key]="url"> ... </a>



eg:
<div v-bind:id="dynamicId"></div>
<button v-bind:disabled="isButtonDisabled">Button</button>

    //属性值有变量
<div v-bind:id="'list-' + id"></div>
```
##### Class and Style Bindings
```
    //class 里面直接是一个对象
<div :class="{ active: isActive }"></div>


    //You can have multiple classes toggled by having more fields in the object.
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>


    //We can pass an array to :class to apply a list of classes
<div :class="[activeClass, errorClass]"></div>

data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```


#### Directives


v-if 渲染或者不渲染某个元素
```
<p v-if="seen">Now you see me</p>
```

v-on
```
v-on Shorthand (用 @ 代替 v-on:)
<!-- shorthand -->
<a @click="doSomething"> ... </a>


<!-- full syntax -->
<a v-on:click="doSomething"> ... </a>


<!-- shorthand with dynamic argument -->
    // event 是一个变量，它的值可能是click、hover 等
<a @[event]="doSomething"> ... </a>



<h1 v-show="ok">Hello!</h1>

v-show 使用css 的显示与隐藏
v-if 是条件渲染

Prefer v-show if you need to toggle something very often, and prefer v-if if the condition is unlikely to change at runtime


When v-if and v-for are both used on the same element, v-if will be evaluated first. See the list rendering guide for details.
```


#### Modifiers
```
    // the .prevent modifier tells the v-on directive to call event.preventDefault() on the triggered event
<form v-on:submit.prevent="onSubmit">...</form>
```

### List Rendering
```
<ul id="array-rendering">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>


    // get optional second argument for the index of the current item
<ul id="array-with-index">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>


    //v-for with an Object
<ul id="v-for-object" class="demo">
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>

    //use a second argument for the property's name
<li v-for="(value, name) in myObject">
  {{ name }}: {{ value }}
</li>

    //And another for the index
<li v-for="(value, name, index) in myObject">
  {{ index }}. {{ name }}: {{ value }}
</li>


Note that it's not recommended to use v-if and v-for together.

<!-- This will throw an error because property "todo" is not defined on instance. -->

<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>


    // This can be fixed by moving v-for to a wrapping <template> tag

<template v-for="todo in todos" :key="todo.name">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```


this.content 就是 this.$data.content 的简写
```
data(){
    return {
      content: 1
    }
},
mounted() {
    setInterval(() => {
     this.content+=1
    }, 1000)
}
```

#### computed 和 methods的区别
computed: 当计算内容依赖的属性发生变更时，才会重新计算
methods: 只要页面重新渲染，就会重新计算



### vue 生命周期函数
```
beforeCreate(){
    //在实例生成之前执行
    console.log("beforeCreate")
},
created(){
    //在实例生成之后执行
    console.log("created")
},
beforeMount(){
    //在模版已经被编译成函数之后执行/在组件内容被渲染到页面之前执行
    console.log("beforeMount")
},
mounted(){
    //在组件内容被渲染到页面之后执行
    console.log("mounted")
},
beforeUpdate(){
    //当数据发生变化时，在组件内容更新完成之前执行
    console.log("beforeUpdate")
},
updated(){
    //当数据发生变化时，在组件内容更新完成之后执行
    console.log("updated")
},
beforeUnmount(){
    //组件销毁前
    console.log("beforeUnmount")
},
unmounted(){
    //组件销毁后
    console.log("unmounted")
}



```