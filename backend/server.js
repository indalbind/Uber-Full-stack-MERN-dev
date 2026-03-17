const http = require('http')

const app = require('./app') // here we are importing the app.js 

const server = http.createServer(app) // 

const port = process.env.PORT || 3000;


server.listen(port, () => { // in place of 3000 put the port variable 
    console.log(`server is running on the  port ${port}`)
})