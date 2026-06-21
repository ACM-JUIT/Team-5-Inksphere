const usermodel = require('../Model/userShema');

const getProfile = async (req,res)=>{
    const token = req.cookies.token;
    if (!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    const user = await usermodel.findById(req.user.id).select('-password');
    if (!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
    return res.status(200).json({
        message:"Profile retrieved successfully",
        user
    })
}

const updateprofile = async (req,res)=>{
    const {username,bio,profilepic} = req.body;
    const updates = {};
    try {
        const currentuser = await usermodel.findById(req.user.id);
        if (username == currentuser.username ){
            return res.status(409).json({
                message:"Same Username"
            })
        }
        if (username){
            const isUsernameExist = await usermodel.findOne({username,_id: { $ne: req.user.id }});
            if (isUsernameExist){
                return res.status(409).json({
                    message:"Username already exists"
                })
            }
            updates.username = username;
        }
        if(profilepic){
            updates.profilepic = profilepic
        }
        if(bio){
            updates.bio= bio
        }
        await usermodel.findByIdAndUpdate(req.user.id,updates);
        return res.status(200).json({
            message:"Profile Updated sucessfully"
        })
    } catch(error){
        return res.status(409).json({
            message:error.message
        })
    }
}



const getprofilepicture = async (req,res)=>{
    try {
        const user = await usermodel.findById(req.user.id).select('profilepic');
            return res.status(200).json({
                message:"Profile pic fetched sucessfully",
                profilepic: user.profilepic
        })
    } catch (error){
        return res.status(409).json({
            message:error.message
        })
    }
}

const profilebyid = async (req,res)=>{
    try{
        user = await usermodel.findById(req.params.id).select('-password')
        if (!user){
            return res.status(409).json({
                message:'User not found'
            })
        }
        return res.status(200).json({
            message:'Profile Fetched Sucessfully',
            user
        })
    } catch (error){
        return res.status(404).json({
            message:error.message
        })
    }
}



module.exports = {
    getProfile,updateprofile,getprofilepicture,profilebyid
}