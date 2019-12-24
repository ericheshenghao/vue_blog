---
title: $attrs详解
date: '2019-12-13'
category: tech
tags: vue
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---
### 主要用途
将父组件数据给子组件或者孙组件,`this.$attrs`拿到的是父组件传过来的数据，如果把上面例子中的inheritAttrs: false去掉或者改为inheritAttrs: true，最终渲染为为下面的结果。
<iframe height="400" style="width: 100%;" scrolling="no" title="$attrs" src="https://codepen.io/ericheshenghao/embed/yLyJzBN?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ericheshenghao/pen/yLyJzBN'>$attrs</a> by 何先森
  (<a href='https://codepen.io/ericheshenghao'>@ericheshenghao</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>