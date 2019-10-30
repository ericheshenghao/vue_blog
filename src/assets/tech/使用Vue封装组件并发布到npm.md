# 使用Vue封装组件并发布到NPM
![Photo by Josh Hild from Pexels ](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/10/30/4d94bff807dfc3d1ec04c47b4ee353c6.jpg)

直接引用已有的UI框架固然方便，但是总是感觉缺失了一些灵魂，不了解组件的封装过程具体如何。所以也想自己diy一份发布到npm，不仅可以了解下具体的过程是怎样的，还可以加深自己的对vue框架的认识，这里主要借鉴了一下这篇[博客](https://www.cnblogs.com/max-tlp/p/9338855.html)的实现过程。
## 创建项目
首先创建项目。
``` bash
$ vue init webpack my-project
$ npm i
```
稍加修改一下生成的目录结构👌
![目录结构](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/10/31/eb2c99b18b6aa809a8370a09e7de95f5.jpg) 
在`/pulgin`下新建一个xxx.vue文件，写入你自己的要发布的组件的内容。在该目录下同样新建一个`index.js`将组件导出。
``` js
import sharebutton from './sharebutton';

sharebutton.install = Vue => Vue.component(sharebutton.name, sharebutton);//注册组件

export default sharebutton;
```
然后在`app.vue`中引入`sharebutton`组件
``` js
<template>
  <div id="app">
    <sharebutton></sharebutton>
  </div>
</template>

<script>
import sharebutton from '../src/plugin/sharebutton'; 

export default {
  components:{
    sharebutton  //引入组件
  }
}

</script>
```
## 修改配置文件
在webpack.config.js中添加下列代码
``` js
const NODE_ENV = process.env.NODE_ENV;
console.log("-----NODE_ENV===",NODE_ENV);

module.exports = {
  entry: NODE_ENV == 'development' ? './src/main.js' : './src/plugin/ index.js', //不同模式下使用不同的js文件
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'sharebutton.js',
    library: 'sharebutton', // 指定的就是你使用require时的模块名
    libraryTarget: 'umd', // 指定输出格式
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
  },
```
index.html中的源文件地址也要修改一下
``` html{9}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>vue-plugin</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/dist/sharebutton.js"></script>
  </body>
</html>
```
`package.josn`添加下面两行
```
  "private": false,
  "main": "dist/sumFunction.js",
```
## 发包
```
$ npm login 
$ npm publish
```
![上传结果](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/10/31/e65ba5e9cb266acf744693c3933a2cae.jpg) 
若是出现`You do not have permission to publish "vue-plugin". Are you logged in as the correct user?`的提示，可以尝试修改一下`package.josn`的name，应该就可以通过了⭐。
可以看到我们的包已经静静躺在这里了🐟，开箱即食。
![我的包包](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/10/31/333868148190fbc184c176dd68d6c273.jpg) 


