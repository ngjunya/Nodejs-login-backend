const express=require('express');
const app=express();
const verify=require('./verifyToken');


app.get('/', verify ,(req,res)=>{
    res.send(req.user);
});

module.exports=app;