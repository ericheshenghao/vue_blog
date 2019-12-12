---
title: Vue+next.js全栈项目
date: '2019-12-24'
category: tech
tags: vue|nest.js
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---
[[toc]]
记录一下vue+next的项目实现过程🦆，最终想要达到的是`leancloud`所展示的后台效果，当然任重而道远(ง •_•)ง
![终极目标](https://eric-he.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191124025717.png)
## 后端
### 使用nest的子项目模式搭建服务端

全局安装nest框架
```bash
$ npm i -g @nestjs/cli
$ nest new server
$ cd server 
<!-- 在app目录下生成admin,后面再生成一个web,分别存放前端与后端路由 -->
$ nest g app admin
$ nest start -w admin
```
创建数据库
```
$ nest g lib db @libs
```
`/admin/src/app.module.ts `下引用DbModule
``` typescript
@Module({
    imports:[
        DbModule
    ],
})
```
连接数据库
```
npm install nestjs-typegoose @typegoose/typegoose
npm install mongoose @types/mongoose
```

``` typescript
import { TypegooseModule } from "nestjs-typegoose"

@Module({
  imports:[
    TypegooseModule.forRoot("mongodb://localhost/topfullstack",{
      useNewUrlParser: true,
      useUnifiedTopology:true,
      useCreateIndex:true,
      useFindAndModify:false,
    }),
    models
  ],
  providers: [DbService],
  exports: [DbService,models],
})

// user.controller.ts
@Controller('user')
export class UserController {
  @Get()
  list() {
    return [];
  }
}
```
在src目录下新建一个models文件夹用来存放模型。
![树形结构](https://eric-he.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191121155059.png)
首先可以先创建一个用户模型，包含用户账号与密码字段。
![用户模型](https://eric-he.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191121160048.png)

然后我们要在admin层级里添加控制器以及注入模型，在控制器中我们可以书写我们的路由。
```
$ nest g mo -p admin users  //表示在admin层级下新建user模型
$ nest g co -p admin users  //user 控制器co
```

在注入模型，我们需要将所有模型装饰在`module`上,可以全局导入并导出。

![导入并导出所有模型](https://eric-he.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191124023408.png)

### 使用Crud装饰器快速实现增删查改接口
安装一下crud模块
```
//crud模块
$ npm i  nestjs-mongoose-crud
```
在下面的示例中，我使用了`@Controller()`装饰器，它是定义基本控制器所必需的。我指定了一个路由路径前缀`users`。在`@Controller()`装饰器中使用路径前缀可以使我们轻松地对一组相关的路由进行分组，并最大程度地减少重复代码。
```typescript{10}
// 路径: server\apps\admin\src\users\users.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/model/user.model';
@Crud({
    model:User
})
@Controller('users')
export class UsersController {
    constructor(@InjectModel(User) private readonly model) {

    }
}
```

我们还要安装一下swagger模块，实现后端接口的可视化
```
$ npm i @nestjs/swagger swagger-ui-express
```


### 验证管道
安装
```
$ npm i --save class-validator class-transformer
```
### 鉴权
鉴权是大多数应用的关键部分。现今已有许多不同的方式鉴权，采用何种方式主要取决于具体的需求，这一节我们提供了几种满足不同需求的方式。

`Passport`是如今最火爆的node.js鉴权库，在许多产品中都可以看到他们的影子。我们可以通过使用`@nestjs/passport`直接使用这个模块。主要使用的步骤：
- 通过验证用户的“凭据”（例如用户名/密码，JSON Web令牌（<mark>JWT</mark>）或来自身份提供者的身份令牌）来对用户进行身份验证。
- 管理身份验证状态（通过发出可移植的令牌（例如JWT或创建<mark>Express会话</mark>））
- 将有关经过身份验证的用户的信息附加到Request对象，以在路由处理程序中进一步使用。

#### 鉴权要求
让我们充实我们的要求。对于此用例，客户端将从使用用户名和密码进行身份验证开始。一旦通过身份验证，服务器将发出JWT，该JWT可以作为承载令牌发送到后续请求中的认证头中，以证明身份验证。我们还将创建一条受保护的路由，只有包含有效JWT的请求才能访问该路由。

我们将从第一个要求开始：对用户进行身份验证。然后，我们将通过发布JWT扩展它。最后，我们将创建一条受保护的路由，以检查请求上的有效JWT。

首先，我们需要安装所需的软件包。Passport提供了一种称为本地护照（loacl-passport）的策略，该策略实现了用户名/密码身份验证机制，这符合我们对用例这一部分的需求。
```
$ npm install --save @nestjs/passport passport passport-local
$ npm install --save-dev @types/passport-local
```
> 注意:   
对于您选择的任何 Passport策略，始终需要@nestjs/passport和passport软件包。

#### 方法
现在，我们准备实现身份验证功能。我们将首先概述用于任何`Passport`策略的过程。将Passport本身视为一个小型框架会很有帮助。该框架的优雅之处在于，它会将身份验证过程抽象为您根据要实施的策略自定义的几个基本步骤。这就像一个框架，因为您通过以回调函数的形式提供自定义参数（作为纯JSON对象）和自定义代码进行配置，Passport会在适当的时候对其进行调用。该`@nestjs/passport`模块将此框架包装在Nest样式包中，从而易于集成到Nest应用程序中。我们将`@nestjs/passport`在下面使用。

首先创建一个`AuthModule`和`AuthService``：
```
$ nest g module auth
$ nest g service auth
```
现在我们创建了`AuthService`，但是用户的模块还是独立开来比较好，所以我们再创建一个用户模块以及用户服务。
```
$ nest g module users
$ nest g service users
```
在`usersService`中，我们可以事先写一个根据用户名查询用户是否存在的方法👇。
```
async findOne(username){
        return await this.userModel.findOne({username:username})
    }
```
然后在`AuthService`中，我们可以这样写。
``` typescript
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}
//验证用户管道
  async validateUser(username: string, password: string): Promise<any> {
    //查询用户
    const user = await this.usersService.findOne(username);
   
    //用户存在且验证密码是否正确
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
// 登录验证方法
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    // 拿到jwt
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

```






在这一小节我将介绍认证系统的JWT部分，首先我们来明确一下我们的需求。
> 允许用户通过用户密码的方式进行认证，并返回JWT给用户。
> 为api请求提供JWT认证保护。

因此我们需要安装下面JWT认证所需要的两个包
```
$ npm install @nestjs/jwt passport-jwt
$ npm install @types/passport-jwt --save-dev
```
其中`@nestjs/jwt`是大家所熟知的JWT验证包，`passport-jwt`提供可施行JWT策略，`@types/passport-jwt`提供typescript的类型定义。
现在我们假设有一个`POST /auth/login`请求。我们的目的就是通过由 `passport-local`战略提供内置`AuthGuard`来装饰我们的路由。
也就意味着：  
1. 路由只有对通过验证的用户相应。
2. 请求`req`包含了用户信息。

因此，我们可生成一个真正的JWT，并且在此路由中返回。我们将生成JWT的操作放在`authService`中，并添加一个`login()`方法。导入`JWTservice`：
``` typescript
//auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

  ## 前端
  ### 使用vue快速搭建项目结构
  ```
  vue create admin
  cd admin 
  vue add router
  vue add element
  vue add @vue/cli-plugin-typescript
  npm i -d sass sass-loader
  ```
  ### 发起请求
  ```
  $ npm i @types/axios
  ```
  ### 查询接口
query查询参数
```
//限制一条，查询第二页
{"limit":1,"page":2}
//倒序查询  
{"sort":{"_id":-1}}
//只查询名称为1112的数据  
{"where":{"name":"1112"}}
//模糊查询，正则表达式查询  
{"where":{"name":{"$regex":"f"}}}
```
前端query限制查到的数据为2条，并且将total总数量返回
```  typescript
async fetch() {
    const res = await this.$http.get(`${this.resource}`,{
      params:{
        query:this.query
      }
    });
    this.page.total=res.data.total
    this.data = res.data;
  }
  ```
  ### 使用animate.css
  ``` 
  npm install animate.css --save
  ```
  在main.js中引入
  ``` typescript
 import animated from 'animate.css' 

 Vue.use(animated)
 ```
 vue模板中：
 ``` html
 <div class="ty">
     <!-- 直接使用animated中的动画class名，注意：必须使用animated这个class名，否则动画会无效 -->
 <div class="box animated bounceInDown"></div>
 </div>
 ```
  ### 封装axios
  ``` typescript
  import axios from "axios"
import Vue from "vue"
import router from "./router"

const http = axios.create({
    baseURL: "http://localhost:3000/web/api"
})

// 添加请求头
http.interceptors.request.use((config)=>{
    if(localStorage.token){
        config.headers.Authorization = "Bearer " + (localStorage.token || "")
    }
    return config
},err=>{
    return Promise.reject(err)
})


//添加一个反应拦截器
http.interceptors.response.use(res => {
    return res
}, err => {
    console.log(err.response.data.message)
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: "error",
            message: err.response.data.message
        })
        if (err.response.status === 401) {
            router.push("/login")
        }
    }

    return Promise.reject(err)
})




export default http
  ``` 

### route路由监听
``` typescript
@Watch('$route')
routerchange(to:any,from:any){
  this.fetch()
}
```
### screenfull.js
Simple wrapper for cross-browser usage of the JavaScript Fullscreen API, which lets you bring the page or any element into fullscreen. Smoothens out the browser implementation differences, so you don't have to.
```
npm i screenfull
```
### 复制文字到剪贴板
安装 [vue-clipboard2](https://www.npmjs.com/package/vue-clipboard2)
``` bash
$ npm install --save vue-clipboard2
```
用法
``` html
<template slot-scope="scope" slot="menu">
  <el-button
  type="primary"
  icon="el-icon-tickets"
  v-clipboard:copy="scope.row.url"
  size="small"
  plain      
  >复制</el-button>
</template>
```


### 数组push方法
```typescript{10}
 async fetch() {
    const res = await client.list({
      prefix: "",
      deliment: "/",
      "maxKeys": 2
    });
    this.page.total = res.objects.length;
    this.data = res.objects;
    res.objects.map(item=>{
        this.srcList.push(item.url)
    })
    console.log(this.srcList)
  }
```
### 遮罩层点击事件监听
事件绑定及方法
``` html
<template>
  <div id="contanier" class="d-flex">
    <el-button :class="`${this.pannel?'button-left animated bounceInRight':'button-right'}`" type="plain" @click="showpanel" :icon="`${this.pannel?'el-icon-close':'el-icon-s-tools'}`"></el-button>
    <section v-show="pannel" @click="showoff">
      <div @click.stop="pannel=true"> 
      <div ref="msk" class="mask animated fadeIn" @click.stop="pannel=false"></div>
      <div class="pannel animated bounceInRight" >
        <slot></slot>
      </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class RightPanel extends Vue {
  pannel: boolean = false;
  showpanel() {
    this.pannel = !this.pannel;
  }
  showoff() {
   this.pannel = !this.pannel;
    
  }
}
</script>

```
### 一些css样式的重置
表格宽度的重置
``` css
table{
word-break: break-all; 
word-wrap:break-word;
width: 100%;
  @media (max-width: 36em) {
    width: auto;
  }
}
```
防止移动端字体大小变化`font boosting`
``` html 
<meta name="viewport" content="user-scalable=no,width=device-width,initial-scale=1.0,maximum-scale=1,minimum-scale=1">
<style lang="less">
    html {
      -webkit-text-size-adjust: none;
    }
</style>
```

