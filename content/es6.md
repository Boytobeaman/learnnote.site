---
title: "js es6"
metaTitle: "js es6"
metaDescription: "js es6"
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