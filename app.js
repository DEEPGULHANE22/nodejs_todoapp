import  express from "express";
import cookieParser from "cookie-parser";
import userrouter from "./routes/user.js";
import taskrouter from "./routes/task.js";
import {config} from "dotenv";
import { errormiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app=express();

config({
    path:"./data/config.env",
})

app.use(express.json())  //middleware as we sending json data not form data as previously 
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,  
}));

app.use("/api/v1/user",userrouter); //middleware to use router and we need to use it lasstly
app.use("/api/v1/task",taskrouter); 

// mongoose.connect(`mongodb+srv://Deep:deep123@datastore.jckzzph.mongodb.net/backend?retryWrites=true&w=majority`).then(() => console.log("database connected")).catch((e) => console.log(e));

app.get("/",(req,res)=>{
    res.send("nice work")
})


//middleware of error
app.use(errormiddleware);
