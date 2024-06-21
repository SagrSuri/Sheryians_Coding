const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/FileSTORE`)

const userSchema = mongoose.Schema({
    name: "string",
    email: "string",
    username: "string",
    contact: "number"
})

module.exports = mongoose.model("user", userSchema);