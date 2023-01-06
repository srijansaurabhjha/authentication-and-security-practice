//jshint esversion:6
require('dotenv').config();
const express=require('express');
require('./db/conn')
const User=require('./model/user')
const ejs=require('ejs')

const port=process.env.PORT||3000;

const app=express();

app.use(express.static("public"));
app.set("view engine","ejs");

app.use(express.urlencoded({
    extended:true
}))

app.get("/",(req,res)=>{
    res.render('home');
})

app.get("/login",(req,res)=>{
    res.render('login');
})

app.get("/register",(req,res)=>{
    res.render('register');
})

//Handling register requests
app.post("/register",async(req,res)=>{
    try{
        const newUser=new User({
            email:req.body.username,
            password:req.body.password
        })
        await newUser.save((err)=>{
            if(err){
                console.log(err);
            }else{
                res.render('secrets');
            }
        });
    }catch(err){
        console.log(res);
    }
})


//Handling login requests
app.post('/login',async(req,res)=>{
    try{
        const username=req.body.username;
        const password=req.body.password;
        
        const foundUser=User.find({email:username},{password});
        if(foundUser){
            res.render('secrets');
        }else{
            console.log('user not found');
        }
    }catch(err){
        console.log(err);
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port no. ${port}`);
})