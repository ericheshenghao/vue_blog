# Vue的一些使用心得

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
## router-link传参(敲黑板)
通过to来传递
```
<router-link :to="{name:'bloglist',params:{name:'life'}}">
```
// 前面的`name`对应的是`router`中的`name`的值,后面是自己定义的传递的参数，这样我们就可以给同一个页面传递不同的参数了。

这种方式导致后面又遇到页面刷新`this.$route.params.xxx`刷新丢失的情况，解决方法也很简单，将路由修改成下面这样，就是让路径也带上参数。
```
{
      path: '/bloglist/:name',
      name: 'bloglist',

      component: () => import('./views/BlogListTech.vue')
    },
```
动态的修改一些数据
```
  data() {
    return {
      lifelist,
      bloglist,
      //切换分类
      list:this.cat()? bloglist:lifelist,
      tech:"tech",

    };
  },
  methods:{
    cat(){
       return this.$route.params.name=="tech"?true:false 
     },
  }
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