# Nest.js后端服务搭建(全栈之巅笔记)
记录一下自己全栈实现的一些重要过程。
``` bash
$ npm i -g @nestjs/cli
$ nest new server
```
新建一个admin
```
nest g app admins
```
## 写接口
启动项目
``` bash
nest start -w admin
```
创建一个数据库。
``` bash
nest g lib db
```
在app.module.ts中导入新建的数据库。
``` js
@Module({
  imports: [
    DbModule
  ],
```
连接数据库。 
``` bash
npm add nestjs-typegoose @typegoose/typegoose
```
安装mongoose模块
```
npm add mongoose @types/mongoose
```
在db.module.ts中写入下面的代码。
```
@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://localhost/topfullstack",{
      useNewUrlParser: true,
      useUnifiedTopology:true,
      useCreateIndex:true,
      useFindAndModify:false,
    })
  ],
```

```
nest g mo -p admin users
nest g co -p admin users
````
```
npm add nestjs-mongoose-crud
```

```
npm add @nestjs/swagger swagger-ui-express
```
在main.ts中引入swagger  
[https://docs.nestjs.com/recipes/swagger](https://docs.nestjs.com/recipes/swagger)

### 注意
在main.ts中加入下面的代码可以看到Promise没有catch()处理err的具体位置
```
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
```
全局验证包
npm add class-validator class-transformer

## 后端界面
### vue子路由写法
在`router/index.ts`中，可以这样写子路由
``` js{10}
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/main.vue'),
    children:[
      {name:"home",path:"/",component: () => import('../views/Home.vue')}
    ]
  }
```
这样home页面就作为main页面的子路由。
### ts的script写法
```
<script lang="ts">
// 属性装饰器
import {Vue,Component} from "vue-property-decorator";

@Component({})
export default class Main extends Vue{

}
</script>
```