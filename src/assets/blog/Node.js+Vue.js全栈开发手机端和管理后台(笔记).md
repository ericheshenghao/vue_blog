---
title: Node.js+Vue.js全栈开发手机端和管理后台(笔记)
date: '2019-10-30'
type: tech
tags: vue|node.js
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---



[[toc]]

本项目基于 Bilibili 全栈之巅相关教程  
源地址：[https://www.bilibili.com/video/av51931842](https://www.bilibili.com/video/av51931842)  


## 管理端
>工具安装及环境搭建：(node.js、npm、mongodb、vue-cli)
vue-cli只安装router+bable+eslint，其他自行按需安装.
```
$ mkdir server
$ npm i -g nodeman
$ npm i init 
```
package.json的script中添加一个自定义的指令
```
"scripts": {
    "serve": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```


### 整体步骤
1. 基于ELEMENT UI
2. 创建分类
3. 分类列表
4. 修改分类
5. 删除分类
6. 子分类
7. CRUD接口
8. 装备管理
9. 图片上传
10. 英雄管理
11. 编辑英雄
12. 装备的多选
13. 技能的编辑
14. 文章管理
15. 富文本编辑器
16. 首页广告管理
17. 管理员账号管理
18. 登陆页面
19. 登录接口
20. 服务端登陆验证
21. 客户端路由限制
### 更新vue-cli

```
$ npm uninstall -g vue-cli
$ npm install -g @vue/cli
```
### 基于ELEMENT UI
``` bash
$ vue add element 
```
初始项目尽量简洁。  
>tips：重写scss设置为No。
### 管理后台搭建

```
// 需要注意的地方
<el-menu-item index="/categories/create">新建分类</el-menu-item>
<el-menu-item index="/categories/list">分类列表</el-menu-item>
---
children:[
      {path:"/categories/create",name: 'create',component:()=> import("../views/CategoryEdit")}
    ]
```

```
$ cd server
$ npm i express@next
$ npm i mongoose
// 跨域请求
$ npm i cors
```
#### 数据请求
前端的`baseURL`要与后端的相对应
```
import axios from "axios"
const http = axios.create({
    baseURL:"http://localhost:3000/admin/api"
})

export default http
```
将http导出，在main.js给vue添加一个实例属性，这样就可以以`this.$http`的方式去调用他。
```
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from "./http"

Vue.config.productionTip = false
// 加载到实例属性上
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

```
这是分离出去的路由的写法
```
module.exports = app => {
    const express = require("express")
    const router = express.Router()
    const Category = require("../../models/Category")
// 这是一个post路由 
    router.post("/categories",async(req,res)=>{
     res.send('Hello World!')
       const model = await Category.create(req.body)
       res.send(model)
    }) 
    app.use('/admin/api',router)
}
```
最终在主入口文件中这样调用，也就是`admin`中的`app`模块
```{7}
const express = require("express")

const app = express()
// 允许跨域请求
app.use(require('cors')())
// 允许处理json格式的数据
app.use(express.json())
require("./plugins/db")(app)
require("./routes/admin")(app)
app.listen(3000,()=>{
    console.log("http://localhost:3000");
});
```
#### 新建并连接数据库
```
module.exports = app => {
    const mongoose = require("mongoose")
    mongoose.connect("mongodb://127.0.0.1:27017/node-vue-moba",{
        useNewUrlParser:true,
        useUnifiedTopology: true
    })

}
```

### 登陆验证
客户端通过login拿到token
```
async login() {
      const res = await this.$http.post("user/login", this.model);

      // 将返回的token赋值给localStorage，并跳转回首页
       localStorage.token = res.data.token;
        
      this.$message({
        type: "success",
        message: "登陆成功"
      });
      this.$router.push("/");
    },
```
服务端路由
```
  router.post("/user/login", async (req, res) => {
        //拿到用户名和密码
         const { username, password } = req.body
         const user = await User.findOne({
            username: username
        }).select("+password")

        // 查询用户是否存在
        assert(user, 422, "用户不存在")

        // 密匙对比
        const isValid = require("bcrypt").compareSync(password, user.password)
        
        assert(isValid, 422, '密码错误')

        // token签名
        const token = jwt.sign({
            id:user._id,

        },app.get("secret"))

        res.send({token})
    })
```


### 一些知识点
#### 聚合查询
```
router.get("/category/:id",async(req,res)=>{
           
          const model = await Category.aggregate([
            // 匹配Category中name字段
            {$match:{name:req.params.id}},
            {
            // 从website集合中查询，category是wensite中的外键，通过category把website查询出来
                $lookup: {
                    from: "website",
                    localField: "_id",
                    foreignField: "category",
                    as: "websitelist"
                }
            }
        ])  
            res.send(model)
    })
```
#### 模板字符串

```
//地址拼接
<template slot-scope="scope">
          <a :href="`https:\\`+scope.row.link" target="blank">https://{{scope.row.link}}</a>
        </template>
```

#### 图片的上传与获取

管理端写法

```
//图片上传
    const multer = require("multer")
    const upload = multer({ dest: __dirname + "/../../uploads" })
    router.post("/upload", upload.single("file"), async (req, res) => {
        // 拿到上传的file文件后，给file添加一个属性，url，在返回给客户端展示出来
        const file = req.file
        file.url = `http://localhost:3000/admin/api/uploads/${file.filename}`
        res.send(file)
    })


