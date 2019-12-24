---
title: Nest.js+Typeorm
date: '2019-12-18'
category: tech
tags: nest.js|typeorm
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---
[[toc]]
## 依赖
```
npm install @nestjs/typeorm typeorm mysql --save
```
## 级联删除
主表
``` ts
//一个集合对应多篇文章
    @OneToMany(type => Post, post => post.collection, {
        cascade: true
    })
    posts: Post[]
```
附表
``` ts
@ManyToOne(type => Collection, collection => collection.posts, {
    onDelete: 'CASCADE',
  })

  collection: Collection;
```
删除主表中的行时，同时删除附表中的数据。（一个集合=>多篇文章）