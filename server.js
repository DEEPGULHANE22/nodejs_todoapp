import mongoose from "mongoose";
import { app } from "./app.js";

mongoose.connect(process.env.MONGOURL).then(() => console.log("database connected")).catch((e) => console.log(e));

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})