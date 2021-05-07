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