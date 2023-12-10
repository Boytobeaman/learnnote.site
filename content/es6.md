---
title: "js es6, es6 spread operator"
metaTitle: "js es6, es6 spread operator"
metaDescription: "js es6, es6 spread operator"
---



### The Symbol Type
A JavaScript Symbol is a primitive datatype just like Number, String, or Boolean.

It represents a unique "hidden" identifier that no other code can accidentally access.
```
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};

let id = Symbol('id');
person[id] = 140353;
// Now person[id] = 140353
// but person.id is still undefined



// Symbols are always unique.
// If you create two symbols with the same description they will have different values:

Symbol("id") == Symbol("id"); // false
```

### es6 spread operator
The JavaScript spread operator (...) allows us to quickly copy all or part of an existing array or object into another array or object.
```
const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6];
const numbersCombined = [...numbersOne, ...numbersTwo];

//numbersCombined [1,2,3,4,5,6]
```
The spread operator is often used in combination with destructuring.

```
const numbers = [1, 2, 3, 4, 5, 6];

const [one, two, ...rest] = numbers;
// one 1
// two 2
// rest [3, 4, 5, 6]
```