```

#### eslint报错
解决`eslint`未使用变量报错的情况[^1],在`package.json`的`eslintConfig`中的`rule`里添加下面的代码，其中的数字1表示警告，如果改成0表示忽略，2表示error。  
常见规则[列表](https://blog.csdn.net/qq_34645412/article/details/78974413)。
```
"rules": {
      "no-unused-vars": [1, {"vars": "all", "args": "after-used"}],
      "no-console": 1,  
    },
```
修改完后要重新`npm run serve`一下
#### 中间件
用来处理图片上传和将复数变为单数的中间件
```
npm i multer inflection
```
用法：xxx
#### 加密
让后端密码密文保存的方法，在model中的password字段里`setvalue`对前端传回来进行加密。需要`npm i bcrypt`。
```{4}
 password: {
        type: String,
        set(value) {
            return require('bcrypt').hashSync(val,10)
        }
    },
```
#### token处理
用来处理token验证的npm包
``` 
npm i jsonwebtoken
```
#### 断言

``` 
npm i http-assert
```

#### 富文本编辑器
```
npm i vue2-editor
```
在后台传入数据之后，在前端以`v-html="model.body"`的方式引入就可以了
#### 错误代码
500：服务端  
402：自定义的err返回码

## 移动端
- "工具样式"概念和sass(scss)
- 样式重置
- 网站色彩和定义
- 通用flex布局样式定义
- 常用边距定义
- 首页顶部轮播图片
- 使用字体图标
- 使用精灵图标
- 卡片组件
- 列表卡片组建
- 首页新闻资讯
- 首页英雄列表
- 新闻详情页
- 英雄详情页

### "工具样式"概念和sass(scss)(复用)
```
npm i -d sass sass-loader
```
### 样式重置
新建`style.scs`s,在`main.js`中引用
```
import "./style.scss"
```
写入下面的代码(样式重置)
```
// reset
// 防止自己撑大
*{
    box-sizing:border-box;
	outline: none; //去掉表单元素的高亮
}

html {
    font-size: 13px; //基础字体大小
}

body{
    padding:0;
    margin:0;
	font-family: Arial, Helvetica, sans-serif; //sans-serif代表非称线字体
	line-height: 1.2em;
	background: #f1f1f1;
}
// 按钮样式重置
button{
border: 0;
 
background-color: transparent;
 
outline: none;
}
a{
    color:#999;
}
```
### 网站色彩和定义
vs中可以安装一个插件px to rem    
用法：alt+z
```
// colors
$colors:(
    "primary":#db933f,
    "white":#fff,
    "light": #f9f9f9,
    "black":#333,
    "dark":#222,
    "gray":#999,
    "dark-1":#343440,
);
//循环生成工具类
//第一个参数为键值及键名 第二个为对象
@each $colorkey, $color in $colors {
  .text-#{$colorkey} {
    color: $color;
  }
  .bg-#{$colorkey}{
    background-color: $color;
  }
}

