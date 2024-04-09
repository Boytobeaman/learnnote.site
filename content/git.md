---
title: "git 常用命令"
metaTitle: "git 常用命令, git clone 指定分支"
metaDescription: "git 常用命令, git clone 指定分支, git 删除文件"
---


命令 | 说明
---|---
git credential-manager remove [--path <installion_path>] [--passive] [--force] | 停止使用管理工具[中括号选填]
git credential-manager delete | 清除保存的密码
git init | 通过git init命令把这个目录变成Git可以管理的仓库：
git add | 把文件添加到仓库：git add readme.txt
git add . | 后面加个.，匹配所有文件
git commit | git commit -m "wrote a readme file"
git status | 列出当前目录所有还没有被git管理的文件和被git管理且被修改但还未提交(git commit)的文件
git diff | 此命令比较的是工作目录(Working tree)和暂存区域快照(index)之间的差异,也就是修改之后还没有暂存起来的变化内容。只要已经add了某个修改的文件，git diff 就不会显示其修改细节了
git log | 命令显示从最近到最远的提交日志
git log --pretty=oneline | 如果嫌输出信息太多，看得眼花缭乱的，可以试试加上--pretty=oneline参数，在 git log 命令后，按下 q键 可以推出log 状态
git reflog | 用来记录你的每一次命令
git checkout -- file | 丢弃工作区的修改，让这个文件回到最近一次git commit或git add后的状态。git checkout -- file命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令。
git clone git@github.com:michaelliao/gitskills.git | 将远程的michaelliao/gitskills 项目克隆到本地的gitskills
git clone https://github.com/angular/quickstart.git angular2 | 将远程的quickstart 目录克隆到 本地目录下的angular2目录
git clone -b {branch} {remote_repo} | git clone -b my-branch git@github.com:user/myproject.git 克隆指定分支
git rm | git rm命令把一个文件删除，并把它从git的仓库管理系统中移除。但是注意最后要执行git commit才真正提交到git仓库


### git拉取远程分支
将远程的michaelliao/gitskills 项目克隆到本地的gitskills
```
git clone git@github.com:michaelliao/gitskills.git
```

### git clone 指定分支
```
git clone -b {branch} {remote_repo}  
如 克隆 myproject 的 my-branch 分支：  
git clone -b my-branch git@github.com:user/myproject.git
```
### git tag
```
//查看tag
git tag


// You can list the tags on remote repository with ls-remote, 
// and then check if it's there. Supposing the remote reference name is origin in the following
git ls-remote --tags origin

//要显示附注信息,我们需要用 show 指令来查看
git show V1.2

//但是目前这个标签仅仅是提交到了本地git仓库.如何同步到远程代码库
git push origin --tags


//创建轻量级tag：
git tag 1.0

git tag -a v1.01 -m "注释信息"
// -a 版本 -m 注释

eg:
git tag -a building-platform-1.3.0.0-TEST -m "1.3.0版本第一次提测"
git push origin building-platform-1.3.0.0-TEST


//发布标签
//将v0.1.0标签提交到git服务器

$ git push origin v0.1.0

//参数-d即delete的缩写,意为删除其后指定的标签。
git tag -d v0.1.2

//本地删除tag
git tag -d test_tag　　　　　　　

//本地tag删除了，再执行该句，删除线上tag
git push origin :refs/tags/test_tag

```

### git stash
```
git stash 
//能够将所有未提交的修改（工作区和暂存区）保存至堆栈中，用于后续恢复当前工作目录

git stash 不能识别新加的文件

//会将新文件加入stash
git stash --include-untracked

git stash save "comment"

eg:
git stash save "spring task" 
将当前修改保存，并且备注为"spring task"；

git stash list
//查看当前stash中的内容

git stash pop
//将当前stash中的内容弹出，并应用到当前分支对应的工作目录上。 


To apply a stash and remove it from the stash list：
//stash 列表中会删除这个stash
git stash pop stash@{n}

To apply a stash and keep it in the stash cache：
//stash 列表中还保留这个stash
git stash apply stash@{n}


删除stash

git stash drop <stash@{id}> 
如果不加stash编号，默认的就是删除最新的，也就是编号为0的那个，加编号就是删除指定编号的stash。

git stash clear 
// 是清除所有stash,整个世界一下子清净了！
```

