---
title: 优雅的自定义博客的主题样式(Vue向)
date: '2019-11-01'
type: tech
tags: js|vue
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---


初次看到😮[reuixiy的博客](https://io-oi.me/tech/redesign-this-blog-under-minimalism/)的布局，就被它的极简风格深深吸引，不管是页面的细节处理，还是博文的内容，都给人一种赏心悦目的感受，于是下定决心将博客美化进行到底，在此记录一下自己简陋的博客的美化过程，共勉。
> So we beat on, boats against the current, borne back ceaselessly into the past.  
> —《The great Gatsby 》[^5]


## 代码高亮
cnpm安装`hljs`包[^1]
``` bash
cnpm install highlight.js --save
```
在要使用到的页面中导入
``` javascript{2}
import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night-eighties.css";
const highlightCode = () => {
  const preEl = document.querySelectorAll("pre code");

  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};
```
生命周期调用
``` javascript{3,6}
export default {
  mounted() {
      highlightCode();
  },
  updated{
      highlightCode();
  }
}
```
常用的一些代码高亮风格，也可以参考[官网](https://highlightjs.org/static/demo/)的。
```
a11y-dark.css                  googlecode.css
atom-one-dark.css              rainbow.css
atom-one-dark-reasonable.css   routeros.css
atom-one-light.css             school-book.css
brown-paper.css                school-book.png
brown-papersq.png              shades-of-purple.css
codepen-embed.css              solarized-dark.css
color-brewer.css               solarized-light.css
darcula.css                    sunburst.css
dark.css                       tomorrow.css
darkula.css                    tomorrow-night.css
default.css                    tomorrow-night-blue.css
docco.css                      tomorrow-night-bright.css
dracula.css                    tomorrow-night-eighties.css
far.css                        vs.css
foundation.css                 vs2015.css
github.css                     xcode.css
github-gist.css                xt256.css
```

## 代码行前添加数字
引入jquery对筛选后的元素批量添加`<li>/<li>`，最后一行出现可能会出现空行，可以用remove方法去掉最后多出来的li标签。

``` javascript
import $ from "jquery";
// 代码前数字
const preCode = () => {
  $("pre code").each(function() {
    $(this).html(
      "<ul><li>" +
        $(this)
          .html()
          .replace(/\n/g, "</li><li>") +
        "\n</li></ul>"
    );
  });
  // 去掉最后一行的空行**
  $("ul li:last-child").remove();
}; 
```
生命周期调用`preCode`函数。
``` javascript
export default {
  mounted() {
      highlightCode();;
      preCode();
      mediumzoom();
  },
  updated{
    highlightCode();;
    preCode();
    mediumzoom();
  }
}
```
具体的样式可以自己DIY。
## 代码行着重
稍微改进下前面的代码，具体改动如下。
``` javascript
  // 代码前数字
  const preCode = () => {
    $("pre code").each(function () {
      $(this).html(
        "<ul><li>" +
        $(this)
          .html()
          .replace(/\n/g, "</li><li>") +
        "\n</li></ul>"
      );
      // 给指定行增加样式
      try {
        var line =$(this).attr("class").match(/\d+/g)
        for (let i in line){
          $(this).children().children().eq(line[i]-1).addClass("selected")
        }
      } catch (err) {
        console.log() //这个去掉会报错。
      }
    });
    // 去掉最后一行的空行
    $("ul li:last-child").remove();
  };
```
markdown中的书写方式，在后面添加一个数组,将第三行及第六行高亮。
```
// ``` javascript{3,6}
```
## mediumZoom
cnpm安装`medium-zoom`插件
``` bash
cnpm i medium-zoom --s
```
在需要使用`medium-zoom`插件的页面引入。
```
import mediumZoom from "medium-zoom";
// 图片预览
const mediumzoom = () => {
  mediumZoom(document.querySelectorAll("p img"));
};
```
在不同生命周期中调用，这样可以保证不管在哪个页面上图片都是可以预览的。
``` javascript
export default {
  mounted() {
      mediumzoom();
  },
  updated{
    mediumzoom();
  }
}
```
### 给图片添加图名
再尝试一下给图片添加一下图名，具体代码如下，需要引入`jquery`。
```
// 图片添加图名
const addname = () => {
    $("p img").each(function () {
      var title = $(this).attr("alt");
      $(this).after(
        '<div class="iname">' +
        '<span class="itag"><i class="fa fa-twitch  "></i></span>' +
        title +
        "</div>"
      );
    });
  };
```
生命周期调用。
``` javascript
export default {
  mounted() {
      mediumzoom();
      addname();
  },
  updated{
    mediumzoom();
    addname();
  }
}
```
效果如图，具体的样式可以根据个人需要进行更改。
![图片添加标题](https://eric-sheng-1300164148.cos.ap-guangzhou.myqcloud.com/2019/10/19/998831e2461a88207eec61fe38492bd8.png)

## 锚点设置
cnpm安装`markdown-it-anchor`插件。
``` bash
$ cnpm markdown-it-anchor --save
```

食用方法：在vue.config.js配置文件中将插件添加进来,用法见[^2]
``` javascript
use: [
      // 标题锚点
      [
        require("markdown-it-anchor"),
        {
          level: 2, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
          slugify: slugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性
          permalink: true, // 开启标题锚点功能
          permalinkBefore: true, // 在标题前创建锚点
          permalinkSymbol: "#", // 锚点的样式，
          permalinkSpace: true, // 标题与锚点之间是否留空
        }
      ],
      [require("markdown-it-footnote")]
    ]
```
锚点样式的参考链接：https://graphemica.com/🔗[^3]
### 锚点动画
``` javascript
const anchormove = () => {
    $(function () {
      $('h2>a,h3>a,h4>a').click(function () {
        //根据段落下的a标签的href转换为id选择器，获取id元素所处的位置
        $('html,body').animate({ scrollTop: ($($(this).attr('href')).offset().top) }, 1000);
      });
    });
  }
```
在edge中锚点过渡之前会闪动一下，且中英文混合的时候锚点会失效，暂时还没有找到解决的办法。
## 注脚设置
cnpm安装`markdown-it-footnote`插件
``` bash
$ cnpm markdown-it-footnote --save
```
配置前还需要安装一下`slugify`插件
``` bash
$ cnpm slugify  --save
```

食用方法：与锚点设置同样的操作,具体用法见[^4]
``` javascript
const slugify = require("transliteration").slugify; //引入
//略
use: [
      [
        // 标题锚点
      ],
      [require("markdown-it-footnote")]
    ]
```

[^1]: 参考：[https://highlightjs.org/usage/](https://highlightjs.org/usage/)
[^2]: 来源：[https://www.npmjs.com/package/markdown-it-anchor](https://www.npmjs.com/package/markdown-it-anchor)
[^3]: 参考：[https://graphemica.com/🔗](https://graphemica.com/🔗)
[^4]: 来源： [https://www.npmjs.com/package/markdown-it-footnote](https://www.npmjs.com/package/markdown-it-footnote)
[^5]: 来源： [https://book.douban.com/subject/1008988/](https://book.douban.com/subject/1008988/)
