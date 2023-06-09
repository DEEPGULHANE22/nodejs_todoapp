import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


const getallusers = async (req, res) => {

}

export default getallusers;



export const login = async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password")  //we have add this .select... because we have mentioned in schema of password "select:false"

        if (!user) return res.status(404).json({
            success: false,
            message: "Invalid user",
        });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(404).json({
            success: false,
            message: "Invalid password",
        });

        const tokenval = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        res.status(201).cookie("token", tokenval, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
            secure: process.env.NODE_ENV==="Development"?false:true,
        }).json({
            success: true,
            message: `Welcome back ${user.name}`
        })

    }
    catch (error) {
        next(error)
    }

}


export const logout = async (req, res,next) => {
    try {
        res.status(200).cookie("token", "", { 
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
            secure: process.env.NODE_ENV==="Development"?false:true,
        })
            .json({
                success: true,
                user: req.user,
                message:"Logout Successfully"
            })
    }
    catch (error) {
        next(error)
    }

}



export const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })

        if (user) return res.status(404).json({
            success: false,
            message: "User already exists",
        });

        const hashedpassword = await bcrypt.hash(req.body.password, 10);

        user = await User.create({ name: req.body.name, email: req.body.email, password: hashedpassword })

        const tokenval = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        res.status(201).cookie("token", tokenval, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
            secure: process.env.NODE_ENV==="Development"?false:true,
   
        }).json({
            success: true,
            message: "Registered Successfully"
        })
    }
    catch (error) {
        next(error)
    }
}



export const getmyprofile = async (req, res, next) => {
    try {

        res.status(200).json({
            success: true,
            user: req.user,
        })

    }
    catch (error) {
        next(error)
    }

}




// export const getbyid = async (req, res) => {
//     // const idby=req.query.idby;
//     const user = await User.findById(req.params.idby);
//     console.log(req.params)
//     res.json({
//         success: true,
//         user: user,
//     })
// }




// export const updateuser = async(req,res)=>{
//     const user=await User.findById(req.params.idby);
//     console.log(req.params)
//     res.json({
//         success:true,
//         message:updated,
//     })
// }

// export const deleteuser = async(req,res)=>{
//     const user=await User.findById(req.params.idby);

// await user.remove(); //to delete user

//     res.json({
//         success:true,
//         message:deleted
//     })
// }