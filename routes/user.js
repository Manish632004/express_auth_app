const express = require("express");

const router = express.Router();


//import 
const {signup} = require("../Controllers/Auth")
const {login} = require("../Controllers/Auth")
const{isStudent,isVisitor,isAdmin} = require("../middlewares/auth")


//route
router.post("/signup",signup)
router.post("/login",login)

// testing protected route
router.get("/test",auth ,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route fro tests"
    })
})

//protected routes
router.get("/student", auth, isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route for students",

        });
        
    });
router.get("/addmin", auth, isAdmin) 
// router.get("/isVisitor",isVisitor)

module.exports = router;