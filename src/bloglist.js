// import Vue from 'vue'
import dayjs from "dayjs"
var storetech = [], storelife = [], tags = []



const bloglist = require.context("@/assets/blog/", true, /\.md$/);

bloglist.keys().forEach(key => {
  var index = key.lastIndexOf(".");
  const fileName = key.substring(0, index).split("/")[1]
  const markdown = require(`@/assets/blog/${fileName}.md`);
  if (markdown.attributes.type == "tech") {

    storetech.push({ title: fileName, date: markdown.attributes.date })


  } else {

    storelife.push({ title: fileName, date: markdown.attributes.date })
  }
  try{
  markdown.attributes.tags.split("|").forEach(element => {
    tags.push({ type: element, title: fileName, date: markdown.attributes.date })
  })}catch{
    return
  }

});

// 原数据tags
// [{
// 	"type": "js",
// 	"title": "ES5、6常见语法",
// 	"date": "2019-11-21"
// }, {
// 	"type": "vue",
// 	"title": "Node.js+Vue.js全栈开发手机端和管理后台(笔记)",
// 	"date": "2019-10-30"
// }, {
// 	"type": "node.js",
// 	"title": "Node.js+Vue.js全栈开发手机端和管理后台(笔记)",
// 	"date": "2019-10-30"
// }, {
// 标签


var res = [];
var narr = [];
for (var i = 0; i < tags.length; i++) {
  var n = res.indexOf(tags[i].type);
  // 若无则新增一个type对象里面包含type以及title对象
  if (n == -1) {
    res.push(tags[i].type);
    narr.push({ "type": tags[i].type, title: [{ title: tags[i].title, date: tags[i].date }] })
    // 若有这个type字段则只新增title对象
  } else {
    narr[n].title.push({ title: tags[i].title, date: tags[i].date })
  }
}



//排序
function compare(property) {
  return (a, b) => {

    var value1 = dayjs(a[property]);

    var value2 = dayjs(b[property]);
    return value2 - value1;
  }
}
storetech.sort(compare("date"))

storelife.sort(compare("date"))


export const lifelist = Vue.observable(storelife)
export const techlist = Vue.observable(storetech)
export const techlen = Vue.observable(storetech.length)
export const lifelen = Vue.observable(storelife.length)
export const taglist = Vue.observable(narr)


