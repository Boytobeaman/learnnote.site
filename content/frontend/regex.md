---
title: "regex, 正则表达式常用方法"
metaTitle: "regex 正则表达式常用方法"
metaDescription: "regex 正则表达式常用方法，正则表达式 group"
---


### RegExp Object
A regular expression is an object that describes a pattern of characters.

### Syntax
/pattern/modifiers;

#### example:
```
var patt = /w3schools/i
```


### Modifiers
Modifiers are used to perform case-insensitive and global searches:

Expression | Description
------------ | -------------
g | Perform a global match (find all matches rather than stopping after the first match)
i | Perform case-insensitive matching
m | Perform multiline matching

### Brackets
Brackets are used to find a range of characters:

Expression | Description
------------ | -------------
[abc] | Find any character between the brackets
[^abc] | Find any character NOT between the brackets
[0-9] | Find any character between the brackets (any digit)
[^0-9] | Find any character NOT between the brackets (any non-digit)
(x|y) | Find any of the alternatives specified


### Metacharacters
Metacharacters are characters with a special meaning:

Metacharacter | Description
------------ | -------------
. | Find a single character, except newline or line terminator
\w | Find a word character
\W | Find a non-word character
\d | Find a digit
\D | Find a non-digit character
\s | Find a whitespace character
\S | Find a non-whitespace character
\b | Find a match at the beginning/end of a word, beginning like this: \bHI, end like this: HI\b
\B | Find a match, but not at the beginning/end of a word
\0 | Find a NULL character
\n | Find a new line character
\f | Find a form feed character
\r | Find a carriage return character
\t | Find a tab character
\v | Find a vertical tab character
\xxx | Find the character specified by an octal number xxx
\xdd | Find the character specified by a hexadecimal number dd
\udddd | Find the Unicode character specified by a hexadecimal number dddd

### Quantifiers
Quantifier | Description
------------ | -------------
n+ | Matches any string that contains at least one n
n* | Matches any string that contains zero or more occurrences of n
n? | Matches any string that contains zero or one occurrences of n
n{X} | Matches any string that contains a sequence of X n's
n{X,Y} | Matches any string that contains a sequence of X to Y n's
n{X,} | Matches any string that contains a sequence of at least X n's  
n$ | Matches any string with n at the end of it
^n | Matches any string with n at the beginning of it
?=n | Matches any string that is followed by a specific string n
?!n  | Matches any string that is not followed by a specific string n


### 实现数字千分位分割 正则方法
```
let reg = /(\d)(?=(\d{3})+(?!\d))/g

let cc = '123456789'

dd = cc.replace(reg, '$1,')

console.log(dd)
```

### 实现数字千分位分割 js方法

```
function formatNum(num) {
  let numArr = num.toString().split('.');
  let numPrex = numArr[0]
  numPrex = numPrex.split("").reverse()
  let newPrex = [];

  for (var i = 0; i < numPrex.length; i++) {
    if (i%3 === 0 && i !== 0) {
      newPrex.push(",")
    }
    newPrex.push(numPrex[i])
  }

  newPrex = newPrex.reverse().join("");

  let newStr = '';
  if(numArr[1]){
    newStr = [newPrex, numArr[1]].join(".");
  }else{
    newStr = newPrex
  }
  return newStr
}
```


### 不能全是空格
```
可以包含空格，但不能全是空格
/^(?=.*\S).+$/
```

### 不能包含空格
```
a string consisting only of non-whitespaces
/^\S*$/
```



### match
match() method searches a string for a match against a regular expression, and returns the matches, as an Array object.

```
var str = "The rain in SPAIN stays mainly in the plain";
var res = str.match(/ain/gi);

//["ain", "AIN", "ain", "ain"]
```



### JS正则表达式的贪婪模式与非贪婪模式