// text align
//第一个参数为变量 第二个为集合
@each $var in (left, center, right) {
  .text-#{$var} {
    text-align: $var;
  }
}

// font size 的工具类
$base-font-size: 1rem;
$font-sizes: (
  xs: 0.7692, //10px  插件设置里将基础的字体改为上面html中设置的13px，这样就保证了整个页面只有一个基础的px大小
  sm: 0.9231, //12px 
  md: 1,      //13px
  lg: 1.0769, // 14px
  xl: 1.2308,// 16px
);

@each $sizekey,$size in $font-sizes {
    .fs-#{$sizekey}{
        font-size:$size * $base-font-size
    }
}

// flex 布局
.d-flex {
  display: flex;
}
.flex-column{
  flex-direction: column;
}

// justify-content
$flex-jc: (
  start: flex-end,
  end: flex-end,
  center: center,
  between: space-between,
  around: space-around
);

@each $key, $value in $flex-jc {
  .js-#{$key} {
    justify-content: $value;
  }
}

// align-items
$flex-ai: (
  start: flex-end,
  end: flex-end,
  center: center,
  stretch:stretch,
);
@each $key, $value in $flex-ai {
  .ai-#{$key} {
    align-items: $value;
  }
}

.flex-1{
  flex:1;
}
// 占满整个盒子
.flex-1{
  flex-grow:1;
}

// 常用边距
// 0-5六个等级
// .mt-1 => margin top .pb-2 => pading-bottom
$spacing-types: (
  m: margin,
  p: padding
);
$spacing-directions: (
  t: top,
  r: right,
  b: bottom,
  l: left
);
$spacing-base-size: 1rem;
$spacing-sizes: (
  0: 0,
  1: 0.25,
  2: 0.5,
  3: 1,
  4: 1.5,
  5: 3
);

// 三层循环嵌套
// m-0 ,mx-0
@each $typeKey, $type in $spacing-types {
  // .m-1{ margin:0.25rem}
  @each $sizekey,$size in $spacing-sizes {
    // .mt-1{ margin-top:0.25rem}
    .#{$typeKey}-#{$sizekey} {
      #{$type}: $size * $spacing-base-size;
    }
  }
  // .mx-1
  @each $sizekey,$size in $spacing-sizes {
    // .mt-1{ margin-top:0.25rem}
    .#{$typeKey}x-#{$sizekey} {
      #{$type}-left: $size * $spacing-base-size;
      #{$type}-right: $size * $spacing-base-size;
    }
  }
  // .my-1
  @each $sizekey,$size in $spacing-sizes {
    // .mt-1{ margin-top:0.25rem}
    .#{$typeKey}y-#{$sizekey} {
      #{$type}-top: $size * $spacing-base-size;
      #{$type}-bottom: $size * $spacing-base-size;
    }
  }

  @each $directionKey ,$direction in $spacing-directions {
    @each $sizekey,$size in $spacing-sizes {
      // .mt-1{ margin-top:0.25rem}
      .#{$typeKey}#{$directionKey}-#{$sizekey} {
        #{$type}-#{$direction}: $size * $spacing-base-size;
      }
    }
  }
  
}


```
### 首页顶部轮播图片
安装插件
```
$ npm i vue-awesome-swiper --save
```
参考swiper的api文档[^2],要实现图片的轮播，只需要再加上👇这一行代码就可以了。
```{6}
  return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        },
         autoplay:true,
      },
      swiperSlides: [1, 2, 3]
    };
