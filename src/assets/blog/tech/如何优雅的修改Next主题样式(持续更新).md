# 如何优雅的修改Next主题样式(持续更新)


## 引子
第一眼看到😮[reuixiy的博客](https://io-oi.me/tech/redesign-this-blog-under-minimalism/)的布局，就被它的极简风格所深深的吸引，不管是页面的细节处理，还是博文的丰富内容，都给人一种赏心悦目的感受，于是下定决心将博客美化进行到底，在此记录一下自己简陋的博客的美化过程，共勉。
<!-- more -->
## 分割线样式
首先借鉴reuixiy博客中[^1]分割线样式的设置，只需在main.style文件的末尾添加下面的代码  

``` css
hr{
	border: none;
	margin: -1em 0 0.5em;
	text-align: center;
	font-size: 30px;
	height: 100%;
	background-color: white;
	color: #000;
}
.post hr::after{
	content: "...";
	letter-spacing: 1.5em;
	padding-left: 1.47em;
}
```
最后部署，完成👇[^2]
自此，我们告别了单调的单线分割，历史进入新的纪元，在书写优雅博文的路上，咱又迈进了一小步。

## 博文置顶
博文首页的排布以发布时间的先后顺序为基准，当然，我们可以通过安装插件来实现博文的置顶：
``` bash
$ npm install hexo-generator-index-pin-top --save
```
在编辑相关的文章时，在顶部添加一行top：
如果有多篇博文置顶的情况，我们可以通过修改top值来控制顺序(top值大的排在前面)。
```
---
title: 如何优雅的修改Next主题样式(持续更新)
top: 100
date: 2019-09-29 19:58:08
tags:
- Tech Art
categories:
- Next主题
---
```
接下来我们为置顶的博文添加一个图标样式
在`<div class="post-meta">`后面添加以下代码
``` html 文件路径:~\blog\themes\next\layout\_macro\post.swig
{% if post.top %}
<span class="post-meta-item">
	<span class="post-meta-item-icon">
		<i class="fa fa-thumb-tack"></i>
	</span>
    <font class="post-meta-item-text" style="color:orangered">置顶</font>
	</span>
{% endif %}
```
部署，完成，查看效果：

![展示.png](http://eric-sheng-1300164148.cos.ap-guangzhou.myqcloud.com/2019/09/30/8ce00973e5c2f15cfa67da08952641a1.png)

在首页也能看到文章已经被置顶了，当然置顶图标的颜色可以根据自己的需要自行更改🍻。

## 注脚设置
博客根目录安装hexo-reference插件
``` bash
$ npm install hexo-reference --save
```
食用方法：官方文档[^3]

## 锚点设置
新建一个js文件，命名为`anchor.js`，然后将js文件放在bolg根目录指定文件夹内。
``` javascript 文件路径：~\blog\themes\next\source\js\src\anchor.js
$(function() {
	$("article>div>div>h2,article>div>div>h3,article>div>div>h4,article>div>h5").append("<a class=\"anchor\"  aria-hidden=\"true\" ><svg class=\"octicon-link\" aria-hidden=\"true\" width=\"16\" height=\"16\" version=\"1.1\"><path d=\"M 4 9 h 1 v 1 H 4 c -1.5 0 -3 -1.69 -3 -3.5 S 2.55 3 4 3 h 4 c 1.45 0 3 1.69 3 3.5 c 0 1.41 -0.91 2.72 -2 3.25 V 8.59 c 0.58 -0.45 1 -1.27 1 -2.09 C 10 5.22 8.98 4 8 4 H 4 c -0.98 0 -2 1.22 -2 2.5 S 3 9 4 9 Z m 9 -3 h -1 v 1 h 1 c 1 0 2 1.22 2 2.5 S 13.98 12 13 12 H 9 c -0.98 0 -2 -1.22 -2 -2.5 c 0 -0.83 0.42 -1.64 1 -2.09 V 6.25 c -1.09 0.53 -2 1.84 -2 3.25 C 6 11.31 7.55 13 9 13 h 4 c 1.45 0 3 -1.69 3 -3.5 S 14.5 6 13 6 Z\"/></svg></a>")
	$("article>div>div>h2>a,article>div>div>h3>a,article>div>div>h4>a,article>div>div>h5>a").each(function(i){
		
		this.id=i
		this.href="#"+i
	})
})
```
在`layout.swig`末尾中引入js文件,注意先要先引入jquery。
``` html 文件路径：~\blog\themes\next\layout\layout.swig
 <!--加锚点-->
 <script type="text/javascript" src="/js/src/anchor.js"></script>
```
修改`css`样式，在末尾添加如下样式
``` css 文件路径：~\blog\themes\next\source\css\main.style
//修改一下anchor的样式
.anchor{
margin-top: 0px;
border-bottom:none;
margin-left:5px;
}
h2:hover .anchor .octicon-link,
h3:hover .anchor .octicon-link,
h4:hover .anchor .octicon-link{
visibility:visible;
}
h2:hover,h3:hover,h4:hover {
color:#2a6df4
transition:0.5s;
transition-delay:0.22s;
}

h2 .octicon-link,
h3 .octicon-link,
h4 .octicon-link{
visibility:hidden;
fill:currentColor;
}
```
查看效果🌞
<hr />

![锚点](http://eric-sheng-1300164148.cos.ap-guangzhou.myqcloud.com/2019/10/03/32595abfcfc3aefa9d5ffb8b77ab4220.gif)


[^1]: 参考：[https://io-oi.me/tech/redesign-this-blog-under-minimalism/](https://io-oi.me/tech/redesign-this-blog-under-minimalism/)
[^2]: 来源：[http://www.fhdq.net/emoji/emojifuhao.html#top](http://www.fhdq.net/emoji/emojifuhao.html#top)
[^3]: 来源： [https://github.com/kchen0x/hexo-reference](https://github.com/kchen0x/hexo-reference)
