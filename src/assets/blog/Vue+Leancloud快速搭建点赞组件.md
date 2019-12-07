---
title: Vue+Leancloud快速搭建点赞组件
date: '2019-10-25'
category: tech
tags: vue|leancloud
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---

静态博客想拥有后端服务器提供的功能，但是又不想自己再重新搭建一个服务器。因为不管是<mark>时间</mark>还是<mark>金钱</mark>成本相对来说都太高了，而且大多数时候自己想要的也只是一些简单的功能而已，所以在这里记录一下利用`leancloud`来储存博客点赞数的实现方法。

## 点击事件
首先当然我们要有一个按钮啦，然后写一个非常简单的点击事件，大概就是长这样
```html{3}
<button
      style="border: 0;background-color: transparent;outline: none;"
      v-on:click="btclick"
      :class="{animation:Active1, confetti:Active2,liked:Active3}"
      class="paw-button"
    >
    </button>
```
所以对应的下面有一个`btclick`的方法👇
``` js
btclick() {
    ...
}
```

## 点赞实现
参照一下leancloud官网的文档:  
[https://leancloud.cn/docs/leanstorage_guide-js.html#hash799084270](https://leancloud.cn/docs/leanstorage_guide-js.html#hash799084270)

### 新建类
这里是我自己之前已经创建好的一个系统，在最后面我添加了一个名为`Like`的类
![创建类](https://eric-he.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191120004518.png)

在`Like`类里，我分别添加了`url`以及`count`字段用来储存必要的信息
![字段信息](https://eric-he.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191120005129.png)

### 请求代码
如果web端没有安装leancloud的话，需要先npm安装一下
```
# 存储服务（包括推送）
$ npm install leancloud-storage --save
# 即时通讯服务 //此处用不到可以不安装
$ npm install leancloud-realtime --save
```
上线之后可以采用CDN引入的方式
```
<!-- 存储服务 -->
<script src="//cdn.jsdelivr.net/npm/leancloud-storage@3.15.0/dist/av-min.js"></script>
```
现在我们可以通过下面的代码将储存服务开启，当然appid和appkey都需要替换成你自己的
```
// 开启存储服务
const AV = require('leancloud-storage');
// 初始化
AV.init({
  appId: "wpHpwFpwArdiE7U4B55lsffv-gzGzoHsz",
  appKey: "j1IynKzfj5rsmmzap7ro2aKd",

});
```
下面的代码逐一讲解
``` js
// 首先查询Like类
const query = new AV.Query("Like");
// 将url这个数据库里的字段与前端自己传入的path路径对比
query.equalTo("url", this.path);
// 查出这条数据
query.find().then(async res => {
// 如果数据为空的情况         
if (res.length == 0) {
// 新增数据              
const Like = AV.Object.extend("Like");
const like = new Like();
like.set("url", this.path);
like.set("count", 1);
like.save();
// 直接更新data里面的count数据  
this.count =  1;
} else {
// 如果是已经有数据的情况
const like = AV.Object.createWithoutData("Like", res[0].id);
// 在服务端加1
like.increment("count", 1);
await like.save();
// 更新数据      
this.count = res[0].attributes.count + 1;
 }
});
```
``` js
// 监听path的变化，然后更新
watch: {
    path: "fetchcount"
  },
  props: {
    path: ""
  },
```
完工😄，是不是非常简单，当然如果我们想实现进入页面后直接拿到服务端的数据也很容易
只要在`methods`写一个获取的方法，然后在`create`里面调用一下就可以了，这个看官方文档就可以实现，这里就不贴出代码了，最终实现的结果点击👇这个❤就能看到啦。。

