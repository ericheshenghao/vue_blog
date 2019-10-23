# Vue引入CDN优化首页访问速度

## 配置vue config js
在vue.config.js中添加如下的代码，引入外部的CDN。
``` javascript
configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'highlight':'highlight'
    }
  ```
  开源CDN链接[^1]
  ## 修改main js
  将引入外部资源的组件都注释掉，否则可能会出错。
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
  
  ## 在index html中引入
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
 ## 优化结果
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
  ## 存在的问题
  自己的博客想通过<mark>百度站长</mark>的https认证，奈何设置了前端路由之后，再去服务端nginx设置301重定向的时候，总是会出现重定向次数过多的问题，暂时只能先把这个问题放一放了。

  [^1]: 来源： [https://www.bootcdn.cn/](https://www.bootcdn.cn/)