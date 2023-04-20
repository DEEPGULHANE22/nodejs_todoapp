import mongoose from "mongoose";

const task= new mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    iscompleted:{
        type: Boolean,
        default:false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

const Task = mongoose.model("Task", task)


export default Task;