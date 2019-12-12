<template>
  <div>
    <transition
    name="custom-classes-transition"
    enter-active-class="animated bounceInUp"
    leave-active-class="animated bounceOutDown"
  >
    <div v-if="show" class="comment" :style="`top:${top+5}px`">
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
     </transition>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    show: false,
    whichpara: ""
  },
  watch: {
    show: function() {
      const res = document.getElementsByClassName("commentBtn");

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
    async submission() {
      if (this.comment.length > 0) {
        const uploadParagraph = this.whichpara[0].para;
        const uploadUrl = this.$route.path;
        const Paras = AV.Object.extend("parasComment");
        const paras = new Paras();
        paras.set("url", uploadUrl);
        paras.set("p", uploadParagraph);
        paras.set("comment", this.comment);
        await paras.save();
        this.commentData = [];
        this.fetch();
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

<style lang="scss" >
article  .commentBtn{
  border:none;
  background-color: transparent;
  color: black;
  position: absolute;
  transform: translate(-195%,45%);
  @media (max-width: 36em) {
   transform: translate(-55%,45%);
  }
  
}
.comment {
  max-height: auto;
  min-height: 160px;
  width: 300px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  background-color: white;

  z-index: 7;
}
.el-divider--horizontal {
  margin: 5px 0 5px 0;
}
.data {
  padding-right: 8px;
  overflow: hidden;
  max-height: 200px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
}
</style>