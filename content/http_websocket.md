---
title: "常见网络协议"
metaTitle: "什么是 http, websocket, 常见网络协议"
metaDescription: "什么是 http, websocket, 常见网络协议"
---

### TCP是什么？
```
TCP（Transmission Control Protocol 传输控制协议）是一种面向连接的、可靠的、基于字节流的传输层通信协议。
```

```
ACK ： TCP协议规定，只有ACK=1时有效，也规定连接建立后所有发送的报文的ACK必须为1

SYN(SYNchronization) ： 在连接建立时用来同步序号。当SYN=1而ACK=0时，表明这是一个连接请求报文。对方若同意建立连接，则应在响应报文中使SYN=1和ACK=1. 因此, SYN置1就表示这是一个连接请求或连接接受报文。
```
![http three times handshake](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/three-times-handshake.jpeg "three-times-handshake")

```
第一次握手：建立连接。客户端发送连接请求报文段，将SYN位置为1，Sequence Number为x；然后，客户端进入SYN_SEND状态，等待服务器的确认；

第二次握手：服务器收到SYN报文段。服务器收到客户端的SYN报文段，需要对这个SYN报文段进行确认，设置Acknowledgment Number为x+1(Sequence Number+1)；同时，自己自己还要发送SYN请求信息，将SYN位置为1，Sequence Number为y；服务器端将上述所有信息放到一个报文段（即SYN+ACK报文段）中，一并发送给客户端，此时服务器进入SYN_RECV状态；

第三次握手：客户端收到服务器的SYN+ACK报文段。然后将Acknowledgment Number设置为y+1，向服务器发送ACK报文段，这个报文段发送完毕以后，客户端和服务器端都进入ESTABLISHED状态，完成TCP三次握手。

完成了三次握手，客户端和服务器端就可以开始传送数据。以上就是TCP三次握手的总体介绍。
```

### https
![how https work](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/how-https-work.jpg "how https work")

1. 客户端发起HTTPS请求 这个没什么好说的，就是用户在浏览器里输入一个HTTPS网址，然后连接到服务端的443端口。
1. 服务端的配置
采用HTTPS协议的服务器必须要有一套数字证书，可以自己制作，也可以向组织申请。区别就是自己颁发的证书需要客户端验证通过，才可以继续访问，而使用受信任的公司申请的证书则不会弹出提示页面。这套证书其实就是一对公钥和私钥。如果对公钥不太理解，可以想象成一把钥匙和一个锁头，只是世界上只有你一个人有这把钥匙，你可以把锁头给别人，别人可以用这个锁把重要的东西锁起来，然后发给你，因为只有你一个人有这把钥匙，所以只有你才能看到被这把锁锁起来的东西。
1. 传送证书 这个证书其实就是公钥，只是包含了很多信息，如证书的颁发机构，过期时间等等。
1. 客户端解析证书
这部分工作是由客户端的SSL/TLS来完成的，首先会验证公钥是否有效，比如颁发机构，过期时间等等，如果发现异常，则会弹出一个警示框，提示证书存在的问题。如果证书没有问题，那么就生成一个**随机值**。然后用证书（也就是公钥）对这个随机值进行加密。就好像上面说的，把随机值用锁头锁起来，这样除非有钥匙，不然看不到被锁住的内容。
1. 传送加密信息 这部分传送的是用证书加密后的随机值，目的是让服务端得到这个随机值，以后客户端和服务端的通信就可以通过这个随机值来进行加密解密了。
1. 服务端解密信息
服务端用私钥解密后，得到了客户端传过来的随机值，然后把内容通过该随机值进行**对称加密**，将信息和私钥通过某种算法混合在一起，这样除非知道私钥，不然无法获取内容，而正好客户端和服务端都知道这个私钥，所以只要加密算法够彪悍，私钥够复杂，数据就够安全。
1. 传输加密后的信息 这部分信息就是服务端用私钥加密后的信息，可以在客户端用随机值解密还原。
1. 客户端解密信息 客户端用之前生产的私钥解密服务端传过来的信息，于是获取了解密后的内容。整个过程第三方即使监听到了数据，也束手无策。


#### 最后的第六步数据传输是 对称加密，为什么？
公私钥加密（非对称加密）计算量特别大，特别复杂，所以就换了对称加密加密数据，公钥只用来加密对称密钥。


