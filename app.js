const express=require("express");
var cors=require('cors')
const app=express();
app.use(express.json());

app.use(cors());
// 
const dotenv=require('dotenv');
dotenv.config();

//Database connection
const connection=require('./database/connection');

// const {registerValidation,loginValidation}=require('./validation');
const authRoute= require('./routes/auth');
const postRoute= require('./routes/post');
//Create user
// async function createUser(username,pass){
//    const user1=await user.create({username:username,password:pass})
//    return user1;
//    }

// app.post('/register',async (req,res)=>{

//    //Validate 
//    const {error}=registerValidation(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//    let output=await createUser(req.body.username,req.body.password);
//    //res.status(200).json({ message: "success" });
//    res.status(200).json(output);
// })
app.use('/api/user',authRoute);
app.use('/api/post',postRoute);

 

app.listen(3000);