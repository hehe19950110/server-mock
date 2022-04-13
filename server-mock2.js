const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer((req, res) => {
  let pathObj = url.parse(req.url, true)
  switch (pathObj.pathname) {
    case '/getWeather':
      if(pathObj.query.city === '北京')
        res.end(JSON.stringify({city: '北京', weather: '晴'}))
      else
        res.end(JSON.stringify({city: pathObj.query.city, weather: 'unknown'}))
      break
    default:
      try {
        let pathname = pathObj.pathname === '/' ? '/server-mock.html' : pathObj.pathname
        res.end( fs.readFileSync(__dirname + pathname) )
      } catch(e) {
        res.writeHead(404, 'Not Found')
        res.end('<h1>404 Not Found~</h1>')
      }
  }
}).listen(8080)