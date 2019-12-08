---
title: Vue+Leancloud快速搭建段落评论组件
date: '2019-12-07'
category: tech
tags: vue|leancloud
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---
## 实现流程
1. 给特定的标签元素添加html元素(包含click事件)
2. 通过点击事件动态弹出评论框
3. 新建一个表结构
4. 将评论写入数据库
5. 获取数据库内容并展示
### 添加html元素
首先我们在父组件中写方法。
``` js
methods:{
addcomment() {
      var paragraph = [];
      var i = 0;
    // 这里我的评论模块设置在`blockquote p`下
      $("blockquote p").each(function() {
        // 获取p标签中的内容
        var container = $(this).html();
        // push数组
        paragraph.push(container);
        // 添加一个upload方法,传递一个数字i,这样可以知道点击事件属于第几个p标签
        $(this).before(
          `<button class='commentBtn' onclick='commentClick(${i})'><i class='fa fa-comment-o'></i></button>`
        );
        i++;
      });
      this.paragraph = paragraph;
    },
hide() {
  //在子组件中调用这个方法，用来关闭评论框
      this.showcomment = !this.showcomment;
    },
commentClick(e) {
      this.whichpara = [];
      this.showcomment = !this.showcomment;
      //将这一段内容，以及一个index push给whichpara
      this.whichpara.push({ para: this.paragraph[e], index: e });
    },
}
mounted(){
        this.addcomment();
        // 注册commentClick方法，否则jquery生成的标签调用不了vue的方法
        window.commentClick = this.commentClick;
    },
data() {
    return {
      whichpara: [],
      paragraph: [],
      showcomment: false,
    };
  }
```
### 动态展示评论框
子组件
``` js
<template>
  <div>
    <div v-if="show" class="comment animated bounceInUp" :style="`top:${top+5}px`">
      <div style="padding:0px 15px 0 15px">
        <div style="display:flex;justify-content:space-between;">
          <div v-if="length==0?true:false">暂无评论</div>
          <div v-else></div>
          <el-button type="text" @click="showoff">
            <i class="el-icon-close"></i>
          </el-button>
        </div>
        <div class="data">
          <div v-for="(item,index) in commentData" :key="index">
            <div style="font-size:12px;color:gray;">{{item.created}}</div>
            <div style="font-size:14px;line-height:20px;">{{item.comment}}</div>
          </div>
        </div>
      </div>

      <el-divider></el-divider>
      <div style="padding:0px 15px">
        <el-input
          style="margin-top:10px"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5}"
          placeholder="请输入内容"
          v-model="comment"
        ></el-input>

        <div style="text-align:right">
          <el-button type="text" @click="submission">提交评论</el-button>
        </div>
      </div>
    </div>
 
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    // 拿到父组件传入的两个属性值，show用来控制弹出框，whichpara传递段落内容
    show: false,
    whichpara: ""
  },
  watch: {
    show: function() {
      const res = document.getElementsByClassName("commentBtn");

      // 这个段落距离顶端的距离
      this.top = res[this.whichpara[0].index].offsetTop;

      this.commentData = [];
      this.fetch();
    }
  },
  data() {
    return {
      commentData: [],
      length: "",
      comment: "",
      top: ""
    };
  },

  methods: {
    showoff() {
      this.$emit("showoff");
    },
    submission() {
      if (this.comment.length > 0) {
        const uploadParagraph = this.whichpara[0].para;
        
        const uploadUrl = this.$route.path;
        const Paras = AV.Object.extend("parasComment");
        const paras = new Paras();
        paras.set("url", uploadUrl);
        paras.set("p", uploadParagraph);
        paras.set("comment", this.comment);
        paras.save();
        this.commentData = [];
        //重新加载评论内容
        this.fetch();
        // 清空评论框
        this.comment = "";
        this.$message("评论成功");
      } else {
        this.$message({
          type: "warning",
          message: "请输入内容"
        });
      }
    },
    fetch() {
      const uploadParagraph = this.whichpara[0].para;

      const uploadUrl = this.$route.path;

      const query = new AV.Query("parasComment");
      query.equalTo("p", uploadParagraph);
      query.find().then(async res => {
        res.map((v, id) => {
          this.commentData.push({
            comment: res[id].attributes.comment,
            created: dayjs(res[id].createdAt).format("YYYY-MM-DD HH:mm:ss")
          });
        });
        this.length = res.length;
      });
    }
  }
};
</script>

```
### 最终效果
> 评论组件


