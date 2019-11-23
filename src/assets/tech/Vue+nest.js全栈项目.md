# Vue+next.js全栈项目
记录一下vue+next的项目实现过程🦆，最终想要达到的是`leancloud`所展示的后台效果，当然任重而道远(ง •_•)ง
![终极目标](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/11/20/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191124025717.png)
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
$ nest g lib db //@libs
/admin/src/app.module.ts 引用DbModule
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

```

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
```
在src目录下新建一个models文件夹用来存放模型。
![树形结构](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/11/20/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191121155059.png)
首先可以先创建一个用户模型，包含用户账号与密码字段。
![用户模型](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/11/20/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191121160048.png)

然后我们要在admin层级里添加控制器以及注入模型，在控制器中我们可以书写我们的路由。
```
$ nest g mo -p admin users  //表示在admin层级下新建user模型
$ nest g co -p admin users  //user 控制器co
```

在注入模型，我们需要将所有模型装饰在`module`上,可以全局导入并导出。

![导入并导出所有模型](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/11/20/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191124023408.png)

### 使用Crud装饰器快速实现增删查改接口
安装一下crud模块
```
//crud模块
$ npm i  nestjs-mongoose-crud
```
食用
```js{10}
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
我们还要安装一下swagger模块,实现后端接口的可视化
```
$ npm i @nestjs/swagger swagger-ui-express
```

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
```  
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
