const slugify = require("transliteration").slugify;
module.exports = {
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'highlight':'highlight',
    }
  },
  pwa: {
    name: 'Mosaic',
    themeColor: '#FFFFFF',
    msTileColor: '#FFFFFF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#FFFFFF',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      // swSrc: 'dev/service-worker.js',
      // ...other Workbox options...
    }
  },
  devServer: {
    proxy: { // 配置如下代码
      '/api': {
        target:'https://api.jisuapi.com/jieqi/query?appkey=4867c88bc726b526&year=', // 你请求的第三方接口
        changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite:{  // 路径重写，
          '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求https://xxxxxx/dictionary/data_dictionary_front.json这个地址的时候直接写成/api即可。
        }
      }
},
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
          [require("markdown-it-footnote")],
        ]
      })
  }
}