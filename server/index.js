import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const User = mongoose.model("User", new mongoose.Schema({
  email:String,password:String,usage:{type:Number,default:0}
}));

function auth(req,res,next){
  try{
    const t=req.headers.authorization;
    req.user=jwt.verify(t,"secret");
    next();
  }catch{res.status(401).send("Unauthorized")}
}

app.post("/signup", async(req,res)=>{
  const u=await User.create(req.body);
  const t=jwt.sign({id:u._id},"secret");
  res.json({token:t});
});

app.post("/optimize", auth, async(req,res)=>{
  res.json({improved:"Optimized: "+req.body.prompt, score:80});
});

app.listen(5000,()=>console.log("API running"));
