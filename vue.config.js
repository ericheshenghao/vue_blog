const slugify = require("transliteration").slugify;
module.exports = {
devServer: {
    disableHostCheck: true
 },
 chainWebpack: config => {
  config.module.rule('md')
   .test(/\.md/)
   .use('vue-loader')
   .loader('vue-loader')
   .end()
   .use('vue-markdown-loader')
   .loader('vue-markdown-loader/lib/markdown-compiler')
   .options({
    raw: true,
    use: [
      // 标题锚点
      [
        require("markdown-it-anchor"),
        {
          level: 2, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
          slugify: slugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性
          permalink: true, // 开启标题锚点功能
          permalinkBefore: true, // 在标题前创建锚点
          permalinkSymbol: "#",
          permalinkSpace: true,
        }
      ],
      [require("markdown-it-footnote")]
    ]
   })
 }
}