---
title: Vue框架初尝PWA
date: '2019-10-21'
category: tech
tags: vue
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---

PWA(Progress Web App)，即<mark>渐进式WEB应用</mark>[^1]。在第一次生成web页面之后，后续用户即可通过加载cache来实现页面的光速渲染，而且有利于提高用户的留存度。因此配置一个PWA应用就灰常重要了，前端小白瞎捣鼓开始👺。
## 给已有的应用添加PWA
首先，在项目根目录输入以下指令。
``` bash
vue add @vue/cli-plugin-babel
```
安装完成后，在根目录下会默认生成一个public/img文件夹，里面是用于不同设备上显示的icon，我们可以通过网站快捷生成[^2]，然后替换掉其中的图片就可以了。
### 配置vue config js
在vue.config.js中添加如下的代码，我采用的是GenerateSW方式，GenerateSW与InjectManifest的区别暂时还不是很清楚。
``` javascript{9}
pwa: {
    name: 'Mosaic',
    themeColor: '#FFFFFF', //主题颜色
    msTileColor: '#FFFFFF',  //磁贴颜色
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#FFFFFF',  //apple状态栏颜色

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      // swSrc: 'dev/service-worker.js',
      // ...other Workbox options...
    }
  },
  ```
  ### npm run build
  将我们的项目打包好并推送到服务端，应用PWA还有一个前提就是全站要开启Https，因为PWA的权重比较大，所以需要做好安全工作。
  可以看到，地址栏右边👉已经出现了一个加号。
  ![success](https://eric-sheng-1300164148.cos.ap-guangzhou.myqcloud.com/2019/10/22/bdcf2303aec6b3ecf9ea5e99106c527e.jpg) 
    点击之后就可以将应用安装在本地了，秒开毫无压力。
  ![本地应用生成](https://eric-sheng-1300164148.cos.ap-guangzhou.myqcloud.com/2019/10/22/f1367c99adb66d3c304f9dfdc6ecb5af.jpg) 

  此外，我们还可以通过Chorme的<mark>Audit</mark>来测试PWA的性能，他会给出一些优化的选项，例如优化首页的开启速度，冗余CSS如何处理之类的建议，还是比较直观的。
![Audit](https://eric-sheng-1300164148.cos.ap-guangzhou.myqcloud.com/2019/10/22/1cb08638dd265f12c801e3449a133bbe.jpg) 
  我检测之后分数得到的比较低，在这里就不贴图了😆。

  [^1]: 来源： [https://pwa.baidu.com/pwa/README](https://pwa.baidu.com/pwa/README)
  [^2]: 提供： [https://realfavicongenerator.net/](https://realfavicongenerator.net/)