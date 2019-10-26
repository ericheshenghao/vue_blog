// import Vue from 'vue'
var i = 0;
var storetech = {}
const context = require.context("@/assets/tech/", true, /\.md$/);
context.keys().forEach(key => {
    var index = key.lastIndexOf(".");
    const fileName = key.substring(0, index).split("/")[1]

    storetech[i] = {};
    storetech[i].content = fileName;
    ++i;
});

export const bloglist = Vue.observable(storetech)
export const techlen = Vue.observable(i)

var j = 0;
var storelife = {}
const life = require.context("@/assets/life/", true, /\.md$/);
life.keys().forEach(key => {
    var index = key.lastIndexOf(".");
    const fileName = key.substring(0, index).split("/")[1]
    storelife[j] = {};
    storelife[j].content = fileName;
    ++j;
});
export const lifelist = Vue.observable(storelife)
export const lifelen = Vue.observable(j)