### git pull
```
git pull <远程主机名> <远程分支名>:<本地分支名>

比如，取回origin主机的next分支，与本地的master分支合并，
需要写成下面这样。
git pull origin next:master

如果远程分支是与当前分支合并，则冒号后面的部分可以省略。
git pull origin next

上面命令表示，取回origin/next分支，再与当前分支合并。实质上，
这等同于先做git fetch，再做git merge。
```
### git push
```
git push <远程主机名> <本地分支名>:<远程分支名>

git push origin master
//上面命令表示，将本地的master分支推送到origin主机的master分支。如果master不存在，则会被新建。


// 删除远程的 test 分支
git push origin :test
等于
git push origin --delete test
//如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支。

git push origin
//上面命令表示，将当前分支推送到origin主机的对应分支
//如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略

git push
//如果当前分支只有一个追踪分支，那么主机名都可以省略。

git push -u origin master
//如果当前分支与多个主机存在追踪关系，则可以使用-u选项指定一个默认主机，这样后面就可以不加任何参数使用git push
//上面命令将本地的master分支推送到origin主机，同时指定origin为默认主机，后面就可以不加任何参数使用git push了
```
### git merge
```
比如现在在master 分支

git merge development
就是将development 分支merge到master分支上

merge 时如果有冲突，会显示(branch_name|MERGING)
使用

git merge --abort
可以取消这次合并

或者

git reset --hard HEAD
Since your pull was unsuccessful then HEAD (not HEAD^) is the last "valid" commit on your branch

```

### git 删除文件
#### remove local untracked files from the current Git branch
```
git clean

//If you want to see which files will be deleted you can use the -n option before you run the actual command:
git clean -n

//Then when you are comfortable (because it will delete the files for real!) use the -f option:
git clean -f

//To remove directories, run 
git clean -f -d or git clean -fd


//To remove ignored files, run 
git clean -f -X or git clean -fX

//To remove ignored and non-ignored files, run 
git clean -f -x or git clean -fx

Note the case difference on the X for the two latter commands.
```
### 创建SSH Key
```
ssh-keygen -t rsa -C "youremail@example.com"

public key has been saved in

cat /root/.ssh/id_rsa.pub


for aws lightsail wordpress
sudo cat /home/bitnami/.ssh/id_rsa.pub

for windows
cat /c/Users/luxin/.ssh/id_rsa.pub


生成多个ssh key(为assaabloy 生成ssh key)
ssh-keygen -t rsa -C "anthony.lu@assaabloy.com" -f ~/.ssh/assa_rsa

生成后
ssh-add ~/.ssh/assa_id_rsa

列出私钥列表
ssh-add -l

如果
执行ssh-add时出现Could not open a connection to your authentication agent

先执行如下命令即可进入bash环境：
ssh-agent bash

如果要退出bash环境
exit

如果出现
Permissions 0664 for /.ssh/id_rsa' are too open.
就改变私钥的权限
chmod 400 ~/.ssh/id_rsa

有多个ssh key具体用的是哪一个？
cat .ssh/config

内容可能为：
Host bitbucket.org
     IdentityFile ~/.ssh/assa_id_rsa
     IdentitiesOnly yes
     
     
如果出现ssh “permissions are too open” error
chmod 600 /root/.ssh/id_rsa
```

