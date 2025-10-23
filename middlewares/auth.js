// auth,  isStudent, isAdmin


const jwt = require("jsonwebtoken")
require("dotenv").config();

exports.auth = (req,res,next)=>{
    try{

        //extract jwt token
        //PENGING : OTHER WAYS TO EXTRACT JWT TOKEN

        const token = req.body.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Missing",
            })
        }

        
    }catch(err){
        
    }
}