# 使用Vue封装组件并发布到NPM
![Photo by Josh Hild from Pexels ](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/10/30/4d94bff807dfc3d1ec04c47b4ee353c6.jpg)

直接引用已有的UI框架固然方便，但是总是感觉缺失了一些灵魂，不了解组件的封装过程具体如何。所以也想自己diy一份发布到npm，不仅可以了解下具体的过程是怎样的，还可以加深自己的对vue框架的认识，这里主要借鉴了一下这篇[博客](https://www.cnblogs.com/max-tlp/p/9338855.html)的实现过程。
## 创建项目
首先初始化一个`webpack`项目。
``` bash
$ vue init webpack my-project
$ npm i
```
稍加修改一下生成的目录结构👌
![目录结构](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/10/31/a6a97f6a2ba910990e38880b2c0e71a8.jpg) 
 
其中的`main.vue`文件写入你自己的要发布的组件的内容，该目录下的`index.js`用来将组件导出。
``` js{4}
// index.js中的内容
import sharebutton from './main';

sharebutton.install = Vue => Vue.component(sharebutton.name, sharebutton); //此处用到了之前定义的name，之后的标签名就是这个name
if (typeof window !== 'undefined' && window.Vue) {
 install(window.Vue);
}

export default sharebutton;
```
>warning:注意在`main.vue`需要在`script`标签内中暴露一个名字，在组件注册以及标签引用的时候会用到，具体如下

```
<script >
export default {
  name: 'share-button',
}

</script>
``` 

现在我们在`app.vue`中自行引入`sharebutton`组件（测试用），对发包没有影响，当然也可以什么都不写。
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
在webpack.config.js中添加下列代码，entry在不同的模式下引用不同的入口文件
``` js
const NODE_ENV = process.env.NODE_ENV;
console.log("-----NODE_ENV===",NODE_ENV);

module.exports = {
  entry: NODE_ENV == 'development' ? './src/main.js' : './src/plugin/ index.js', //不同模式下使用不同的js文件
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'ui-button.js',
    library: 'ui-button', // 指定的就是你使用require时的模块名
    libraryTarget: 'umd', // 指定输出格式
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
  },
```
index.html中的源文件地址也要修改一下(测试用)
``` html{9}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>vue-plugin</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/dist/ui-button.js"></script>
  </body>
</html>
```
接下来在`package.josn`添加下面两行，
```
  "private": false,

// 这个指 import 的时候它会去检索的路径，这样我们`import ui_button_vue`就相当于`import dist/ui-button.js`。
  "main": "dist/ui-button.js",
```
发包之前可以通过修改`.gitignore`文件过滤掉一些不需要上传的文件，比如像这样子👇
```
.DS_Store
node_modules/
src/
npm-debug.log
yarn-error.log

# Editor directories and files
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.html
```
## 发包
>准备工作：npm官网注册一下账号  
 
接下来我们在命令行这样
```
$ npm login 
$ npm publish
```
然后会让我们输入账号密码及邮箱地址，之后就会看到我们上传成功的结果图啦😉。
![上传结果](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/10/31/e65ba5e9cb266acf744693c3933a2cae.jpg) 
若是出现`You do not have permission to publish "vue-plugin". Are you logged in as the correct user?`的提示，可以尝试修改一下`package.josn`的name，应该就可以通过了⭐。
可以看到我们的包已经静静躺在这里了🐟，开箱即食。
![我的包包](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/10/31/333868148190fbc184c176dd68d6c273.jpg) 

## 尝试使用自己的npm包
命令行安装一下npm包
```
$ npm i ui_button_vue
```
然后可以在node_moudules看到自己的包的挫样子👇

![目录结构](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/10/31/5f55a15f5789a5b21a40cc65777e6ac6.jpg) 

安装完成后在`main.js`入口文件中引入
```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mybutton from "ui_button_vue"

Vue.config.productionTip = false

Vue.use(mybutton)

new Vue({
router,
render: h => h(App)
}).$mount('#app')
```
现在我们可以用标签的方式引入自己的组件了，只需要这样的姿势，其中`share-button`就是我们之前在`main.vue`中暴露的name。
```
<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<share-button></share-button>
	</div>
</template>
```
锵锵👐，可以看到引入的组件了，引入方式也和`element-ui`一样。
![按钮](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/10/31/5f1307462b27a88f5d343d4f6a1be00c.jpg) 
当然，这只是开始，由简入繁，野蛮生长。
## 多个组件的情况
站长很懒，什么都没有留下。



