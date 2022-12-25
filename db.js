const mongoose=require('mongoose')
const mongoURI= process.env.MONGODB_URI||"mongodb://127.0.0.1:27017/users"
mongoose.set("strictQuery", false);
const connectToMongo= async()=>
{
    await mongoose.connect(mongoURI)
    console.log("Connected successfully")
}
module.exports=connectToMongo