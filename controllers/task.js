import errorhandler from "../middlewares/error.js";
import Task from "../models/task.js";



export const newtask=async(req,res,next)=>{
    try{
        const{title,description}=req.body;
        await Task.create({
            title,
            description,
            user:req.user});
     
        res.status(201).json({
            success:true,
            user:req.user,
            })    
    
    }
    catch(error){
        next(error)
    }
}



export const getmytask=async(req,res,next)=>{
    try{
        const userid = req.user._id;
        const tasks=await Task.find({user:userid});
    
        res.status(200).json({
            success:true,
            tasks,
        })
    }
    catch(error){
        next(error)
    }
    
}

export const updatetask=async(req,res,next)=>{
    try{
        const task =await Task.findById(req.params.id)

        // if(!task) return res.status(404).json({
        //     success:false,
        //     message:"task not found",
        // })
        if(!task) return next(new errorhandler("Task not found", 404));
    
        task.iscompleted= !task.iscompleted    // to change behaviiour of checkbox
    
        await task.save();
    
    
        res.status(200).json({
            success:true,
            message:"Task updated"
        })
    }
    catch(error){
        next(error)
    }
   
}



export const deletetask=async(req,res,next)=>{
    try{
        const task =await Task.findById(req.params.id)

        if(!task) return next(new errorhandler("Task not found", 404));
    
    
        await task.deleteOne();
    
    
        res.status(200).json({
            success:true,
        })
    }
    catch(error){
        next(error)
    }
  }