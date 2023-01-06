const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/user-secret",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`Successfully connected to database`);
}).catch((err)=>{
    console.log(err);
})