---
title: "typescript 学习"
metaTitle: "typescript 学习"
metaDescription: "typescript 学习"
---



#### what is typescript
TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript.


### 安装typescript
首先要安装好 nodejs
```
npm install -g typescript

tsc -v
//Version 4.2.4
//测试是否安装成功
```

### typescript 基本数据类型

```
boolean
string
number
array
tuple
enum (枚举)
null
undefined
object
void
never
any
```


#### 类型举例
```
tuple: 元组 固定类型+长度的数组
const teacherInfo: [string, string, number] = ["xiaoming", "male", 25]



enum: 枚举 罗列出来的所有情况 常量
enum Direction{
  up,
  down,
  left,
  right
}

console.log(Direction.up)
// 0

console.log(Direction[0])
// up



enum StatusCodes {
  NotFound = 404,
  Success = 200,
  Accepted = 202,
  BadRequest = 400
}
// logs 404
console.log(StatusCodes.NotFound);
// logs 200
console.log(StatusCodes.Success);
```

### typescript 高级类型
```
union （组合类型）
Nullable （可空类型）
Literal (预定义类型)


let literal_type: 1 | 2 | 3;
literal_type = 1;
(只能在 1，2，3 中取值)
```

### 编译 typescript 到JavaScript
```
tsc typescript文件

eg:
tsc index.ts
会默认生成 index.js 文件

tsc -p typescript
```

### 编译配置
```
tsconfig.json 文件

{
  "compilerOptions": {
    "target": "esnext"
  }
}

// 有些es6 的语法比如async await就会支持, 不会被编译成一堆内容了
```

### 声明变量时指定类型
```
var name: string = "zhangshan"

name = 13
//这里会报错，因为不是string 类型


var alias: any = "any type";
// alias 可以为任意类型的变量

var age: number = 13

var man: boolean = true

function test(): void {
  return "";
  // 这里会报错，void表示函数无返回值
}

// 参数声明类型
function test(name:string): string {
  return "";
}


//可选参数? ,参数默认值=
function test(a: string, b?: string, c: string="jojo"){
  console.log(a)
  console.log(b)
  console.log(c)
}
```

### 指定函数返回值
```
function test(): void {
  return "";
  // 这里会报错，void表示函数无返回值
}

```

### 参数声明类型
```
function test(name:string): string {
  return "";
}


//可选参数? ,参数默认值=
function test(a: string, b?: string, c: string="jojo"){
  console.log(a)
  console.log(b)
  console.log(c)
}
```

### async 函数范围为 Promise类型，且promise resolve的值为 string 类型
```
async function test(name:string): Promise<string> {
  return new Promise((resolve,reject) =>{
    setTimeout(() =>{
      resolve("4")
    })
  });
}
```

### 类型适配（类型断言） type assersions
```
let message: any;
message = 'abc';
message.endsWith("c")

let dd  = (<string>message).endsWith("c")
let ddd = (message as string).endsWith("c")
```

### Everyday Types
```
let a: string = "Hello, world";

let a: number = 42;

let a: boolean = false;

let a: string[] = ["a","b"];

let a: number[] = [1, 2, 3];
let a: Array<number> = [1, 2, 3];


let obj: any = { x: 0 };


```

### Union Types
TypeScript’s type system allows you to build new types out of existing ones using a large variety of operators. Now that we know how to write a few types, it’s time to start combining them in interesting ways.
```
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
```

### Type Aliases
use the same type more than once and refer to it by a single name
```
type Point = {
  x: number;
  y: number;
};

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

### async 函数范围为 Promise类型，且promise resolve的值为 string 类型
```
async function test(name:string): Promise<string> {
  return new Promise((resolve,reject) =>{
    setTimeout(() =>{
      resolve("4")
    })
  });
}
```



### interface
An interface declaration is another way to name an object type
```
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```




#### describe this object’s shape using an interface declaration
```
// js
const user = {
  name: "Hayes",
  id: 0,
};

// ts
interface User {
  name: string;
  id: number;
}

const user: User = {
  name: "Hayes",
  id: 0,
};

```
#### You can use interfaces to annotate parameters and return values to functions:
```
function deleteUser(user: User) {
  // ...
}

function getAdminUser(): User {
  //...
}
```

### Differences Between Type Aliases and Interfaces
A type cannot be re-opened to add new properties vs an interface which is always extendable.

#### Extending an interface
```
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey
```

#### Extending a type via intersections
```
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: Boolean 
}

