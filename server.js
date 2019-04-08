const http = require('http')
const uuid = require('uuid/v4')

// Basic configuration values.
const port = 8080
const deploymentId = uuid()

// Some helpful messages our server will send back to clients.
const messages = [
  "A complex system that works is invariably found to have evolved from a simple system that worked.",
  "Testing shows the presence, not the absence of bugs.",
  "The competent programmer is fully aware of the strictly limited size of his own skull.",
  "Simplicity is a great virtue but it requires hard work to achieve it.",
  "Programs must be written for people to read, and only incidentally for machines to execute.",
  "Language is an instrument of human reason, and not merely a medium for the expression of thought.",
  "Comprehensiveness is the enemy of comprehensibility."
]

// Helper function that selects a random element from an array.
const selectRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

// Helper function that generates the body for our server's response.
const responseBody = (req) => {
  return {
    message: selectRandom(messages),
    deploymentId: deploymentId,
    timestamp: Date.now()
  }
}

// Our small and simple server.
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(responseBody(req)))
})

// Spin it up!
server.listen(port, () => {
  console.log(`Server running on port ${port}...`)
})
