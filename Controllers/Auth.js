const bcrypt = require("bcrypt");

const User = require("../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config()


// signup route handler

exports.signup = async (req,res)=>{
    try{
        //get data 
        const {name,email,password,role} = req.body;
        //check if user already exist

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist"})
        }

        // secure password

        let hashedPassword ;
        try{
            hashedPassword = await bcrypt.hash(password,10)
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in hashing password"
            })
        }

        // create entry for user 

        let user = await User.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success:true,
            message:"User created successfully",
            
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User cannot be registered please try again"
        })
    }
}

// login route handler

exports.login = async (req,res)=>{
    try{
        //data fetch
        const {email,password} = req.body;

        // validation on email and password
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"Please fill all fields carefully"
            })
        }

        // check user exist or not 
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User does not exist"
            });
        }

            const payload ={
                email:user.email,
                id:user._id,
                role:user.role,
            }
            //verify password and generate a JWT token
            if(await bcrypt.compare(password,user.password)){
                //password match
                let token = jwt.sign(payload,
                    process.env.JWT_SECRET,{
                        expiresIn:"2h",
                    }
                )
                user = user.toObject();
                user.token = token;
                user.password =undefined;
                const options ={
                    expires: new Date(Date.now()+3*24*60*60*1000),// for 3 days
                    httpOnly:true, // it will not allow to access cookie from client side
                    secure:true


                }

                res.cookie("babbarCookie",token, options).status(200).json({
                    success:true,
                    message:"Login successful",
                    user,
                    token
                })


            
            }
            else{
                // password does not match
                return res.status(403).json({
                    success:false,
                    message:"Password does not match"
                })
            }


        }
    
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"User cannot be logged in please try again"
        })
    }
}