module.exports = {
  lintOnSave: false,

  configureWebpack: {
    devtool: 'source-map'
  },

  pwa: {
    themeColor: '#303030',
    msTileColor: '#303030',
    manifestOptions: {
      background_color: '#303030'
    }
  },

  transpileDependencies: [
    'vuetify'
  ]
}
