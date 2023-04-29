const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async(req,res)=>{
    const{name,email,password} = req.body;

    if(!name||!email||!password){
        res.status(400);
        throw new Error('Please provide the credentials');
    }

    const Salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password,Salt);
    
    let user = await User.findOne({email});

    if(user){
        res.status(400);
        throw new Error('User Already Exist');
    }

    user = await User.create({
        name,
        email,
        password:pass
    });

    res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        token:generateToken(user.id)
    });
})

const loginUser= asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    if(!email||!password){
        res.status(400);
        throw new Error("Please provide the credentials");
    }

    const user = await User.findOne({email});

    if(!user || !(await bcrypt.compare(password,user.password))){
        res.status(400);
        throw new Error('Wrong Credentials');
    }

    res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        token:generateToken(user.id)
    });

})

const getMe= asyncHandler(async(req,res)=>{
    res.json('get User');
})

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports={
    registerUser,
    loginUser,
    getMe
}