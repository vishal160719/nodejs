const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true

  }

})
const Users = mongoose.model('user', schema)
module.exports = Users
