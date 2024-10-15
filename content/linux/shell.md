---
title: "shell 命令"
metaTitle: "shell 命令"
metaDescription: "shell 命令"
---


### Shell 环境
Shell 编程跟 JavaScript、php 编程一样，只要有一个能编写代码的文本编辑器和一个能解释执行的脚本解释器就可以了。

Linux 的 Shell 种类众多，常见的有：
* Bourne Shell（/usr/bin/sh或/bin/sh）
* Bourne Again Shell（/bin/bash）
* C Shell（/usr/bin/csh）
* K Shell（/usr/bin/ksh）
* Shell for Root（/sbin/sh）

本教程关注的是 Bash，也就是 Bourne Again Shell，由于易用和免费，Bash 在日常工作中被广泛使用。同时，Bash 也是大多数Linux 系统默认的 Shell。  
在一般情况下，人们并不区分 Bourne Shell 和 Bourne Again Shell，所以，像 #!/bin/sh，它同样也可以改为 #!/bin/bash

#! 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序。


### 脚本解释器
#! 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种 Shell。
```
#!/bin/bash
echo "Hello World !"
```


### 运行 Shell 脚本有两种方法：
#### 作为可执行程序
```
chmod +x ./test.sh  #使脚本具有执行权限
./test.sh  #执行脚本
```
#### 作为解释器参数
这种运行方式是，直接运行解释器，其参数就是 shell 脚本的文件名，如：
```
/bin/sh test.sh
/bin/php test.php
```


### Shell 变量
定义变量时，变量名不加美元符号（$，PHP语言中变量需要），如：
```
your_name="runoob"
```
注意：变量名和等号之间不能有空格，这可能和你熟悉的所有编程语言都不一样。
正确示例：  
```
WEBSITE_DOMAIN="www.chatgpt-use.com"
LD_LIBRARY_PATH="/bin/"
_var="123"
var2="abc"
```
无效的变量命名：
```
# 避免使用if作为变量名
if="some_value"
# 避免使用 $ 等特殊符号
variable_with_$=42
?var=123
user*name=runoob
# 避免空格
variable with space="value"
```

### 使用变量
使用一个定义过的变量，只要在变量名前面加美元符号即可，如：
```
your_name="qinjx"
echo $your_name
echo ${your_name}
//变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界
```

已定义的变量，可以被重新定义
```
your_name="tom"
echo $your_name
your_name="alibaba"
echo $your_name
```

#### 只读变量
使用 readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变。

下面的例子尝试更改只读变量，结果报错：
```
#!/bin/bash

myUrl="https://www.google.com"
readonly myUrl
myUrl="https://www.runoob.com"
```

删除变量
```
unset variable_name
```


### 条件判断
#### if Statement
```
#!/bin/bash  
  
# Define a variable  
NUMBER=3  
  
# Check if the number is greater than 5  
if [ $NUMBER -gt 5 ]; then  
    echo "The number is greater than 5."  
else  
    echo "The number is not greater than 5."  
fi  
```

#### if-else Statement
```
#!/bin/bash  
  
# Define a variable  
NUMBER=3  
  
# Check if the number is greater than 5  
if [ $NUMBER -gt 5 ]; then  
    echo "The number is greater than 5."  
else  
    echo "The number is not greater than 5."  
fi  

```

#### if-elif-else Statement
```
#!/bin/bash  
  
# Define a variable  
NUMBER=5  
  
# Check different conditions  
if [ $NUMBER -gt 5 ]; then  
    echo "The number is greater than 5."  
elif [ $NUMBER -eq 5 ]; then  
    echo "The number is equal to 5."  
else  
    echo "The number is less than 5."  
fi
```


### function
```
#!/bin/bash  
  
# Define the function  
greet() {  
    echo "Hello"  
}  
  
# Call the function  
greet
```

### function with parameter
```
#!/bin/bash  
  
# Define the function  
greet() {  
    echo "Hello, $1!"  
}  
  
# Call the function  
greet "Alice"  

// output
// Hello, Alice!
```

#### More Complex Function
```
#!/bin/bash  
  
# Function to add two numbers  
add_numbers() {  
    local sum=$(( $1 + $2 ))  # Calculate the sum  
    echo $sum                 # Print the sum  
}  
  
# Call the function and capture the output  
result=$(add_numbers 5 10)  
  
# Print the result  
echo "The sum is: $result"  

```