#### 常见加密算法及分类
```
对称加密：DES、3DES、TDEA、Blowfish、RC2、RC4、RC5、IDEA、SKIPJACK、AES。

非对称加密：RSA、ECC（椭圆曲线加密算法）、Diffie-Hellman、El Gamal、DSA（数字签名用）

Hash 算法：MD2、MD4、MD5、HAVAL、SHA-1、SHA256、SHA512、RipeMD、WHIRLPOOL、SHA3、HMAC
```



#### 对称加密
同一个密钥（secret key）可以同时用作信息的加密（encrypt）和解密（decrypt），这种加密方法称为对称加密，也称为单密钥加密。 
常见的对称加密算法：DES，AES等。

#### 对称加密优缺点
对称加密相比非对称加密算法来说，加解密的效率要高得多、加密速度快。但是缺陷在于对于密钥的管理和分发上比较困难，不是非常安全，密钥管理负担很重。



#### 非对称加密
指的是加、解密使用不同的密钥，一把作为公开的公钥，另一把作为私钥。公钥加密的信息，只有私钥才能解密。反之，私钥加密的信息，只有公钥才能解密。  
最常用的非对称加密算法：RSA

Public-key cryptography, or asymmetric cryptography, is a cryptographic system that uses pairs of keys: public keys which may be disseminated widely, and private keys which are known only to the owner.

#### 使用非对称加密方案的登录流程
1. 远程Server收到Client端用户TopGun的登录请求，Server把自己的公钥发给用户。
1. Client使用这个公钥，将密码进行加密。
1. Client将加密的密码发送给Server端。
1. 远程Server用自己的私钥，解密登录密码，然后验证其合法性。
1. 若验证结果，给Client相应的响应。


***
私钥是Server端独有，这就保证了Client的登录信息即使在网络传输过程中被窃据，也没有私钥进行解密，保证了数据的安全性，这充分利用了非对称加密的特性。
***

#### 这样就一定安全了吗？
Client端如何保证接受到的公钥就是目标Server端的？，如果一个攻击者中途拦截Client的登录请求，向其发送自己的公钥，Client端用攻击者的公钥进行数据加密。攻击者接收到加密信息后再用自己的私钥进行解密，不就窃取了Client的登录信息了吗？这就是所谓的中间人攻击

#### SSH中是如何解决这个问题的？
##### 1.基于口令的认证

问题就在于如何对Server的公钥进行认证？在https中可以通过CA来进行公证，可是SSH的publish key和private key都是自己生成的，没法公证。只能通过Client端自己对公钥进行确认。通常在第一次登录的时候，系统会出现下面提示信息：
```
The authenticity of host 'ssh-server.example.com (12.18.429.21)' can't be established.
RSA key fingerprint is 98:2e:d7:e0:de:9f:ac:67:28:c2:42:2d:37:16:58:4d.
Are you sure you want to continue connecting (yes/no)? 
```
如果输入yes后，会出现下面信息：
```
Warning: Permanently added 'ssh-server.example.com,12.18.429.21' (RSA) to the list of known hosts. 
Password: (enter password) 
```
该host已被确认，并被追加到文件known_hosts中，然后就需要输入密码，之后的流程就按流程进行。

#####  2.基于公钥认证 （比如git SSH）
在上面介绍的登录流程中可以发现，每次登录都需要输入密码，很麻烦。SSH提供了另外一种可以免去输入密码过程的登录方式：公钥登录。
1. Client将自己的公钥存放在Server上，追加在文件authorized_keys中。
1. Server端接收到Client的连接请求后，会在authorized_keys中匹配到Client的公钥pubKey，并生成随机数R，用Client的公钥对该随机数进行加密得到pubKey(R)
，然后将加密后信息发送给Client。
1. Client端通过私钥进行解密得到随机数R，然后对随机数R和本次会话的SessionKey利用MD5生成摘要Digest1，发送给Server端。
1. Server端会也会对R和SessionKey利用同样摘要算法生成Digest2。
1. Server端会最后比较Digest1和Digest2是否相同，完成认证过程。

### SSH
Secure Shell（SSH）是一种加密网络协议，用于在不安全的网络上安全地运行网络服务。利用SSH可以实现加密并安全地远程登录计算机系统。
#### SSH-涉及文件
文件 | 说明
------------ | -------------
id_rsa | 保存私钥
id_rsa.pub | 保存公钥
authorized_keys | 保存已授权的客户端公钥
known_hosts | 保存已认证的远程主机ID

