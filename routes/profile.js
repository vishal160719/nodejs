const {Router} = require('express')
const verifyAuth = require('../middlewares/verifyAuth')
const users = require('../models/users')

const profileRouter = Router()

profileRouter.get('/', verifyAuth, (req, res) => {
  return Promise.resolve()
    .then(() => users.findOne({email: req.email}))
    .then((data) => {
      if (!data) {
        throw Error('user not found')
      }

      data = data.toJSON()
      delete data.password

      return res.status(200).json({
        'message': 'profile fetch successful',
        data
      })
        .catch(error => {
          return res.status(422).json({
            message: 'profie failed',
            error: error.message
          })
        })
    })
})

module.exports = profileRouter
