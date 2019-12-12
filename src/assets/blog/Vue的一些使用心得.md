---
title: Vue的一些使用心得
date: '2019-10-22'
category: tech
tags: vue
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---

## 列表逐一动画渲染
设置一个定时器，每x秒触发一次，可以生成一个非常简单的动画效果。
<iframe height="400" style="width: 100%;" scrolling="no" title="transition-group" src="https://codepen.io/ericheshenghao/embed/dyPGEGg?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ericheshenghao/pen/dyPGEGg'>transition-group</a> by 何先森
  (<a href='https://codepen.io/ericheshenghao'>@ericheshenghao</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 父子组件传值
在这一节我将记录一个通过父子组件传值来控制子组件显隐的方法。
> 首先我在父组件里引入一个子组件`upload-demo`，以及一个按钮来控制子组件的显示。
```
<el-button type="primary" size="small" @click="show">上传图片</el-button>
<upload-demo :message="uploadshow" @show="show"></upload-demo>
```
show方法以及索要传递的`uploadshow`的属性值
```
uploadshow:boolean=false
  show() {
   this.uploadshow=!this.uploadshow
  }
```
然后我们在子组件里面通过Prop接受这个`uploadshow`
```
 @Prop() message:boolean
```
通过v-if我们来控制组件的展示与否,并在子组件中设置一个`showoff()`方法来调用父组件中的`show()`方法
```{2}
<div class="upload-demo" v-if="message">
<el-button type="text" @click="showoff">关闭</el-button>
</div>
```
现在我们只要emit这个方法，就可以实现父子组件的传值了。
```
showoff(){
        this.$emit("show")
    }
```

## 混入mixin
例子：
``` js
// 定义一个混入对象
var myMixin = {
    created: function () {
      //调用方法
        this.getHeight()
    },
    methods: {
        getHeight: function () {
           ...
            });

        }
    }
}
//导出混入对象
export default myMixin
```
在`main.js`中引入
``` js
new Vue({
  mixins:[myMixin],
  router,
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')

```

## fontawsome图标库的引入
安装一下fontawesome图标库
```
 vue add vue-cli-plugin-fontawesome
```
手动导入的方式:
1. 先添加包
```
$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save @fortawesome/free-solid-svg-icons
$ npm i --save @fortawesome/vue-fontawesome
```
2. 中间写入文件  

可以在`pulgin/`下新建一个`fontawesome.js`文件，并注册一下组件。
```
import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

```  
3. 在main.js中写入
```
import Vue from 'vue';
import './plugins/fontawesome';
import App from './App.vue';
```
这样我们就可以全局使用`fontawesome`了。
### 再添加一个库
当然如果实体图标库不满足的话，我们完全可以再添加一个品牌的图标库，可以参考npm的[说明文档](https://www.npmjs.com/package/@fortawesome/vue-fontawesome)。
```
npm i --save @fortawesome/free-brands-svg-icons //安装一下brands图标库
```
在main.js中同样的方式导入
```
import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas,fab)
```
### 在html中使用

```
// 实心图标标签引入
<font-awesome-icon :icon="['fas', 'qq']" class="share__icon share__icon--facebook" />

// brand的标签引入
<font-awesome-icon :icon="['fab', 'qq']" class="share__icon share__icon--facebook" />
```

## Vue引入CDN优化首页访问速度

### 配置vue config js
在vue.config.js中添加如下的代码，引入外部的CDN链接[^1]。
``` javascript
configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'highlight':'highlight'
    }
  ```
### 修改main js
  将引入外部资源的组件都注释掉，否则可能会出错。
  >tips:引用cdn时，如果vue引用的是min.js版本，会导致vue devtool失效，换成vue.js后缀的就可以了。
  ``` javascript
  // import Vue from 'vue'
  import App from './App.vue'
  import router from './router'
  // import ElementUI from 'element-ui';

  // import 'element-ui/lib/theme-chalk/index.css';
  import './registerServiceWorker'
  import './plugins/element.js'

  Vue.config.productionTip = false
  // Vue.use(ElementUI);
  ```
  
### 在index html中引入
  这是我通过cdn引入的一些包，element-ui我是通过按需引入的方式引入组件，因此这里只引入了css样式文件。
  ``` html
  <body>

  <div id="app"></div>
  <!-- built files will be auto injected -->
  <script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
  <script src="https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js"></script>
  <script src="https://cdn.bootcss.com/highlight.js/9.15.10/highlight.min.js"></script>
  <link href="https://cdn.bootcss.com/element-ui/2.12.0/theme-chalk/index.css" rel="stylesheet">
  <link href="https://cdn.bootcss.com/highlight.js/9.15.10/styles/tomorrow-night.min.css" rel="stylesheet">
</body>
```
### 优化结果
 可以看到，压缩后的文件大小大概只有<mark>100kb</mark>左右，首屏基本是秒开。
```
 File                                      Size             Gzipped

  dist\js\chunk-9996dbc8.a2a255ea.js        255.15 KiB       77.84 KiB
  dist\js\chunk-vendors.ad67bd95.js         88.56 KiB        24.65 KiB
  dist\js\app.4addbd1f.js                   45.38 KiB        12.44 KiB
  dist\precache-manifest.666d2ada97ef121    1.59 KiB         0.52 KiB
```
用audit测试一下网页的性能，
![测试结果](https://eric-sheng-1300164148.cos.ap-guangzhou.myqcloud.com/2019/10/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191023171640.png)

### router.beforeEach
简单实现一个页面的重定向
```
//强制到homepage页面
router.beforeEach((to,from,next)=>{
 
  if(to.path==="/" && localStorage.token){
    return next("/homepage")
  }
  next()
})
```

  [^1]: 来源： [https://www.bootcdn.cn/](https://www.bootcdn.cn/)