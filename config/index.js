'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

// process（进程）是nodejs的一个全局变量，process.env 属性返回一个用户环境信息的对象
const path = require('path')

module.exports = {
  // ===================开发环境配置

  dev: {
    assetsSubDirectory: 'static',//静态资源文件夹(一般存放css、js、image等文件)
    assetsPublicPath: '/',//根目录
    proxyTable: {},//配置API代理，可利用该属性解决跨域的问题

    // 各种DEV服务器设置
    host: 'localhost', // 可以被 process.env.HOST 覆盖
    port: 8080, // 可以被 process.env.PORT 覆盖
    autoOpenBrowser: false,//编译后自动打开浏览器页面 http://localhost:3030/("port + host",默认"false"),设置路由重定向自动打开您的默认页面
    errorOverlay: true,//浏览器错误提示
    notifyOnErrors: true,//跨平台错误提示
    poll: false, //webpack提供的使用文件系统(file system)获取文件改动的通知devServer.watchOptions(监控文件改动)

    // 使用Eslint Loader,如果为true，则在捆绑期间将对您的代码进行处理，
    // 并且linting错误和警告将显示在控制台中.
    useEslint: true,
    // 如果为true，则eslint错误和警告也将显示在浏览器的错误覆盖中。
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */
    devtool: 'cheap-module-eval-source-map',//webpack提供的用来调试的模式，有多个不同值代表不同的调试模式

    // 如果您在devtools中调试vue文件时遇到问题
    cacheBusting: true,// 配合devtool的配置，当给文件名插入新的hash导致清除缓存时是否生成source-map
    cssSourceMap: true //记录代码压缩前的位置信息,当产生错误时直接定位到未压缩前的位置,方便调试

  },

  // ========================生产环境配置

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),//编译后"首页面"生成的绝对路径和名字

    assetsRoot: path.resolve(__dirname, '../dist'),//打包编译的根路径(默认dist，存放打包压缩后的代码)
    assetsSubDirectory: 'static',//静态资源文件夹(一般存放css、js、image等文件)
    assetsPublicPath: '/plateno/',//发布的根目录(dist文件夹所在路径)

    /**
     * Source Maps
     */

    productionSourceMap: true,//是否开启source-map
    devtool: '#source-map',//(详细参见：https://webpack.docschina.org/configuration/devtool)

    // 默认情况下Gzip关闭，因为很多流行的静态主机，如Surge或Netlify已经为你gzip所有静态资产。
    // 如果设置位true，请确保已经安装了 npm install --save-dev compression-webpack-plugin:
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],//unit的gzip命令用来压缩文件（gzip模式下需要压缩的文件的扩展名有js和css）

    // 运行带有额外参数的build命令//在构建完成后查看bundle analyzer报告
    // `npm run build --report`
    // 设置为“true”或“false”以始终打开或关闭它
    bundleAnalyzerReport: process.env.npm_config_report//是否开启打包后的分析报告
  }
}
