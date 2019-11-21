# Vue+next.js全栈项目

## 使用nest的子项目模式搭建服务端
全局安装nest
```
$ npm i -g @nestjs/cli
$ nest new project-name
$ cd server 
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
npm install mongoose @type/mongoose

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
![创建模型](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/11/20/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191121155059.png)

![用户模型](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/11/20/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191121160048.png)

```
$ nest g mo - p admin users  //user 模型
$ nest g co - p admin users  //user 控制器co
$ npm i  nestjs-mongoose-crud
$ npm i @nestjs/swagger swagger-ui-express
```

```
npm i @types/axios
```
## 使用Crud装饰器快速实现增删查改接口
