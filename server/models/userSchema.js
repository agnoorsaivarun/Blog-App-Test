const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    cpassword: String
})

module.exports = mongoose.model("blogusertest", userSchema)