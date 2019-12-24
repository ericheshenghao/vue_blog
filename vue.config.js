const slugify = require("transliteration").slugify;
const Mode = require('frontmatter-markdown-loader/mode')
const markdownIt = require('markdown-it');
module.exports = {
  configureWebpack:
  {
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'highlight': 'highlight',
    },
  },
  devServer: {
    disableHostCheck: true
  },

  chainWebpack: config => {

    config.module.rule('markdown')
      .test(/\.md/)
      
      .use('frontmatter-markdown-loader')
      .loader('frontmatter-markdown-loader').tap(options => {
       
        return {
          markdownIt: markdownIt({ html: true, xhtmlOut: true,
            typographer: true }).use(require("markdown-it-anchor"),
                {
                  level: 2, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
                  slugify: slugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性
                  permalink: true, // 开启标题锚点功能
                  permalinkBefore: true, // 在标题前创建锚点
                  permalinkSymbol: "#",
                  permalinkSpace: true,
                }).use(require("markdown-it-toc-done-right"),
                    {
                      level: [2, 3],
                      // containerId:"table-of-contents shadow",
                      // forceFullToc: true,
                      containerClass:"table-of-contents shadow",
                      listClass:"link-ul",
                      itemClass:"link-li",
                      linkClass:"link-a",
                      slugify: slugify
                    }).use(require("markdown-it-footnote")),
          mode: [Mode.VUE_COMPONENT]
        }
      })

  },
}