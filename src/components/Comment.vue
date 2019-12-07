<template>
  <div>
    <div v-if="show" class="comment" style="padding:20px;">
      <div style="display:flex;justify-content:space-between">
      <div v-if="length==0?true:false">暂无评论</div>
      <div v-else> </div>
      <el-button type="text" @click="showoff"><i class="el-icon-close" ></i></el-button>
      
      </div>
      <div v-for="(item,index) in commentData" :key="index" style="display:flex;justify-content:space-around">
        <div>{{item.comment}}</div>
        <div>{{item.created}}</div>
      </div>

      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea"
      ></el-input>
      
      <div style="text-align:center">
      <el-button type="primary" @click="submission" style="margin-top:20px;">提交评论</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    show: false,
    eachparagraph: ""
  },
  watch: {
    show: function() {
      this.commentData = [];

      this.fetch();
    }
  },
  data() {
    return {
      commentData: [],
      length: "",
      textarea: ""
    };
  },

  methods: {
    showoff(){

    },
    submission(){

    },
    fetch() {
      const uploadParagraph = this.eachparagraph;

      const uploadUrl = this.$route.path;

      const query = new AV.Query("parasComment");
      query.equalTo("p", uploadParagraph);
      query.find().then(async res => {
        // console.log(res);
        // if (res.length == 0) {
        //   const Paras = AV.Object.extend("parasComment");
        //   const paras = new Paras();
        //   paras.set("url", uploadUrl);
        //   paras.set("p", uploadParagraph);
        //   paras.save();
        //   this.length = res.length
        // } else {
        this.length = res.length;

        this.commentData.push({
          comment: res[0].attributes.comment,
          created: dayjs(res[0].createdAt).format("YYYY/MM/DD")
        });
        console.log(this.commentData);
        // }
      });
    }
  }
};
</script>

<style lang="less" >
.comment {
  height: auto;
  min-height: 160px;
  width: 300px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  background-color: white;
  border-radius: 20px;
}
</style>