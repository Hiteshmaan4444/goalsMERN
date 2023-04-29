const mongoose = require('mongoose');

const userSchema= mongoose.Schema({
    name:{
        type: String,
        require:[true,'Please provide the name'],
        unique:true
    },
    email:{
        type: String,
        require:[true,'Please provide the email'],
        unique:true
    },
    password:{
        type: String,
        require:[true,'Please provide the email'],
    }
},
{
    timestamps:true,
});

module.exports=mongoose.model('User',userSchema);