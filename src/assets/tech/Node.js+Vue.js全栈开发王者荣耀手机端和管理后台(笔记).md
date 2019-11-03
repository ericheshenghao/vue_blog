# Node.js+Vue.js全栈开发王者荣耀手机端和管理后台(笔记)
本项目基于 Bilibili 全栈之巅相关教程  
源地址：[https://www.bilibili.com/video/av51931842](https://www.bilibili.com/video/av51931842)

## 准备工作
>工具安装及环境搭建：(node.js、npm、mongodb)
```
$ npm i -g nodeman
```
package.json的script中添加一个自定义的指令
```
"scripts": {
    "serve": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
## 整体步骤
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

## 基于ELEMENT UI
``` bash
vue add element 
```
## 管理后台搭建

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
cd server
npm i express@next
npm i mongoose
npm i cors
```
### 数据请求
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
app.use(require('cors')())
app.use(express.json())
require("./plugins/db")(app)
require("./routes/admin")(app)
app.listen(3000,()=>{
    console.log("http://localhost:3000");
});
```
### 新建并连接数据库
```
module.exports = app => {
    const mongoose = require("mongoose")
    mongoose.connect("mongodb://127.0.0.1:27017/node-vue-moba",{
        useNewUrlParser:true,
        useUnifiedTopology: true
    })

}
```

## 一些知识点

### eslint报错
解决eslint未使用变量报错的情况[^1],在rule里修改成下面的代码，其中的数字1表示警告，如果改成0表示忽略，2表示error。

```
"rules": {
      "no-unused-vars": [1, {"vars": "all", "args": "after-used"}]
    },
```
### 中间件
用来处理图片上传和将复数变为单数的中间件
```
npm i multer inflection
```
用法：xxx
### 加密
让后端密码密文保存的方法，在model中的password字段里`setvalue`对前端传回来进行加密。需要`npm i bcrypt`。
```{4}
 password: {
        type: String,
        set(value) {
            return require('bcrypt').hashSync(val,10)
        }
    },
```
### token处理
用来处理token验证的npm包
``` 
npm i jsonwebtoken
```
### 判断条件是否满足

``` 
npm i http-assert
```
### 错误代码
500：服务端  
402：自定义的err返回码


[^1]:https://blog.csdn.net/qq_33712668/article/details/97244254