const usermodel = require('../Model/userShema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const register = async (req,res)=>{
    
    try{
        const {username,email,password} = req.body;
    const hashpassword = await bcrypt.hash(password,10)
    const isUsernameExist = await usermodel.findOne({username});
    if (isUsernameExist){
        return res.status(409).json({
            message:"Username already exists"
        })
    }
    const isEmailExist = await usermodel.findOne({email});
    if (isEmailExist){
        return res.status(409).json({
            message:"Email already exists"
        })
    }

    const user = await usermodel.create({
        username,email,password:hashpassword
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET, {expiresIn:"1d"})

    res.cookie('token',token,{
        httpOnly : true,
        secure:true,
        sameSite: "strict"
    });
    
    res.status(201).json({
        success:true,
        message:"User registered successfully"
    })}catch(error){
   return res.status(500).json({
      message:error.message
   });
}
}

const login = async (req,res)=>{
    const {username,password} = req.body;
    const user= await usermodel.findOne({username});
    if (!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
    const ismatched = await bcrypt.compare(password,user.password) 
    if ( !ismatched){
        return res.status(401).json({
            message:"Invalid password"
        })
    }
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET, {expiresIn:"1d"})
    res.cookie('token',token,{
        httpOnly:true,
        secure:true,
        sameSite:true
    });
    return res.status(200).json({
        message:"Login successful"
    })
}
const logout = async (req,res)=>{
    res.clearCookie('token');
    return res.status(200).json({
        message:"Logout successful"
    })
}


module.exports = {
    register,login,logout
}