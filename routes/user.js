import express from "express";
import User from "../models/user.js"
import getallusers, {   getmyprofile, login, logout, register} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all",getallusers)  
// router.get("/user/all",getallusers)       here we use both above and this as we mention /user in route in app.js
    
router.post("/new",register)

router.post("/login",login)

router.get("/logout",logout)
    
router.get("/me",isAuthenticated,getmyprofile)
// router.put("/userid/:idby",updateuser)
// router.delete("/userid/:idby",deleteuser)
export default router;