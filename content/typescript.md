#### what is typescript
TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript.


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



### interface  & type

Describe the shape of objects and functions
```
interface User {
  id: number
  firstName: string
  lastName: string
  role: string
}

function updateUser(id: number, update: Partial<User>) {
  const user = getUser(id)
  const newUser = {...user, ...update}  
  saveUser(id, newUser)
}
```

### You can use interfaces to annotate parameters and return values to functions:
```
```