const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    profilepic:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    bio:{
        type:String,
        default:''
    },
    bookmarks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }],
})

const User= mongoose.model('User',userSchema);

module.exports = User;
