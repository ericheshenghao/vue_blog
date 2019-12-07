---
title: 使用Git的心路历程
date: '2019-08-05'
category: tech
tags: git
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---


## 新建仓库
```  
git clone ssh或者https方式
```
## 本地推送和拉取
将已有的本地仓库推送到远端。
``` bash
$ git init
$ git remote add origin git@github.com:ericheshenghao/ui_button-vue.git
$ git push -u origin master
```
## GIT基础命令
拷贝项目： git clone<仓库地址>  
创建分支：git branch `<name>` (dev)  
切换分支：git checkout `<name>`  
创建并进行入分支：git checkout -b `<name>`  
删除本地分支：git branch -D `<name>`  
添加远程分支：git push --set-upstream origin dev  
查看状态: git status  
添加所有文件：git add  
提交：git commit -m 这是当前描述的提交  
拉取：git pull  
推送：git push  
查看分支：git branch --list  
查看远程分支：git branch -a  


