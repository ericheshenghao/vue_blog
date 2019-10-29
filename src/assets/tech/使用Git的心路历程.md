# 使用Git使用的心路历程
新建仓库
``` bash 
git clone ssh或者https方式
```
本地推送和拉取
## 解决每次推送输入账号密码的问题
Windows上设置避免每次git push 都需要账号密码
在 C:\Users\luojie 目录下 能看到 [.gitconfig] 这个文件：
[user]  
    name = kn****  
    email = ************.com  
[credential]  
    helper = store
配置了credential之后就可以存储账号密码，下次不用再输入
linux上设置避免每次git push 都需要账号密码
先cd到根目录，执行git config --global credential.helper store命令
[root@iZ25mi9h7ayZ ~]# git config --global credential.helper store
执行之后会在.gitconfig文件中多加红色字体项
[user]
        name = 天明
        email = xxxx@xxxx.com
[credential]
        helper = store
之后cd到项目目录，执行git pull命令，会提示输入账号密码。输完这一次以后就不再需要，并且会在根目录生成一个.git-credentials文件
