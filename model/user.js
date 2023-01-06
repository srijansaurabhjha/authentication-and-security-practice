const mongoose=require('mongoose');
const validator=require('validator');
const encrypt=require('mongoose-encryption')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        },
        unique:[true,"Email is already registered"]
    },
    password:{
        type:String,
    }
})

//applying encryption in mongoose schema
// console.log(process.env.SECRET)
userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedfields:['password']})


const User=new mongoose.model("User",userSchema);

module.exports=User;