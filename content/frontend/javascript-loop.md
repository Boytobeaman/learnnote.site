---
title: "js loop"
metaTitle: "javascript loop"
metaDescription: "javascript loop, js 遍历，js 循环"
---

### The For Loop

#### syntax
```
for (statement 1; statement 2; statement 3) {
  // code block to be executed
}

Statement 1 is executed (one time) before the execution of the code block.

Statement 2 defines the condition for executing the code block.

Statement 3 is executed (every time) after the code block has been executed.
```
#### Example
```
for (let i = 0; i < 5; i++) {
  text += "The number is " + i + "<br>";
}
```

#### 说明
```
for loop 有顺序关系，由第一个到最后一个
可以有 关键字
break 结束整个循环
continue 跳过某个循环
```




### For In Loop

#### Syntax
```
for (key in object) {
  // code block to be executed
}
```
#### Example
```
const person = {fname:"John", lname:"Doe", age:25};

for (let x in person) {
  console.log(`${x}: ${person[x]}`);
}
```

#### 对应继承了父类的对象，我们只想要获取它本身的属性，不需要它继承的属性
```
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

User.prototype.isBoss = false;

let obj = new User("Jack");

for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(`own property-- ${key}: ${obj[key]}`);
  }
}
//这样就不会打印出 isBoss 这个继承来的属性
```

#### 说明
```
For…In
可以有 关键字
break 结束整个循环
continue 跳过某个循环

Note: The for...in loop executes in an arbitrary order and should not be relied upon if you need to loop in a specific order.
用它循环对象，循环出来的属性顺序并不可靠，所以不要在 for...in 中做依赖对象属性顺序的逻辑判断

比如下面的属性"1",会在name和isAdmin属性之前打印
function User(name) {
  this.name = name;
  this.isAdmin = false;
  this[1] = "1";
}
```

#### for...in loop on Arrays
```
const arr = ['cat', 'dog', 'fish'];
for (let i in arr) {  
  console.log(arr[i])
}
// cat
// dog
// fish
```

#### for...in on strings
```
const string = 'hello';
for (let character in string) {  
  console.log(string[character])
}
// h
// e
// l
// l
// o
```


### For Of Loop
The JavaScript for of statement loops through the values of an iterable object

是目前遍历数组最好的方法，可以用在set，map，类数组，字符串上

可以使用 break 语句跳出整个循环, continue 跳过某个循环
#### Syntax
```
for (variable of iterable) {
  // code block to be executed
}
```

#### For Of 不支持原生的Object遍历
```
// 遍历的对象 objArr 不能是原生的对象，比如 { fname: "John", lname: "Doe", age: 25 }
for(let value of objArr){
    console.log(value)
}

let arr = ['China', 'America', 'Korea']
for (let o of arr) {
    console.log(o) //China, America, Korea
}
```

#### 如果要遍历原生对象，可以借用Object.keys 方法
```
// 输出对象自身可以枚举的值
for (let key of Object.keys(someObject)) {
  console.log(key + ": " + someObject[key]);
}
```
#### Looping over a String
```
let language = "JavaScript";

for (let x of language) {
  console.log(x);
}
//J 
//a
//v
//a
...
//p
//t
```



### While Loop
The while loop loops through a block of code as long as a specified condition is true.

#### Syntax
```
while (condition) {
  // code block to be executed
}
```

#### Example
```
let i = 0;
while (i < 10) {
  console.log(`The number is ${i}`)
  i++;
}
```

### Do While Loop
The do while loop is a variant of the while loop. This loop will execute the code block once, before checking if the condition is true, then it will repeat the loop as long as the condition is true.

至少执行一次

#### Syntax
```
do {
  // code block to be executed
}
while (condition);
```

#### example
```
let i = 0;
do {
  console.log(`The number is ${i}`);
  i++;
}
while (i < 10);
```




### forEach
forEach is an Array method that we can use to execute a function on each element in an array. It can only be used on Arrays, Maps, and Sets.