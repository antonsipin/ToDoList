require('dotenv').config()
const mongoose = require('mongoose')

const dbConnectionURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7kltq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

function dbConnect() {
  mongoose.connect(dbConnectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) return console.log(err)
    return console.log('Success connected to toDoApp database')
  })
}

module.exports = dbConnect
