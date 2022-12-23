const { Router } = require('express')
const authRouter = Router()
const users = require('../models/users')
const utils = require('../utilts')

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
      data = data.toJSON()
      delete data.password

      data.access_token = utils.createAccessToken(req.body.email)

      return res.status(200).json({
        message: 'Registration Successful',
        data: data
      })
    })
    .catch(error => {
      return res.status(422).json({
        message: 'Registration Failed',
        error: error.message
      })
    })
})

authRouter.post('/verify_email', (req, res) => {
  return res.status(200).json({
    message: 'Email Verified Successfully'
  })
})

module.exports = authRouter