```
### 使用精灵图标
参考:sprite cow
优点:多色 缺陷:更换复杂
```
// sprite
.sprite{
  background:url(../imgs/index.png) no-repeat 0 0 ;
  background-size: 28.8462rem; //图片的一半 375px
  display:inline-block;
  &.sprite-news{
    // background: url('imgs/index.png') no-repeat -64px -7px;
    background-position: 63.546% 15.517%;
    width: 1.7692rem;
	height: 1.5385rem;
  }

  &.sprite-arrow{
    background-position: 38.577% 52.076%;
    width: 0.7692rem;
	height: 0.7692rem;
  }
}
```
### 使用字体图标
在iconfont网站上添加需要的图标并以代码形式下载并添加到项目中，然后在文件夹中打开`.html`后缀的文件会给出具体的使用方法，大概就是用👇这种方式来引入，方便异常。
```
<i class="iconfont icon-big-hero"></i>
```
可以随便改变样式和大小，推荐使用字体图标。

### 卡片布局
#### 组件传参
给组件内部传参，首先定义一个组件，像这样
```
<i class="iconfont" :class="`icon-${icon}`"></i>
<div class="fs-xl flex-1 px-2">{{title}}</div>
```
可以看到上面留了两个坑位，然后我们在`script`标签里暴露一个prop，大概这样
```
export default {
    props:{
        title:{type:String,require:true},
        icon:{type:String,require:true},
    }
}
```
然后我们在`main.js`里全局引用一下这个组件，姿势👇
```
import Card from "./components/Card.vue"
Vue.use("m-card",Card) //重新命名
```
现在我们在其他页面去引用它,并将数据传进去，这样就能动态的修改了
```
<m-card icon="big-hero" title="新闻资讯"></m-card>
```
#### 插槽slot
首先，我们已经写好了组件`m-card`，
```
<m-card icon="big-hero" title="新闻资讯">12121</m-card>
```
但是我们突然想在这个容器里面写一些内容👆，按html的套路很正常我们想到的就是直接在两个标签内些内容，比如121211，然鹅，这是不行滴，因为这样写，组件根本不知道要将这部分内容放在什么位置，因此插槽就诞生了，只要我们这样，在子组件想要插入内容的地方写上slot标签，👇
```
<div class="card-body">
    <slot></slot>
</div>
```
让后再去写内容，就可以正常的显示出来了
#### 具名插槽
![多层的嵌套](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/11/04/8112f86919657ff6c1e4c3e00bd04856.jpg) 
像这种多层级的嵌套的数据，当我们想要将它循环展示出来的时候，只用slot插槽可能满足不了我们的要求，所以我们可以这样
```
<swiper>
        <swiper-slide v-for="(category,i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
</swiper>
```
首先categories是父组件传过来的props属性，含有多级数据，我们对他进行for循环得到一个category，之后我们将这个category赋值给slot插槽的category属性，将它命名为items，然后我们在父组件中，采用👇这种方式来获得传过来的cateogory属性，并在标签内引用。
```
<template #items="{category}">
        <div class="py-2" v-for="(news,i) in category.newsList" :key="i">
          <span>[{{news.categories}}]</span>
          <span>|</span>
          <span>{{news.title}}</span>
          <span>{{news.data}}</span>
        </div>
      </template>
