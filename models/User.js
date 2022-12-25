const mongoose=require('mongoose')
const {Schema}=mongoose

const UserSchema = new Schema({
  name:
  {
    type: String,
    required: true
  },
  phn:
  {
    type: String,
    required: true
  },
  email:
  {
    type: String,
    required: true
  },
  hobby:
  {
    type: String,
    required: true
  }
},
{
  writeConcern:
  {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
});
const User=mongoose.model('user',UserSchema)
module.exports=User