```
var a = 'how !dare you! I have !an! apple'
var b = /!.+!/

想要结果
['!dare you!','!an!']


但却得到
['!dare you! I have !an!']




```
#### 正则表达式的匹配方式-贪婪模式(贪婪模式也是正则表达式的默认匹配方式)

首先寻找的是一个感叹号!
![regexp](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/regexp-a.jpg)


匹配到！后，他会继续向后匹配感叹号，但是后面的是字母d，不是感叹号，于是/!.+!/正则就会开始匹配.，而.这个符号可以匹配除换行符外的全部字符，于是它就一直匹配到了最后，直到文本结束：
![regexp](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/regexp-b.jpg)

.号匹配完毕后，开始匹配后面的!，于是正则/!.+!/开始往回匹配感叹号!，一直匹配到an后面的!，发现符合规则了，于是匹配出来的就是这一串字符串!dare you! I have !an!
![regexp](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/regexp-c.jpg)


#### 非贪婪模式的匹配方式
```
var b = /!.+?!/g

其中，g表示采用全局匹配的模式进行匹配，而?则会使该正则式使用非贪婪模式进行匹配，该正则就会以最小的.的重复数进行匹配。

? 通常加在 量词的后面 如 +
```

非贪婪模式的匹配方式:

与贪婪模式一样先匹配!，然后进行.的匹配，但是与贪婪模式不同的是，它每匹配一次.，就会往后匹配一次!，于是就出现了如下图的结果：

![regexp](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/regexp-d.jpg)


然后匹配成功了后面的!后，因为g是全局匹配，所以该正则又会从头开始匹配第一个!，到了!an!后，匹配成功第一个!和两个.，以及后面的!，于是!an!也被匹配上了，然后该正则又剩下的字符串开始从新匹配，而后面因为不能匹配出第一个!，于是就没有匹配出来：
![regexp](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/regexp-e.jpg)

总结:
正则中的?可以使正则式采用非贪婪模式进行匹配；


### 先行断言(lookahead)和后行断言(lookbehind)
Sometimes we need to find only those matches for a pattern that are followed or preceded by another pattern.

Pattern | Type | Matches
------------ | ------------- | -------------
X(?=Y) | Positive lookahead 正向先行断言 | X if followed by Y
X(?!Y) | Negative lookahead 负向先行断言 | X if not followed by Y
(?<=Y)X | Positive lookbehind 正向后行断言 | X if after Y
(?<!Y)X | Negative lookbehind 负向后行断言 | X if not after Y

// Lookbehind browser compatibility
Please Note: Lookbehind is not supported in non-V8 browsers, such as Safari, Internet Explorer.

```
Positive Lookahead

let str = "1 turkey costs 30€";
alert( str.match(/\d+(?=€)/) ); // 30, the number 1 is ignored, as it's not followed by €


Negative lookahead

let str = "2 turkeys cost 60€";
alert( str.match(/\d+\b(?!€)/g) ); // 2 (the price is not matched)


Positive Lookbehind

let str = "1 turkey costs $30";
// the dollar sign is escaped \$
alert( str.match(/(?<=\$)\d+/) ); // 30 (skipped the sole number)


Negative lookbehind

let str = "2 turkeys cost $60";
alert( str.match(/(?<!\$)\b\d+/g) ); // 2 (the price is not matched)
```

####  Capture the lookaround expression in Capturing groups
in some situations we might want to capture the lookaround expression as well, or a part of it. That’s possible. Just wrap that part into additional parentheses.
```
let str = "1 turkey costs 30€";
let regexp = /\d+(?=(€|kr))/; // extra parentheses around €|kr

alert( str.match(regexp) ); // 30, €
```


### 除掉特殊字符
```
//去掉回车换行        
str = str.replace(/[\r\n]/g,"");


//去掉空格
str = str.replace(/\ +/g,"");
```


### JavaScript exec() Method
The exec() method tests for a match in a string.   
This method returns the matched text if it finds a match, otherwise it returns null.