#### SSH 服务端配置
检测ssh服务是否启动 ： 
netstat -ntlp | grep ssh

如果ssh服务没有启动：
systemctl restart sshd.service


添加客户端公钥，将客户端的公钥文件中的内容添加到 /root/.ssh/authorized_keys
vim /root/.ssh/authorized_keys

修改配置文件
vim /etc/ssh/sshd_config
要把PubkeyAuthentication配置为 yes 允许使用基于密钥认证的方式登录

连接：
使用默认的ssh秘钥对连接：
ssh username@host -p port
eg:
ssh root@34.213.2*.224

指定秘钥对的ssh连接 ： 
ssh -i parivate-rsa-path username@host -p port
eg:
ssh -i C:/Users/86185/.ssh/id_rsa root@34.213.2*.224

注意：这里是parivate-rsa-path，私钥，这里客户端要用私钥解密 服务端加密来的信息（上面 基于公钥认证 第三步）
***
![generation of asymmetric keys](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/generation-of-asymmetric-keys.jpg "generation of asymmetric keys")
An unpredictable (typically large and random) number is used to begin generation of an acceptable pair of keys suitable for use by an asymmetric key algorithm.

![send content using asymmetric keys](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/send-content-using-asymmetric-keys.jpg "send content using asymmetric keys")
In an asymmetric key encryption scheme, anyone can encrypt messages using the public key, but only the holder of the paired private key can decrypt. Security depends on the secrecy of the private key.



![Diffie Hellman key exchange](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/Diffie-Hellman-key-exchange.jpg "Diffie Hellman key exchange")
In the Diffie–Hellman key exchange scheme, each party generates a public/private key pair and distributes the public key. After obtaining an authentic copy of each other's public keys, Alice and Bob can compute a shared secret offline. The shared secret can be used, for instance, as the key for a symmetric cipher.


![verify the message has not been modified](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/verify-the-message-has-not-been-modified.jpg "verify the message has not been modified")
In this example the message is only digitally signed and not encrypted. 1) Alice signs a message with her private key. 2) Bob can verify that Alice sent the message and that the message has not been modified.



### ssh xshell 连接速度慢
ssh的服务端在连接时会自动检测dns环境是否一致导致变慢
登录Linux系统，打开终端，

vim /etc/ssh/sshd_config

找到
UseDNS yes
改为
UseDNS no

保存后重启服务
systemctl restart sshd.service

#### 非对称加密优缺点
安全性更高，公钥是公开的，密钥是自己保存的，不需要将私钥给别人。缺点：加密和解密花费时间长、速度慢，只适合对少量数据进行加密。

#### TLS
其实TLS就是从SSL发展而来的，只是SSL发展到3.0版本后改成了TLS

TLS主要提供三个基本服务
* 加密
* 身份验证，也可以叫证书验证吧
* 消息完整性校验



#### Hash 算法
Hash 算法特别的地方在于它是一种单向算法，用户可以通过 Hash 算法对目标信息生成一段特定长度的唯一的 Hash 值，却不能通过这个 Hash 值重新获得目标信息。因此 Hash 算法常用在不可还原的密码存储、信息完整性校验等。




### websockets

#### 什么是websockets
WebSocket是一种网络传输协议，可在单个TCP连接上进行全双工通信，位于OSI模型的应用层。

WebSocket使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在WebSocket API中，浏览器和服务器只需要完成一次握手，两者之间就可以创建持久性的连接，并进行双向数据传输。
![websockets connection](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/websockets-connection.png)



WebSocket 的其他特点:
1. 建立在 TCP 协议之上
1. 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
1. 数据格式比较轻量，性能开销小，通信高效。
1. 可以发送文本，也可以发送二进制数据。
1. 没有同源限制，客户端可以与任意服务器通信。
1. 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。



### 在WebSocket之前，要实现实时拿到服务端的数据有两种方式： 
#### ajax轮询 和 long poll

ajax轮询的原理非常简单，让浏览器隔个几秒就发送一次请求，询问服务器是否有新信息。