### github 更新了RSA SSH host key, host key 过期
```
导致服务器连接不上github代码库了

在服务器 文件 
~/.ssh/known_hosts
里，将GitHub的host 更新为最新的
github.com ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCj7ndNxQowgcQnjshcLrqPEiiphnt+VTTvDP6mHBL9j1aNUkY4Ue1gvwnGLVlOhGeYrnZaMgRK6+PKCUXaDbC7qtbW8gIkhL7aGCsOr/C56SJMy/BCZfxd1nWzAOxSDPgVsmerOBYfNqltV9/hWCqBywINIR+5dIg6JTJ72pcEpEjcYgXkE2YEFXV1JHnsKgbLWNlhScqb2UmyRkQyytRLtL+38TGxkxCflmO+5Z8CSSNY7GidjMIZ7Q4zMjA2n1nGrlTDkzwDCsw+wqFPGQA179cnfGWOWRVruj16z6XyvxvjJwbz0wQZ75XK5tKSb7FNyeIEs4TT4jk+S4dhPeAUC5y+bDYirYgM4GC7uEnztnZyaVWQ7B381AK4Qdrwt51ZqExKbQpTUNn+EjqoTwvqNj4kqx5QUCI0ThS/YkOxJCXmPUWZbhjpCg56i+2aB6CmK2JGhn57K5mj0MNdBXA4/WnwH6XoPWJzK5Nyu2zB3nAZp+S5hpQs+p1vN1/wsjk=
```

#### git clone 时显示Filename too long的解决办法

运行下列命令：

```
 git config --global core.longpaths true
 
//--global是该参数的使用范围，如果只想对本版本库设置该参数，只要在上述命令中去掉--global即可。
```
### 设置ss socks5代理加速
```
//首先ss是可以运行和翻墙的

//然后设置git，一般本地默认端口1080

git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'

//查看所有git 配置
git config -l


//取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy

//查看http的设置
git config --global --get-regexp http.*


git config list
//查看所有的npm config



npm config list
//查看npm 所有配置


//设置 registry 地址（淘宝镜像）
npm config set registry https://registry.npmmirror.com

// 查看 registry 设置是否成功
npm get registry


npm config delete https-proxy
//删除某个proxy 比如https-proxy


yarn config list
//查看所有的yarn config


yarn config set proxy http://username:password@host:port
yarn config set https-proxy http://username:password@host:port

example:
yarn config set proxy socks5://127.0.0.1:10809
yarn config set https-proxy socks5://127.0.0.1:10809


删除 proxy
yarn config delete proxy
yarn config delete https-proxy

```
#### .gitignore 文件
不想让git 记录的某些文件（如 node_modules）的话可以配置.gitignore 文件
```
1、配置语法：
　　以斜杠“/”开头表示目录；
　　以星号“*”通配多个字符；
　　以问号“?”通配单个字符
　　以方括号“[]”包含单个字符的匹配列表；
　　以叹号“!”表示不忽略(跟踪)匹配到的文件或目录；
　　此外，git 对于 .ignore 配置文件是按行从上到下进行规则匹配的，意味着如果前面的规则匹配的范围更大，则后面的规则将不会生效；
2、示例：
　　（1）规则：fd1/*
　　　　  说明：忽略目录 fd1 下的全部内容；注意，不管是根目录下的 /fd1/ 目录，还是某个子目录 /child/fd1/ 目录，都会被忽略；
　　（2）规则：/fd1/*
　　　　  说明：忽略根目录下的 /fd1/ 目录的全部内容；
　　（3）规则：
/*
!.gitignore
!/fw/bin/
!/fw/sf/
说明：忽略全部内容，但是不忽略 .gitignore 文件、根目录下的 /fw/bin/ 和 /fw/sf/ 目录；


```

##### 常见问题
有时可能因为上传的单个文件比较大，会出现问题
```
fatal: The remote end hung up unexpectedly

//To allow the file size up to 500M
git config http.postBuffer 524288000

```

###### 有些时候有些文件已经被git记录了，再设置.gitignore是不起作用的，可以使用以下方法重新设置该记录那些文件

