const http = require('http')
const uuid = require('uuid/v4')

const port = 8080
const deploymentId = uuid()

const responseBody = (req) => {
  return {
    message: "Hello there",
    deploymentId: deploymentId,
    timestamp: Date.now()
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
