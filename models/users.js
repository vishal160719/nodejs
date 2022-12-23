const mongoose = require('mongoose')
const { generateOTP } = require('../utilts')
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

  },
  otp: {
    type: String
  },
  verified:{
    type:Boolean,
    default:false
  }

})

schema.pre("save",function(){
  this.otp = generateOTP()
})
const Users = mongoose.model('user', schema)
module.exports = Users
