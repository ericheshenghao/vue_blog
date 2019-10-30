# 使用Vue封装组件并发布到npm
![Photo by Josh Hild from Pexels ](http://eric-he.oss-cn-beijing.aliyuncs.com/2019/10/30/4d94bff807dfc3d1ec04c47b4ee353c6.jpg)

直接引用已有的UI框架固然方便，但是总是感觉缺失了一些灵魂，不了解组件的封装过程具体如何。所以也想自己diy一份发布到npm，不仅可以了解下具体的过程是怎样的，还可以加深自己的对vue框架的认识，这里主要借鉴了一下这篇[博客](https://www.cnblogs.com/max-tlp/p/9338855.html)的实现过程。
## 创建项目
首先创建项目，并使用默认设置。
``` bash
vue create vue-ui
```
## fontawsome图标库的引入
安装一下fontawesome图标库
```
 vue add vue-cli-plugin-fontawesome
```
手动导入的方式是
1. 先添加包
```
$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save @fortawesome/free-solid-svg-icons
$ npm i --save @fortawesome/vue-fontawesome
```
2. 中间写入文件  

在`pulgin/`下新建一个`fontawesome.js`文件。写入
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
### 再添加一个库
自己可以再添加一个品牌的图标库
```
npm i --save @fortawesome/free-brands-svg-icons
```
修改一下main.js
```
import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas,fab)
```
### 图标使用方式

```
// 实心图标标签引入
<font-awesome-icon :icon="['fas', 'qq']" class="share__icon share__icon--facebook" />

// brand的标签引入
<font-awesome-icon :icon="['fab', 'qq']" class="share__icon share__icon--facebook" />
```
