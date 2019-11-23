# Vue项目的SEO优化之路

## 安装vue-meta
```
$ npm i vue-meta
```
CDN引入
```
<script src="https://unpkg.com/vue-meta/dist/vue-meta.min.js"></script>
```
具体食用方法：首先要在main.js中引入
```
import Vue from 'vue'
import VueMeta from 'vue-meta'
 
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})
```
接下来如果我们要动态的更改`title`的话，要写成方法。
```
<template>
  ...
</template>
 
<script>
  export default {
  // 添加title 写到方法里面
  metaInfo() {
    return {
      title: this.$route.params.name?this.$route.params.name:"Mosaic",
      titleTemplate: "%s - Yay!",
      htmlAttrs: {
        lang: "en",
        amp: true
      }
    };
  }
  }
</script> 
```
## 页面预渲染插件prerender-spa-plugin（失败）
1. 安装 prerender-spa-plugin，使用淘宝镜像安装 cnpm
```
$ npm install prerender-spa-plugin --save
```
2. 在vue.config.js中添加`plugins`
```
const slugify = require("transliteration").slugify;
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');
module.exports = {
  configureWebpack:
  {
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'highlight': 'highlight',
    },

    plugins: [
      new PrerenderSPAPlugin({
        // 生成文件的路径，也可以与webpakc打包的一致。
        // 下面这句话非常重要！！！
        // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
        staticDir: path.join(__dirname, 'dist'),
        // 对应自己的路由文件，如果index有参数，则不适用（心累）
        routes: ['/', '/post', '/about'],
        // 这个很重要，如果没有配置这段，也不会进行预编译
          minify: {
            minifyCSS: true, // css压缩
            removeComments: true // 移除注释
        },
        renderer: new Renderer({
          inject: {
            foo: 'bar'
          },
          headless: false,
          // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
          renderAfterDocumentEvent: 'render-event'
        })
      })
    ]

  },
  devServer: {
    disableHostCheck: true
  },
```
3. 在main.js中添加下面这行
```{5}
new Vue({
  router,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')

```
4. 预渲染一定要把路由模式变成history
```
const router = new Router({
  mode: 'history', // 预渲染一定要模式改成history
  routes: baseRoute
})
```