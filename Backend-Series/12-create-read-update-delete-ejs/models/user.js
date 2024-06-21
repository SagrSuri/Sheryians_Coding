const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Mongo12-Video')

const userSchema = mongoose.Schema({
    name: "String",
    email: "String",
    image: "String"
})

 module.exports = mongoose.model('user' , userSchema)