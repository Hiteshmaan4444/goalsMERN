const asyncHandler = require('express-async-handler');

const Goal = require('../model/goalModel');
const userModel = require('../model/userModel');

const getGoals = asyncHandler(async (req,res)=>{
    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})

const postGoals = asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400);
        throw new Error('please send the missing text');
    }else{

        const goals = await Goal.create({
            text:req.body.text,
            user:req.user,
        })

        res.status(200).json(goals)
    }
})

const updateGoals= asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)

        throw new Error('Goal Not Found');
    }
 
    const user = await userModel.findById(req.user.id);

    if(!user){
        res.status(400);
        throw new Error('User not found');
    }
    if(goal.user.toString()!=user._id){
        res.status(401)
        throw new Error('User is not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
    });

    res.status(200).json(updatedGoal)
})

const deleteGoals= asyncHandler(async (req,res)=>{

    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400);
        throw new Error('Goal Not Found');
    }

    const user = await userModel.findById(req.user.id);

    if(!user){
        res.status(400);
        throw new Error('User not found');
    }

    if(goal.user.toString()!=user.id){
        res.status(401)
        throw new Error('User is not authorized');
    }

    await Goal.findByIdAndDelete(req.params.id);

    res.status(200).json(goals)
})
module.exports={
    getGoals,postGoals,updateGoals,deleteGoals
}