const { Router } = require('express')
const Users = require('../models/users')
const authRouter = Router()
const users = require('../models/users')
const utils = require('../utilts')
const verifyAuth = require("../middlewares/verifyAuth")
const sendMail = require('../config/mailer')

authRouter.post('/login', (req, res) => {
  return Promise.resolve()
    .then(() => {
      if (!(req.body.email && req.body.password)) {
        throw Error('Email and Password not found')
      }
      return users.findOne({ email: req.body.email })
    })
    .then((data) => {
      if (!data) {
        throw Error('User not found')
      }
      return utils.compare(req.body.password, data.password)
    })
    .then((match) => {
      if (!match) {
        throw Error('Invalid Password')
      }

      return res.status(200).json({
        message: 'Login Successful',
        access_token: utils.createAccessToken(req.body.email)
      })
    })
    .catch(error => {
      return res.status(422).json({
        message: 'Login Failed',
        error: error.message
      })
    })
})

authRouter.post('/register', (req, res) => {
  let resData
  return Promise.resolve()
    .then(() => {
      if (!(req.body.username && req.body.email && req.body.password)) {
        throw Error('Username, Email and Password not found')
      }
      return utils.encrypt(req.body.password)
    })
    .then(hash => {
      req.body.password = hash
      return users.create(req.body)
    })
    .then((data) => {
      resdata = data.toJSON()
      delete resdata.password

      resdata.access_token = utils.createAccessToken(req.body.email)

      return sendMail(resdata.email, resdata.username, resdata.otp)



    })
    .then(() =>{
      delete resData.otp
      return res.status(200).json({
        message:"register successfully",
        data:resData
      })
    })
    .catch(error => {
      return res.status(422).json({
        message: 'Registration Failed',
        error: error.message
      })
    })
})

authRouter.post('/verifye',verifyAuth, (req, res) => {
  return Users.findOne({email:req.email}, { otp: 1})
  .then(data =>{
    if(data.otp !==req.body.otp){
      throw Error("INvalid otp")
    }

    return Users.findOneAndUpdate({ email: req.email}, { $set: { verified: true}})
  })
  .then(() =>{
    return res.status(200).json({
      message:"email verifired successfully",
    })
  })
  .catch(error =>{
    return res.status(422).json({
      message:"verification failed",
      error:error.message
    })
  })



  return res.status(200).json({
    message: 'Email Verified Successfully'
  })
})

module.exports = authRouter
