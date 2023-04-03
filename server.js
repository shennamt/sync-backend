const express = require('express')
const path = require('path') // concatenate files and directory path segments
const cookieParser = require('cookie-parser') // parse http requests
const logger = require('morgan') // logs http req and res
const cors = require('cors') // relaxes same-origin policy restriction
// const http = require('http')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app = express()

dotenv.config()

// MIDDLEWARE
app.use(cors())
app.use(logger('dev')) // logs req and res on single line with detailed seperated by -
app.use(express.json()) // parsing JSON req bodies
app.use(express.urlencoded({ extended: false })) // val in req.body object will be strings or arrays; handling form submissions
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public'))) // access browser static files

// ROUTES
app.use('/', require('./src'))

// CONNECTING TO DB
mongoose.connect(process.env.MONGODB_URL).then(() => {
  // LISTENER
  app.listen(process.env.PORT, () => {
    console.log("Connected to DB and listening on port", process.env.PORT)
  }) 
}).catch((error) => {
  console.log(error)
})