```
// The string:
var str = "Hello world!";

// Look for "Hello"
var patt = /Hello/g;
var result = patt.exec(str);

//["Hello", index: 0, input: "Hello world!", groups: undefined]
```


### 分组 Using groups ()
```javascript
let personList = `First_Name: John, Last_Name: Doe
First_Name: Jane, Last_Name: Smith`;

let regexpNames =  /First_Name: (\w+), Last_Name: (\w+)/mg;
let match = regexpNames.exec(personList);

console.log(`Hello ${match[1]} ${match[2]}`);
// Hello John Doe
```

### Using named groups 命名的分组 

```javascript
//(?<groupName>表达式)

let personList = `First_Name: John, Last_Name: Doe
First_Name: Jane, Last_Name: Smith`;

let regexpNames = /First_Name: (?<firstname>\w+), Last_Name: (?<lastname>\w+)/mg;
let match = regexpNames.exec(personList);

// match
// 0: "First_Name: John, Last_Name: Doe"
// 1: "John"
// 2: "Doe"
// groups:
// firstname: "John"
// lastname: "Doe"
// index: 0
// input: "First_Name: John, Last_Name: Doe"
// length: 3
```


### 特殊字符的转义


#### Character Classes or Character Sets
With a “character class”, also called “character set”, 
you can tell the regex engine to match only one out of several characters. 
Simply place the characters you want to match between square brackets. 
If you want to match an a or an e, use [ae]. You could use this in gr[ae]y to match either gray or grey. 
```
//（一个字符集只匹配一个字符）
A character class matches only a single character. 
gr[ae]y does not match graay, graey or any such thing. 

//(方括号里面的顺序不重要)
The order of the characters inside a character class does not matter. The results are identical.

//（可以用中划线 表示一个范围）
You can use a hyphen inside a character class to specify a range of characters. 
[0-9] matches a single digit between 0 and 9. 
```



#### Negated Character Classes
Typing a caret after the opening square bracket negates the character class.
The result is that the character class matches any character that is not in the character class

It is important to remember that a negated character class still must match a character.  
q[^u] does not mean: “a q not followed by a u”.   
It means: “a q followed by a character that is not a u”.  
It does not match the q in the string Iraq. It does match the q and the space after the q in Iraq is a country. 

```
To include an unescaped caret as a literal, place it anywhere except right after the opening bracket. 
[x^] matches an x or a caret. 


```

### 反斜线 backslash
```
To include a backslash as a character without any special meaning inside a character class, you have to escape it with another backslash.
[\\x] matches a backslash or an x
```

### 中划线
```
（字符集中如果有中划线，如果他们不能形成范围，那么这个中划线就被解释为 中划线（本身字符）或者 错误）
Hyphens at other positions in character classes where they can’t form a range may be interpreted as literals or as errors

The hyphen can be included right after the opening bracket, or right before the closing bracket, or right after the negating caret. 
Both [-x] and [x-] match an x or a hyphen. [^-x] and [^x-] match any character that is not an x or a hyphen
```

#### Repeating Character Classes
```
If you repeat a character class by using the ?, * or + operators, 
you’re repeating the entire character class. You’re not repeating just the character that it matched. 

The regex [0-9]+ can match 837 as well as 22
```


### variable in regexp 正则中使用变量

```
const originwithoutwww = 'a.com';
const regexp = new RegExp(`(https?:\/\/)?(www\.)?${originwithoutwww}`, 'gi')


正则
/[abc]/

new RegExp("[abc]")
可以提取 字符串abc作为变量

let str = 'abc'
reg = new RegExp("[" + str + "]")


eg:
let input = `kd dd[  ()djk[`;

// 去掉空格 换行 （）【】{}()｛｝[]［］,，。./、   注意有些需要转译一下比如 \s (空格)要变为 \\s
let str = `\\s\\r\\n（）【】{}()｛｝\\[\\]［］,，。\.\/、`;
let reg = new RegExp("[" + str + "]", "g");

let newInput = input.replace(reg, '')
```