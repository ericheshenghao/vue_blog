---
title: 使用Git的心路历程
date: '2019-08-05'
category: tech
tags: git
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---

[[toc]]

## GIT基础命令
拷贝项目： git clone<仓库地址>  
提交：git commit -m '描述信息'
创建分支：git branch `<name>` (dev)  
切换分支：git checkout `<name>`  
创建并进行入分支：git checkout -b `<name>`  
删除本地分支：git branch -D `<name>` 
删除远程分支：git push origin --delete `<name>` 
添加远程分支：git push --set-upstream origin dev  
查看状态: git status  
添加所有文件：git add .
显示当前状态：git status 
提交：git commit -m 这是当前描述的提交  
拉取：git pull  
推送：git push  
查看分支：git branch --list  
查看远程分支：git branch -a  
强制覆盖远端：git push -u origin master -f  
删除跟踪：git rm --cached .env  
查看提交日志：git log 
查看单行提交日志：git log --oneline  

## 将本地仓库推送到github
``` bash
$ git clone ssh或者https方式
```
## 本地推送和拉取
1. 在本地创建一个项目目录
``` 
$ mkdir ~/project-name
```
2. 进入项目目录，通过 git init 命令把目录变成Git可以管理的仓库。
```bash 
$ git init 
```
3. 使用 git commit 提交文档更改将已有的本地仓库推送到远端。
``` bash 
$ git commit -m 'project-name first commit'
```
4. 注册并登陆GitHub，在本地配置创建SSH Key，生成id_rsa和id_rsa.pub，公钥交给github用来访问，私钥保留在本地并妥善保管。
``` bash 
$ ssh-keygen -t rsa -C "youremail@example.com"
```
5. 创建新仓库并将本地仓库推送到远端
``` bash
$ git remote add origin git@github.com:ericheshenghao/shenghao-nestjs.git
$ git pull origin master
$ git push -u origin master
```
## 版本控制
首先查看当前所在分支，并将该分支推送到远端
```
$ git branch
$ git push origin <分支名称>
// 切换回master分支
$ git checkout master
// 合并分支
$ git merge access-control
// 推送master分支
$ git push origin master
// 查看推送日志
$ git log --oneline
// 基于最后一次推送新建分支
$ git checkout -b <新建分支名称> <推送码>
// 将分支推送到远端
$ git push origin <新建分支名称>
```



