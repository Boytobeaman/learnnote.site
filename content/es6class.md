---
title: "js class"
metaTitle: "js class 原理，es6 class"
metaDescription: "js class 原理，es6 class"
---



### feature

#### 类的本质还是一个函数，类就是构造函数的另一种写法。
```
function Star(){}
console.log(typeof Star); //function

class Star {}
console.log(typeof Star); //function
```

#### ES6中类没有变量提升
通过构造函数创建实例，是可以变量提升的。 es6中的类，必须先有类，才可以实例化。


#### 类的所有方法都定义在类的prototype属性上面,也就是所有实例公用的

实例方法需要先实例化(new)类，拿到对象之后才能调用
```
class Father{
    constructor(name){
        this.name = name;
    }
    sing(){
        return this.name;
    }
}
let red = new Father('小红');
let green = new Father('小绿');
console.log(red.sing === green.sing); //true
```

#### 类的 static 静态方法
静态方法不用实例化即可通过类名.方法名()来调用

```
class Book {
  constructor(title, author, year){
    this.title = title;
    this.author = author;
    this.year = year;
  }
  getSummary(){
    return `${this.title} was written by ${this.author}`
  }
  static topBookStore(){
    //静态方法里面拿不到实例的属性
    console.log(this.title)

    return `Barnes & Noble`
  }
}

console.log(Book.topBookStore())

// 静态方法里面拿不到实例的属性,但可以在调用时通过参数的形式传进去
static topBookStore(book){
  console.log(book.title)

  return `Barnes & Noble`
}
let book1 = new Book("book one", "author one", "2019")
console.log(Book.topBookStore(book1))



// 静态方法里面可以拿到实例的静态属性,
// 静态方法本质是类的方法

static a = "a value"
static topBookStore(book){
  console.log(book.title)
  console.log(this.a)
  //可以获取 a value

  return `Barnes & Noble`
}
```