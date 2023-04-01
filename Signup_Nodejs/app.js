const express = require('express')

const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const dotenv = require('dotenv')
require('dotenv').config()
const PORT = process.env.PORT || 4000

const checkAuth = require('./middleware/checkAuth')

const app = express()
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./route/signIn'))

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on('connected', () => {
    console.log('connected to mongoDb');
})
mongoose.connection.on('error', (err) => {
    console.log('error connecting ', err);
})


app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
})