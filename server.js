const http = require('http')

const port = 8080

const responseBody = (req) => {
  return {
    message: "Hello there",
    requestIp: req.connection.remoteAddress
  }
}

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(responseBody(req)))
})

server.listen(port, () => {
  console.log(`Server running on port ${port}...`)
})