先修改.gitignore，把你想ignore的文件填上去

然后
git rm --cached /path/to/file

先把本地缓存删除（改变成未track状态），然后再提交。
```
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```
##### 大文件问题，已经commit了大文件，然后push不上去，然后把大文件删除了，但还是push不上去
```
// this exceeds GitHub's file size limit of 100.00 MB

git filter-branch -f --index-filter 'git rm --cached --ignore-unmatch path/to/bigfile'
```
##### 取消某个文件的修改（还没有add）
```
git checkout -- file

eg:
git checkout -- test.html
//如你修改了test.html 还没有add，你想还原test.html 到没有修改时的状态

放弃所有的文件修改可以使用 git checkout .  命令
```
##### 取消某个文件的修改（已经add）
```
git reset HEAD fileName
git reset fileName

git reset .
//取消所有文件的add

eg:
对test.html 做了修改，而且add了，但还没有commit

git reset HEAD test.html
这时相当于去掉add那一步,但这时 改动 还保留着

你可以用
git checkout -- test.html
删除改动，还原test.html到改动前的版本

```
##### 取消某个文件的修改（已经commit）
```
git reset –-soft/hard commit-id

如已经对test.html 做了修改，add了，commit了，
但你想取消这次commit。

用git log 命令找到最后一次commit 的 上一次 commit ID(086517658517797ca3d5ec50fbdfcc59d0f6503b)
因为想要还原到上一次commit的版本，所以是上一次commit ID.
```
###### 保留改动
```
git reset 08651765851...
等于
git reset --soft 08651765851...

这时撤销掉上一次的commit 和add
但是还保留了修改，你可以选择再次add--commit.
```
**慎用 git reset --hard commit-id**
###### 失去改动
```
git reset --hard commit-id

git reset --hard 08651765851...

把工作区还原到commit ID 为08651765851... 的状态
你会失去此commit ID 后面的改动

```

#### 如何进一步撤销远程的push
```
执行 
git reset --soft commit_id （本地保留修改）
或
git reset --hard （本地失去修改，本地代码回到reset的版本）
后

执行 
git push origin 分支名 --force ，强制提交当前版本号。撤销远程上的commit
```
###### 查看关联的远程库

```
git remote -v

origin    git@github.com:michaelliao/learngit.git (fetch)
origin    git@github.com:michaelliao/learngit.git (push)

可以看到，本地库已经关联了origin的远程库，并且，该远程库指向GitHub。
```
###### 删除已有的GitHub远程库


```
git remote rm origin
```
添加远程库

```
git remote add origin git@gitee.com:liaoxuefeng/learngit.git
```
修改远程库
```
git remote set-url origin [url]
例如：git remote set-url origin gitlab@gitlab.chumob.com:php/hasoffer.git
```

##### 关联多个远程库

先删除已经关联的库

```
git remote rm origin
```


关联GitHub的远程库

```
git remote add github git@github.com:michaelliao/learngit.git

git remote add gitAli git@code.aliyun.com:945275169/learnDocs.git
//alicloud project
```


注意，远程库的名称叫github，不叫origin了。

接着，再关联码云的远程库：

```
git remote add gitee git@gitee.com:liaoxuefeng/learngit.git
```


同样注意，远程库的名称叫gitee，不叫origin。

现在，我们用git remote -v查看远程库信息，可以看到两个远程库：


```
git remote -v
gitee    git@gitee.com:liaoxuefeng/learngit.git (fetch)
gitee    git@gitee.com:liaoxuefeng/learngit.git (push)
github    git@github.com:michaelliao/learngit.git (fetch)
github    git@github.com:michaelliao/learngit.git (push)
```

推送到GitHub，使用命令：

```
git push github master
```


如果要推送到码云，使用命令：

```
git push gitee master
```