```
#### 吸顶效果
```
.topbar{
  //实现吸顶效果
  position:sticky;
  top:0;
  z-index: 10;
}
```

### 首页新闻资讯
头皮发麻的操作：在chorme的console界面输入下面的命令，其中替换掉类名就可以获得一些标签内的文本内容。
```
$$('.news_list .title').map(el=>el.innerHTML)
```
介绍一个后端插件`require-all`，主要作用是将某个文件下所有内容引用一遍。
```
npm i require-all
```
用法
``` bash 
require("require-all")(__dirname+"/../models")
```
#### 点击跳转到某个子分类
```
@click="$refs.list.swiper.slideTo(i)"
//下面的swiper要给一个ref
<swiper ref="list">
...
<swiper>
```
### server中的前端路由
```
//前端路由
module.exports = app => {
    const router = require("express").Router()
    const mongoose = require("mongoose")
    const Category = mongoose.model("Category")
    const Article = mongoose.model("Article")
    router.get("/news/init", async (req, res) => {
        // 找到上级分类为新闻分类的子分类
        const parent = await Category.findOne({
            name: "新闻分类"
        })
        // 筛选出子分类
        const cats = await Category.find().where({
            parent: parent
        }).lean()
        const newsTitles = ["假装有很多内容"]
        const newsList = newsTitles.map(title => {
            //对子分类排序
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2), //拿到前两个分类设置给模型的属性
                title: title,
                //    randomCats:randomCats
            }
        })
        await Article.deleteMany({}) //清除所有
        await Article.insertMany(newsList) //插入
        res.send(newsList)
    })


    // 第二个接口，用于前端调用
    router.get("/news/list", async (req, res) => {
        // const parent = await Category.findOne({
        //     name:"新闻分类"
        // }).populate({
        //     path:"children",
        //     populate:{
        //         path:'newsList'
        //     }
        // }).lean()
        //最终得到新闻分类的子分类的新闻
        const parent = await Category.findOne({
            name: "新闻分类"
        })
        // 聚合查询 同时执行好几次查询 聚合管道
        const cats = await Category.aggregate([
            //过滤数据
            { $match: { parent: parent._id } },
            //关联查询
            {
                $lookup: {
                    from: "articles",
                    localField: "_id",
                    foreignField: "categories",
                    as: "newsList"
                }
            },
            // 修改获取到的数量
            {
                $addFields: {
                    newsList: { $slice: ["$newsList", 5] }
                }
            }
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: "热门分类",
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).populate("categories").limit(5).lean()
        })

        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = (cat.name === "热门分类") ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        res.send(cats)

    })

    app.use("/web/api", router)
}
```
### 日期数据处理
```
npm i dayjs
```
console界面获取英雄数据，类似于jquery
```
$$(".hero-nav >li").map((li,i)=>{
	return {
		name:li.innerText,
		heros:$$("li",$$(".hero-list")[i]).map(el=>{
	return {
		name:$$("h3",el)[0].innerHTML,
		avator:$$("img",el)[0].src		
}	
})
    }
})
```
将上面的代码放入`json.stringify(...)`可以将数据转化为json格式
当我们`npm i`的时候，可能会出现`Unexpected end of JSON input while parsing near`的错误，解决办法：
- 清除缓存
```
npm cache clean --force 
```
- 重新安装
```
npm i
```


## 发布和部署
### 准备工作

```
$ npm i -g serve
$ serve dist
```
需要更改baseURL地址
```
 baseURL: process.env.VUE_APP_API_URL || "/admin/api"
```
修改输出的目录，参考[https://cli.vuejs.org/config/#publicpath](https://cli.vuejs.org/config/#publicpath)
在vue.config.js中添加下列代码。
```
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/'
}
```
### 服务器环境搭建
以ubunto服务器为例
```
 # apt update
 # apt install -y nginx
 # apt install -y mongodb-server
 # apt install -y git
 # apt install -y node.js
 # apt install -y npm
 // 设置淘宝镜像源
 # npm config set registry https://registry.npm.taobao.org
 // 镜像管理器
 # npm install -y -g nrm 
 # nrm use taobao
// 升级node的包
 # npm install -y -g n
 # n lts // 安装长期支持版本
 # ssh-keygen
 # cat /root/.ssh/id_rsa.pub
 # {
 # git init 
 # git add 
 # git commit -am "首次提交"
 # }
 # cd ~
 # mkdir /data
 # git clone
 # cd server
 # npm i 
 # npm i pm2
 # pm2 start index.js
 # pm2 delete all 
 # curl http://localhost:3000
 # service nginx reload
```

 ### 配置nginx反向代理
插件 remote-ssh配置[^3]
[https://nginxconfig.io/](https://nginxconfig.io/)





[^1]:https://blog.csdn.net/qq_33712668/article/details/97244254
[^2]:https://www.swiper.com.cn/api/autoplay/16.html
[^3]:https://blog.csdn.net/sixdaycoder/article/details/89850064