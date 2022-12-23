const mongoose = require('mongoose')
// const MONGO_URI = process.env.MONGO_URI
// console.log(process.env.MONGO_URI)

module.exports = () => {
  mongoose.connect('mongodb+srv://vishal2:vishal1607@cluster0.yobbp7v.mongodb.net/?retryWrites=true&w=majority', (error) => {
    if (error) {
      console.log('Mongo Error: ', error)
      throw error
    }
    console.log('Database Connected Successfully')
  })
}
