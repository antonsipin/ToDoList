const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  id: String,
  name: String,
  status: Boolean,
  edit: Boolean,
  isLoaded: Boolean,
  message: String
})

module.exports = mongoose.model('Task', taskSchema)
