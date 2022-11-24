const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    :'/'
})
