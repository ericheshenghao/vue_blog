---
title: Vue+next.js全栈项目
date: "2019-12-24"
category: tech
tags: vue|nest.js
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---

[[toc]]
记录一下 vue+next 的项目实现过程 🦆，最终想要达到的是`leancloud`所展示的后台效果，当然任重而道远(ง •\_•)ง
![终极目标](https://eric-he.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191124025717.png)

## 后端

### 使用 nest 的子项目模式搭建服务端

全局安装/更新 nest 框架

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

`/admin/src/app.module.ts`下引用 DbModule

```typescript
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

```typescript
import { TypegooseModule } from "nestjs-typegoose";

@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://localhost/topfullstack", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }),
    models
  ],
  providers: [DbService],
  exports: [DbService, models]
})
// user.controller.ts
@Controller("user")
export class UserController {
  @Get()
  list() {
    return [];
  }
}
```

在 src 目录下新建一个 models 文件夹用来存放模型。
![树形结构](https://eric-he.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191121155059.png)
首先可以先创建一个用户模型，包含用户账号与密码字段。
![用户模型](https://eric-he.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191121160048.png)

然后我们要在 admin 层级里添加控制器以及注入模型，在控制器中我们可以书写我们的路由。

```
$ nest g mo -p admin users  //表示在admin层级下新建user模型
$ nest g co -p admin users  //user 控制器co
$ nest g interceptor -p admin interceptors/errors //在interceptors\errors目录下创建拦截器
```

在注入模型，我们需要将所有模型装饰在`module`上,可以全局导入并导出。

![导入并导出所有模型](https://eric-he.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191124023408.png)

### 使用 Crud 装饰器快速实现增删查改接口

安装一下 crud 模块

```
//crud模块
$ npm i  nestjs-mongoose-crud
```

在下面的示例中，我使用了`@Controller()`装饰器，它是定义基本控制器所必需的。我指定了一个路由路径前缀`users`。在`@Controller()`装饰器中使用路径前缀可以使我们轻松地对一组相关的路由进行分组，并最大程度地减少重复代码。

```typescript{10}
// 路径: server\apps\admin\src\users\users.controller.ts
import { Controller, Inject } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { User } from "@libs/db/model/user.model";
@Crud({
  model: User
})
@Controller("users")
export class UsersController {
  constructor(@InjectModel(User) private readonly model) {}
}
```

我们还要安装一下 swagger 模块，实现后端接口的可视化

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

`Passport`是如今最火爆的 node.js 鉴权库，在许多产品中都可以看到他们的影子。我们可以通过使用`@nestjs/passport`直接使用这个模块。主要使用的步骤：

- 通过验证用户的“凭据”（例如用户名/密码，JSON Web 令牌（<mark>JWT</mark>）或来自身份提供者的身份令牌）来对用户进行身份验证。
- 管理身份验证状态（通过发出可移植的令牌（例如 JWT 或创建<mark>Express 会话</mark>））
- 将有关经过身份验证的用户的信息附加到 Request 对象，以在路由处理程序中进一步使用。

#### 鉴权要求

首先我们从客户端使用用户名和密码进行身份验证开始。一旦通过身份验证，服务器将发出 JWT，该 JWT 可以作为令牌添加到后续请求的请求头中，以证明身份。我们还将创建一条受保护的路由，只有包含有效 JWT 的请求才能访问该路由。

先从第一个要求开始：对用户进行身份验证。然后，我们将通过发布 JWT 扩展它。最后，我们将创建一条受保护的路由，以检查请求上的有效 JWT。

首先，我们需要安装所需的软件包。Passport 提供了一种称为本地护照（loacl-passport）的策略，该策略实现了用户名/密码身份验证机制，这符合我们对用例这一部分的需求。

```
$ npm install --save @nestjs/passport passport passport-local
$ npm install --save-dev @types/passport-local
```

> 注意:  
> 无论我们选择何种 Passport 策略，始终需要@nestjs/passport 和 passport 软件包。

#### 方法

现在，我们来实现身份验证的功能。首先我们创建一个**AuthModule**和**AuthService**：

```bash
$ nest g module auth
$ nest g service auth
```

现在我们的验证模块的目录如下
![验证模块](http://eric-he.oss-cn-beijing.aliyuncs.com/2019/12/15/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191215160438.png)
现在我们创建好了`AuthService`，但是用户的模块还是独立开来比较好，所以我们再创建一个用户模块以及用户服务。
![用户模块](http://eric-he.oss-cn-beijing.aliyuncs.com/2019/12/15/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191215160702.png)

```bash
$ nest g module users
$ nest g service users
```

在`usersService`中，我们可以事先写一个根据用户名查询用户是否存在的方法 👇。

```js
async findOne(username){
        return await this.userModel.findOne({username:username})
    }