long poll 其实原理跟 ajax轮询 差不多，都是采用轮询的方式，不过采取的是阻塞模型（一直打电话，没收到就不挂电话），也就是说，客户端发起请求后，如果没消息，就一直不返回 Response 给客户端。直到有消息才返回，返回完之后，客户端再次建立连接，周而复始。


#### websockets 相对于 http 的优点
1. 主动性：可以主动由服务端发数据到客户端，而http 方式只有客户端有请求，服务端才会响应返回
1. 节约资源：http 方式轮询 非常消耗资源，HTTP请求与回复可能会包含较长的头部，而websockets 只需要经过一次 HTTP 请求，就可以做到源源不断的信息传送了

#### websocket 常见应用
1. 聊天功能
1. 协同办公软件


#### websocket 客户端的简单示例
```
var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};    
```

#### 客户端的 API
```
// WebSocket 构造函数
// WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例。
var ws = new WebSocket('ws://localhost:8080');

// webSocket.readyState
readyState属性返回实例对象的当前状态，共有四种。

CONNECTING：值为0，表示正在连接。
OPEN：值为1，表示连接成功，可以通信了。
CLOSING：值为2，表示连接正在关闭。
CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

switch (ws.readyState) {
  case WebSocket.CONNECTING:
    // do something
    break;
  case WebSocket.OPEN:
    // do something
    break;
  case WebSocket.CLOSING:
    // do something
    break;
  case WebSocket.CLOSED:
    // do something
    break;
  default:
    // this never happens
    break;
}
```

##### webSocket.onopen
实例对象的onopen属性，用于指定连接成功后的回调函数。
```
ws.onopen = function () {
  ws.send('Hello Server!');
}
```

如果要指定多个回调函数，可以使用addEventListener方法。
```
ws.addEventListener('open', function (event) {
  ws.send('Hello Server!');
});
```

##### webSocket.onclose
实例对象的onclose属性，用于指定连接关闭后的回调函数。
```
ws.onclose = function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
};

ws.addEventListener("close", function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
});
```

##### webSocket.onmessage
实例对象的onmessage属性，用于指定收到服务器数据后的回调函数。
```
ws.onmessage = function(event) {
  var data = event.data;
  // 处理数据
};

ws.addEventListener("message", function(event) {
  var data = event.data;
  // 处理数据
});
```
注意，服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象）。

```
ws.onmessage = function(event){
  if(typeof event.data === String) {
    console.log("Received data string");
  }

  if(event.data instanceof ArrayBuffer){
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
}
```
除了动态判断收到的数据类型，也可以使用binaryType属性，显式指定收到的二进制数据类型。

```
// 收到的是 blob 数据
ws.binaryType = "blob";
ws.onmessage = function(e) {
  console.log(e.data.size);
};

// 收到的是 ArrayBuffer 数据
ws.binaryType = "arraybuffer";
ws.onmessage = function(e) {
  console.log(e.data.byteLength);
};
```

##### webSocket.send()
实例对象的send()方法用于向服务器发送数据。
```
ws.send('your message');
```
发送 Blob 对象的例子。
```
var file = document
  .querySelector('input[type="file"]')
  .files[0];
ws.send(file);
```
发送 ArrayBuffer 对象的例子。
```
// Sending canvas ImageData as ArrayBuffer
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
  binary[i] = img.data[i];
}
ws.send(binary.buffer);
```
##### webSocket.bufferedAmount
实例对象的bufferedAmount属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。

```
var data = new ArrayBuffer(10000000);
socket.send(data);

if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```
##### webSocket.onerror
实例对象的onerror属性，用于指定报错时的回调函数。
```
socket.onerror = function(event) {
  // handle error event
};

socket.addEventListener("error", function(event) {
  // handle error event
});
```

### http content type
The Content-Type entity header is used to indicate the media type of the resource

In requests, (such as POST or PUT), the client tells the server what type of data is actually sent

application/json
application/x-www-form-urlencoded
multipart/form-data




### filename extensions of digital certificate files
```
.crt
.cer

```

#### .der (Distinguished Encoding Rules)
```
digital certificates in binary format
A DER file should not have any BEGIN/END statements and will show garbled binary content

DER is often used with Java platforms.
```

#### .pem (Privacy Enhanced Mai)
```
A PEM file is a text file containing one or more items in Base64 ASCII encoding, each with plain-text headers and footers (e.g. -----BEGIN CERTIFICATE----- and -----END CERTIFICATE-----).
```