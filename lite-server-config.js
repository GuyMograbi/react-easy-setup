var fs = require('fs')
module.exports = {
  'port': 8000,
  'files': ['index.html', 'dist/**/*'],

  'server': {
    'routes': {
      '/app/scripts': './dist/app/scripts'
    },
    'middleware': {
      1: require('connect-history-api-fallback')({index: '/index.html', verbose: false}),
      2: function (req, res, next) {
        // for some reason "routes" does not catch this
        if (req.url.indexOf('/app/scripts') === 0) {
          res.end(fs.readFileSync('./dist' + req.url))
        } else {
          next()
        }
      }
    }
  }
}