```

然后在`AuthService`中，我们可以这样写。

```typescript
import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import bcrypt = require("bcryptjs");

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

    //如果找不到用户 返回null
    if (!user) {
      return null;
    }
    // 密匙对比
    const pass = bcrypt.compareSync(password, user.password);
    //用户存在且验证密码是否正确
    if (user && pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  // 登录验证方法
  async login(user: any) {
    console.log(4);
    const payload = { username: user.username, password: user.password };
    // 拿到jwt
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
```

### 登录认证

我们可以将这个登录的路由写在`app.controller`中

```ts
  // 首先经过路由守卫，方法在local.strategy中
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Req() req) {
    // 这里拿到req携带账号名和密码
    return this.authService.login(req.user);
  }
```

在`auth`目录下再创建三个文件分别为**constants.ts**、**jwt.strategy**以及**local.strategy**
![目录](http://eric-he.oss-cn-beijing.aliyuncs.com/2019/12/15/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191215164419.png)
在请求`auth/login`地址后，首先经过**local.strategy**

```ts
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // 验证用户名和密码
    console.log(1);
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException("账号或密码错误");
    }
    return user;
  }
}
```

然后经过`authService.validateUser`，如果通过则继续通过 login 方法登录并返回 token，否则返回 null，抛出上面所定义的异常。

前端的 token 的验证在`jwt.strategy`中处理，在需要的验证路由前提添加`@UseGuards(AuthGuard('jwt'))`

```ts
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "./constans";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: any) {
    console.log(3);
    return { password: payload.password, username: payload.username };
  }
}
```

登录成功时的打印顺序 1 > 4，之后在经过 jwt 验证的路由会打印 3.
![打印顺序](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/12/15/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191215170850.png)

## 前端

### 使用 vue 快速搭建项目结构

```
vue create admin
cd admin
vue add router
vue add element
vue add @vue/cli-plugin-typescript
npm i -d sass sass-loader
```

安装 typescript 插件时的选项
![typescript](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/12/22/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191222232638.png)

### 前端路由

在每个页面书写中，都需要写上@Component({})，否则路由无法正确跳转（坑）。

```
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Home extends Vue {}
```

### 发起请求

```
$ npm i @types/axios
```

### 使用 animate.css

```
npm install animate.css --save
```

在 main.js 中引入

```typescript
import animated from "animate.css";

Vue.use(animated);
```

vue 模板中：

```html
<div class="ty">
  <!-- 直接使用animated中的动画class名，注意：必须使用animated这个class名，否则动画会无效 -->
  <div class="box animated bounceInDown"></div>
</div>
```

### 封装 axios

```typescript
import axios from "axios";
import Vue from "vue";
import router from "./router";

const http = axios.create({
  baseURL: "http://localhost:3000/web/api"
});

// 添加请求头
http.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = "Bearer " + (localStorage.token || "");
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//添加一个反应拦截器
http.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    console.log(err.response.data.message);
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message
      });
      if (err.response.status === 401) {
        router.push("/login");
      }
    }

    return Promise.reject(err);
  }
);

export default http;
```

### route 路由监听

```typescript
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

```bash
$ npm install --save vue-clipboard2
```

用法

```html
<template slot-scope="scope" slot="menu">
  <el-button
    type="primary"
    icon="el-icon-tickets"
    v-clipboard:copy="scope.row.url"
    size="small"
    plain
    >复制</el-button
  >
</template>
```

### 数组 push 方法

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

```html
<template>
  <div id="contanier" class="d-flex">
    <el-button
      :class="`${this.pannel?'button-left animated bounceInRight':'button-right'}`"
      type="plain"
      @click="showpanel"
      :icon="`${this.pannel?'el-icon-close':'el-icon-s-tools'}`"
    ></el-button>
    <section v-show="pannel" @click="showoff">
      <div @click.stop="pannel=true">
        <div
          ref="msk"
          class="mask animated fadeIn"
          @click.stop="pannel=false"
        ></div>
        <div class="pannel animated bounceInRight">
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

### 重写 element-ui 上传方法

```html
<el-upload
  drag
  action="string"
  :http-request="uploadSectionFile"
  multiple
></el-upload>
```

方法

```ts
async uploadSectionFile(param) {
    const now = new Date()
    const date =dayjs(now).format("YYYY/MM/DD/")

    //创建一个form对象,必须是form对象否则后端接受不到数据
    let params = new FormData()
    // 向表单添加数据
    params.append('file',param.file,date+param.file.name);
     // 添加请求头 必须是multipart/form-data
    let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };

    // 发起请求
    const res = await this.$http.post("/upload",params,config)

    // const res = await client.put(date+param.file.name,param.file)
    setTimeout(() => {
      this.$emit("show");
    }, 1000);

    this.$message({
      type:"success",
      message:"上传成功"
      })
  }
```
