const path = require("path");
const CompressionPlugin = require('compression-webpack-plugin');//引入gzip压缩插件

const webpack = require("webpack");
// vue.config.js
module.exports = {
  //基本路径(相对于服务器根目录   静态资源的相对路径)
  publicPath:"./", //font scss资源路径 不同环境切换控制

  productionSourceMap:false,//打包时不要map文件
  //输出文件目录
  outputDir: "dist",

  //是否在保存的时候检查
  lintOnSave: true,

  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',

  devServer: {
    // host: 'localhost',
    // host: "0.0.0.0",
    // https: false, // https:{type:Boolean}
    // open: true, //配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/
    // hotOnly: true, // 热更新
    port: 8080
    // proxy:{
    //   '/': {
    //     target: 'http://192.168.0.125:3000/',
    //     changeOrigin: true,
    //     pathRewrite: {}
    //   },
  },
  configureWebpack: {//引入jquery
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      }),
      new CompressionPlugin({//gzip压缩配置
        test:/\.js$|\.html$|\.css/,//匹配文件名
        threshold:10240,//对超过10kb的数据进行压缩
        deleteOriginalAssets:false,//是否删除原文件
      })
    ]
  },
};