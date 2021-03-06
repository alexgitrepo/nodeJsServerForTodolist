const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const todolists = require('./todolists-router')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/todo-lists', todolists)
app.listen(process.env.PORT, () => {
    console.log("server starts at port 7542")
})