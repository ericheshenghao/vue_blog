---
title: 常用css语法
date: '2019-12-10'
category: tech
tags: css
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---
[[toc]]
## div单行显示，超出以省略号代替
``` css
.one li{
            width: 300px;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分文字以...显示*/
        }
```
## 锚点过渡效果
``` css
body,html {
      margin: 0 !important;
      padding: 0;
      -webkit-text-size-adjust: none;
      scroll-behavior: smooth; /*重要/
    }
```
## 表格宽度的重置
``` css
table{
word-break: break-all; 
word-wrap:break-word;
width: 100%;
  @media (max-width: 36em) {
    width: auto;
  }
}
```
## 防止移动端字体大小变化font boosting
``` html 
<meta name="viewport" content="user-scalable=no,width=device-width,initial-scale=1.0,maximum-scale=1,minimum-scale=1">
<style lang="less">
    html {
      -webkit-text-size-adjust: none;
    }
</style>
```

