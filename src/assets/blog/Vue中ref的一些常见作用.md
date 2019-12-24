---
title: Vue中ref的一些常见作用
date: '2019-12-09'
category: tech
tags: vue
note: ""
---
[[toc]]
![Photo by Rok Romih from Pexels](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/12/09/photo-of-building-on-top-of-rocks-3312671.jpg)
照例是一张美图镇楼。`ref`的功能很强大，下面介绍一下基本的功能。
## 获取页面dom元素
``` html
<template>
  <div id="app">
    <div ref="testDom">11111</div>
    <button @click="getTest">获取test节点</button>
  </div>
</template>

<script>
export default {
  methods: {
    getTest() {
      alert(this.$refs.testDom)
    }
  }
};
</script>
```
拿到了这个节点的信息，在浏览器控制台也可以看到打印出了节点的信息。
<iframe height="400" style="width: 100%;" scrolling="no" title="vue-ref" src="https://codepen.io/ericheshenghao/embed/ExaKVEq?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ericheshenghao/pen/ExaKVEq'>vue-ref</a> by 何先森
  (<a href='https://codepen.io/ericheshenghao'>@ericheshenghao</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 获取子组件的data
> 其实`ref`除了可以获取本页面的`dom`元素，还可以拿到子组件中的`data`和调用子组件中的方法。 

子组件`helloworld`：
``` html
<template>
  <div>
      {{ msg }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "hello world"
    }
  }
}
</script>
```
父组件
``` html
<template>
  <div id="app">
    <HelloWorld ref="hello"/>
    <button @click="getHello">获取helloworld组件中的值</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  components: {
    HelloWorld
  },
  data() {
    return {}
  },
  methods: {
    getHello() {
      console.log(this.$refs.hello.msg)
    }
  }
};
</script>
```
成功拿到了子组件中的`msg`数据。
![打印结果](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/12/09/7047742-3d72465f00cc0c87.png)

## 父组件调用子组件的方法
子组件
``` html
<template>
  <div>
  </div>
</template>

<script>
export default {
  methods: {
    open() {
      console.log("调用到了")
    }
  }
}
</script>
```
父组件
``` html
<template>
  <div id="app">
    <HelloWorld ref="hello"/>
    <button @click="getHello">获取helloworld组件中的值</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  components: {
    HelloWorld
  },
  data() {
    return {}
  },
  methods: {
    getHello() {
      this.$refs.hello.open();
    }
  }
};
</script>
```
调用了子组件的`open()`方法成功打印了内容👇
![打印结果](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/12/09/7047742-e3bfdd2fc4c48d6d.png)
## 子组件调用父组件
> `this.$emit("")`即可。

