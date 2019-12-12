---
title: 常用css语法
date: '2019-12-10'
category: tech
tags: css
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---
## div单行显示，超出以省略号代替
```
.one li{
            width: 300px;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分文字以...显示*/
        }
```
