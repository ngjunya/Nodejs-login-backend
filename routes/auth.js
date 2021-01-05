const express=require('express');
const app=express();
const {registerValidation,loginValidation}=require('../validation');
app.use(express.json());

const jwt=require('jsonwebtoken');
const user = require('../models/user');

async function createUser(username,pass){
    const user1=await user.create({username:username,password:pass})
    return user1;
    }
 
 app.post('/register',async (req,res)=>{
    //Validate credential
    const {error}=registerValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);
   
    //Checking if the user exists
    const usernameExist=await user.findOne({where:{username:req.body.username}});
    if(usernameExist) return res.status(400).send('Username already exists');
     
    let output=await createUser(req.body.username,req.body.password);
    //res.status(200).json({ message: "success" });
    res.status(200).json(output);
  
 })


 app.post('/login', async (req,res)=>{
     //validate input
    const {error}=loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if the username exist
     const usernameExist=await user.findOne({username:req.body.username});
    if(usernameExist!=true) return res.status(400).send('Username not found');

    //check if the password is correct
    const validPass=await req.body.password.localeCompare(usernameExist.password.toString());
    
    if(validPass!=0) return res.status(400).json({message:'Password is wrong'});

    //Create and assign a token
    const token=jwt.sign({_id:usernameExist.id},process.env.TOKEN_SECRET);

     res.header('auth-token',token);
    res.status(200).json({
       user:usernameExist,
      message: "success",
      token: token
    });
  
  
 })

 module.exports=app;