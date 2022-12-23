const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization

    if (!accessToken) {
      throw Error('access token not found')
    }

    const decoded = jwt.verify(accessToken, 'secret@123')
    req.email = decoded.email
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'unauthorization access',
      error: error.message
    })
  }
}