const bear = getBear();
bear.name;
bear.honey;
```

#### Adding new fields to an existing interface
```
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```
#### Utility Types
TypeScript provides several utility types to facilitate common type transformations. These utilities are available globally.

##### Partial
```
Partial<Type>
Constructs a type with all properties of Type set to optional. This utility will return a type that represents all subsets of a given type.


/* 部分对象 Partial */

interface User {
  name: string;
  age: number;
  occupation: string;
}

export const users: User[] = [
  {
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep"
  },
  {
    name: "Wilson",
    age: 23,
    occupation: "Ball"
  }
];

type Criteria = {
  [Property in keyof User]?: User[Property];
};

// 等同于
// type Criteria = Partial<User>;

export const filterUsers = (users: User[], criteria: Criteria): User[] =>
  users.filter((user) => {
    const criteriaKeys = Object.keys(criteria) as (keyof Criteria)[];
    return criteriaKeys.every((fieldName) => {
      return user[fieldName] === criteria[fieldName];
    });
  });

const usersOfAge23 = filterUsers(users, {
  age: 23
});
```

#### Required
```
Required<Type>
Constructs a type consisting of all properties of Type set to required. The opposite of Partial.

```
#### Readonly
```
Readonly<Type>
Constructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned.
```
#### Record
```
Record<Keys,Type>
Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.
```
#### Pick
```
Pick<Type, Keys>
Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type.
```

#### Omit
```
Omit<Type, Keys>
Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals).
```
#### Exclude
```
Exclude<Type, ExcludedUnion>
Constructs a type by excluding from Type all union members that are assignable to ExcludedUnion.
```

#### Extract
```
Extract<Type, Union>
Constructs a type by extracting from Type all union members that are assignable to Union.
```

#### NonNullable
```
NonNullable<Type>
Constructs a type by excluding null and undefined from Type.
```


### 什么是 *.d.ts 文件-声明文件，它有什么作用？
我们很多项目依然是js作为主力开发的语言。那么当我们也想享受TS带来的便利，或者当我们新的项目想使用TS无法兼容旧的js库时。我们应该怎么做呢？答案就是d.ts


如旧的js 代码库 math.js
```
// math.js
const sum = (a, b) => a + b

export { sum }
```
TypeScript 没有关于函数的任何信息，包括名称、参数类型。为了在 TypeScript 文件中使用该函数，我们在 d.ts 文件中提供其定义：
```
// math.d.ts
declare function sum(a: number, b: number): number
```
现在，我们可以在 TypeScript 中使用该函数，而不会出现任何编译错误。  


对于d.ts有三种方式来使用它为我们的js代码添加类型信息。
##### 在原本的js文件路径添加同名.d.ts文件
编辑器会在你导入文件时寻找到同一路径下的d.ts文件，并将你声明的类型信息和你的js文件相对应。 
优点：简单方便。 
缺点：文件多了之后不便于管理。 

##### 在package.json当中指定types文件夹
你可以在项目的package.json当中通过types属性指定你的类型信息路径。编辑器依然会正确识别你导入文件的同名.d.ts文件中声明的类型信息。
优点：集中管理不和其他文件混杂  
缺点：仅适用于为自己发布的npm包有效。  

##### 编写专门的@types包
我们可以通过单独为我们的包编写另一个types包，另立一个项目。编辑器会自动从node_modules文件夹下查找@types文件夹中对应的项目来获取类型信息。这种方式一般适用于为不在自己掌握的第三方库添加类型信息。

优点：能适用于第三方库  
缺点：维护成本较大




### Generics
Generics allow creating 'type variables' which can be used to create classes, functions & type aliases that don't need to explicitly define the types that they use.  
Generics makes it easier to write reusable code.
```
function createPair<S, T>(v1:S, v2:T): [S, T]{
    return [v1, v2]
}

createPair<string, number>("hello",10);
createPair<boolean, string>(true, "真的");

// 这里 createPair 使用泛型，可以适应更多的参数场景
```

### question

如何在局部共享 interface
比如目录下有文件, index 和 addTeacherForm 中都要用到 TeacherDataType
```
+-- Teacher
|   +-- index.tsx
|   +-- addTeacherForm.tsx
```




### typescript 面试题


#### 列出TypeScript中的内置数据类型
```
Number：代表数字类型的值。 这些数字在TypeScript中存储为浮点值。
String：字符串表示存储为Unicode UTF-16代码的一系列字符。
Boolean：代表逻辑值。 当我们使用布尔类型时，我们只能获得true或false的输出。
Null：Null表示变量，其值未定义。 无法直接引用空类型值本身。
Undefined：未定义类型表示所有未初始化的变量。
Void：无效是不返回任何类型值的函数的返回类型。
```