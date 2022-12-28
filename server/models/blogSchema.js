const mongoose=require("mongoose")
mongoose.set('strictQuery', false)

const blogSchema=new mongoose.Schema({
  title:String,
  pickImage:String,
  paragraph:String
})

module.exports=mongoose.model("blogtest",blogSchema)