const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/mern")

const User = mongoose.model("User",{
 name:String,
 email:String,
 password:String
})

const auth=(req,res,next)=>{
 const t=req.headers.authorization
 if(!t) return res.status(401).send("No token")
 try{
  req.user=jwt.verify(t,"key")
  next()
 }catch{res.status(401).send("Invalid")}
}

app.post("/register",async(req,res)=>{
 const {name,email,password}=req.body
 const hash=await bcrypt.hash(password,10)
 const user=new User({name,email,password:hash})
 await user.save()
 res.send("Registered")
})

app.post("/login",async(req,res)=>{
 const {email,password}=req.body
 const user=await User.findOne({email})
 if(!user) return res.send("No user")
 const ok=await bcrypt.compare(password,user.password)
 if(!ok) return res.send("Wrong pass")
 const token=jwt.sign({id:user._id},"key")
 res.json({token})
})

app.get("/dashboard",auth,(req,res)=>{
 res.send("Dashboard")
})

app.listen(5000)