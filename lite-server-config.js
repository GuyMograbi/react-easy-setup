
module.exports = {
  "port" : 8000,
  "files" : ["index.html", "dist/**/*"],
  "server" : {
    "middleware" : {
      1:  require('connect-history-api-fallback')({index: '/index.html', verbose: true})
    }
  }
}