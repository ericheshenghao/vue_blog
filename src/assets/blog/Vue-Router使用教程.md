---
title: Vue-Router使用教程
date: '2019-10-29'
type: tech
tags: vue|router
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---
## 快速开始
### HTMl
```
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 通过 router-link 组件导航. -->
    <!-- 通过 `to` 属性指定路径. -->
    <!-- `<router-link>` 默认渲染为 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- route outlet -->
  <!-- 匹配到的组件会在此处渲染 -->
  <router-view></router-view>
</div>
```
通过注入router，我们我们可以在任意组件内部访问到`this.$router`
```
// Home.vue
export default {
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
```
## 动态路由匹配
我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果。
```
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```
我们可以在一个路由中设置多段“路径参数”，对应的值都会设置到 $route.params 中。例如：
|模式|	匹配路径|	$route.params|
:-: | :-: | :-: | :-: 
|/user/:username	|/user/evan	|{ username: 'evan' }|
|/user/:username/post/:post_id	|/user/evan/post/123|	{ username: 'evan', post_id: '123' }|

### 捕获所有路由或 404 Not found 路由
常规参数只会匹配被 / 分隔的 URL 片段中的字符。如果想匹配任意路径，我们可以使用通配符 (*)：
```
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```
当使用通配符路由时，请确保路由的顺序是正确的，也就是说含有通配符的路由应该放在最后。路由` { path: '*' } `通常用于客户端 404 错误。如果你使用了History 模式，请确保正确配置你的服务器。

当使用一个通配符时，`$route.params` 内会自动添加一个名为 pathMatch 参数。它包含了 URL 通过通配符被匹配的部分：
```
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```
## 编程式的导航
除了使用 `<router-link> `创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。
### router.push(location, onComplete?, onAbort?)
> 注意：在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push。

想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

当你点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="..."> `等同于调用 router.push(...)。

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：
```
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})

```
注意：如果提供了`path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 `name` 或手写完整的带有参数的 `path`：
```
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```
### router.replace(location, onComplete?, onAbort?)
跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。
### router.go(n)
这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似` window.history.go(n)`。
```
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```
## 命名视图
有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。
```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```
一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 s)：
```
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```
### 嵌套命名视图
我们也有可能使用命名视图创建嵌套视图的复杂布局。这时你也需要命名用到的嵌套 `router-view` 组件。我们以一个设置面板为例：
```
/settings/emails                               /settings/profile
+-----------------------------------+          +------------------------------+
| UserSettings                      |          | UserSettings                 |
| +-----+-------------------------+ |          | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  +---->  | | Nav | UserProfile        | |
| |     +-------------------------+ |          | |     +--------------------+ |
| |     |                         | |          | |     | UserProfilePreview | |
| +-----+-------------------------+ |          | +-----+--------------------+ |
+-----------------------------------+          +------------------------------+
```
`Nav` 只是一个常规组件。   
`UserSettings` 是一个视图组件。    
`UserEmailsSubscriptions`、`UserProfile`、`UserProfilePreview` 是嵌套的视图组件。

`UserSettings` 组件的 `<template>` 部分应该是类似下面的这段代码：
```
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar/>
  <router-view/>
  <router-view name="helper"/>
</div>
```

然后你可以用这个路由配置完成该布局：
```
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

## 路由组件传参
在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。
使用 `props` 将组件和路由解耦：

取代与 `$route` 的耦合
```
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```
通过 `props` 解耦
```

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```
这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试。

## 使用过程的记录
通过to来传递
```
<router-link :to="{name:'bloglist',params:{name:'life'}}">
```
// 前面的`name`对应的是`router`中的`name`的值,后面是自己定义的传递的参数，这样我们就可以给同一个页面传递不同的参数了。

这种方式导致后面又遇到页面刷新`this.$route.params.xxx`刷新丢失的情况，解决方法也很简单，将路由修改成下面这样，就是让路径也带上参数。
```
{
      path: '/bloglist/:name',
      name: 'bloglist',

      component: () => import('./views/BlogListTech.vue')
    },
```
动态的修改一些数据
```
  data() {
    return {
      lifelist,
      bloglist,
      //切换分类
      list:this.cat()? bloglist:lifelist,
      tech:"tech",

    };
  },
  methods:{
    cat(){
       return this.$route.params.name=="tech"?true:false 
     },
  }
```