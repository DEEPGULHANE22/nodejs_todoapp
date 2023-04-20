import express from "express";
import { deletetask, getmytask, newtask, updatetask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router= express.Router();

router.post("/new",isAuthenticated, newtask);

router.get("/mytask",isAuthenticated, getmytask);

router.route("/:id").put(isAuthenticated, updatetask).delete(isAuthenticated, deletetask);  //  "/:id" we have done it this way to dynamically change url
  //important!!  we have to keep dynamically link in last cause it can consider /new or /mytask as it context

export default router;