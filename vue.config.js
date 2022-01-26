module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    https: true
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    }
  }
}
