const path = require("path");
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "" : "/",
    // 基本路径
    // baseUrl: "./",
    // 输出文件目录
    outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: (config) => {},
    configureWebpack: (config) => {},
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
      // 是否使用css分离插件 ExtractTextPlugin
      extract: true,
      // 开启 CSS source maps?
      sourceMap: false,
      // css预设器配置项
      loaderOptions: {
          sass: {
              //此处使用 prependData 而非 data
              prependData: `@import "./src/styles/main.scss";`
          }
      },
      // 启用 CSS modules for all css / pre-processor files.
      requireModuleExtension: true
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require("os").cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see vuejs/vue-cli
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
      open: false,
      host: "0.0.0.0",
      port: 8083,
      https: false,
      hot: true,
      hotOnly: false,
      overlay: {
        warnings: false,
        errors: true
      },
      proxy: null, // 设置代理
      // before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
      // ...
    }
  };