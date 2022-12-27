const express=require('express')
const router=express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const nodemailer=require('nodemailer')

router.get('/fetchall', async(req,res)=>{
  try
  {
    const data=await User.find()
    res.send(data)
  }
  catch (error) {res.status(500).send({error:error})}
})

router.post('/adduser',
  [
    body('email','Enter a valid email').isEmail()
  ],
  async(req,res)=>
  {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
      return res.status(400).json({ errors: errors.array() });
    }

    try
    {
      let user = await User.findOne({email: req.body.email})
      if(user)
      {
        return res.status(400).json({error: 'This email is already registered!'})
      }

      user = await User.create
      ({
        name: req.body.name,
        phn: req.body.phn,
        email: req.body.email,
        hobby: req.body.hobby
      })
      res.send(user)
    }
    catch (error) {res.status(500).send({error: error})}
  }
)

router.post('/send',
  (req,res)=>res.send({error: "Sending email option is currently disabled to prevent misuse."})
)

router.put('/update/:id',
  async(req,res)=>
  {
    try
    {
      let user=await User.findById(req.params.id)
      if(!user) return res.status(404).send({error: "Not Found"})
      const newuser={
        name: req.body.name,
        phn: req.body.phn,
        hobby: req.body.hobby
      }
      user=await User.findByIdAndUpdate(req.params.id,{$set: newuser},{new:true})
      res.send({success: "Updated!"})
    }
    catch (error) {res.status(500).send({error:error})}
  }
)

router.delete('/deleteuser/:id',
  async(req,res)=>
  {
    try
    {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).send({success: "Deleted"})
    }
    catch (error) {res.status(500).send({error:error})}
  }
)
module.exports=router