如果本地分支和远程分支没有关联需要关联一下
```
git branch --set-upstream-to=远程分支名 本地分支名

git branch --set-upstream-to=origin/master master
```

### 相同域下，比如github，不同账号ssh key 配置
比如有一个新的 github账号，ssh 生成了一对 公钥和私钥 id_rsa_sonny.pub 与 id_rsa_sonny

这时需要配置一下 ssh 的config 信息
```
vim /Users/anxxxylu/.ssh/config

加上
Host github-sonny
  HostName github.com
  IdentityFile /Users/anxxxylu/.ssh/id_rsa_sonny
  User sonny

// 说明：Host github-sonny 是为了区分 老的github 账号的，这在pull 代码的时候要用到，方便程序知道用哪个私钥验证权限
// 使用 git remote add origin git@github-sonny:username/some-repo.git 关联sonny github 账号的repo
// github-sonny 实际指向还是 github.com
```

删除git项目所有提交历史，使其成为一个新仓库
```
//创建新分支
git checkout --orphan latest_branch

//添加所有文件
git add .

//commit代码
git commit -m "xxx"

//删除原来的 main 分支,以前叫 master
git branch -D main

//将当前分支重命名为main
git branch -m main

//最后，强制更新您的存储库
git push -f origin main
```

### 常用命令
##### 安装完成后，还需要最后一步设置，在命令行输入：
```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```
##### 创建版本库：
```
$ mkdir learngit
$ cd learngit
$ pwd   
/Users/michael/learngit
如果你使用Windows系统，为了避免遇到各种莫名其妙的问题，
请确保目录名（包括父目录）不包含中文。
```
##### git branch 和 git checkout经常在一起使用，所以在此将它们合在一起：
```
git branch
//一般用于分支的操作，比如创建分支，查看分支等等

git branch
//不带参数：列出本地已经存在的分支，并且在当前分支的前面用"*"标记

git branch -r
//查看远程版本库分支列表

git branch -a
//查看所有分支列表，包括本地和远程

git branch dev
//创建名为dev的分支，创建分支时需要是最新的环境，创建分支但依然停留在当前分支


```
### git 删除分支
如何删除本地或远程分支
```
git branch -d dev
//删除dev分支，如果在分支中有一些未merge的提交，那么会删除分支失败，此时可以使用 

git branch -D dev
//强制删除dev分支


git push origin --delete [branchname]
//删除远程分支

eg:
git push origin --delete branch_a


git branch -vv
//可以查看本地分支对应的远程分支

git branch -m oldName newName
//给分支重命名

```

####  git checkout
```
操作文件
git checkout filename 
//放弃单个文件的修改

git checkout .
//放弃当前目录下的修改

操作分支
git checkout master 
//将分支切换到master
//若分支不存在会报错

git checkout -b master 
//如果分支存在则只切换分支，若不存在则创建并切换到master分支
```

##### 本地创建某分支 并 关联到远程的某个分支(远程先开好分支然后拉到本地)

```
先 git pull 一下拉最新代码和分支

git checkout -b 本地分支名 origin/远程分支名

eg:
git checkout -b for_ausplastic.com origin/for_ausplastic.com
```
##### 本地先开好分支然后推送到远程
```
git checkout -b feature-branch    
//创建并切换到分支feature-branch

git push origin feature-branch:feature-branch
//推送本地的feature-branch(冒号前面的)分支到远程origin的feature-branch(冒号后面的)分支(没有会自动创建)
```
#### 批量 删除分支
```
git branch |grep 'branchName' |xargs git branch -D

git branch 输出当前分支列表
grep 是对 git branch 的输出结果进行匹配，
匹配值当然就是 branchName,只要分支名包含branchName 就匹配到
xargs 的作用是将参数列表转换成小块分段传递给其他命令
```

npm
```

登陆
npm login

发布
npm publish --access=public
(注意包的名字一定要不一样，起一个唯一的名字)


```


