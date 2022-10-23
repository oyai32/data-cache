var path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
var webpack_config = {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
  }
