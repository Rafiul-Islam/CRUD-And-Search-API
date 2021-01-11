const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    city: String,
    age: String
})

module.exports = mongoose.model('users', userSchema)
