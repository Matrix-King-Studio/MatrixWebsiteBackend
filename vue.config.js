module.exports = {
  devServer: {
    proxy: {
      '/dai': {
        target: 'http://101.42.249.49:11111',
        ws: true,
        pathRewrite: {
          "^/dai": ''
        }
      }

    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}