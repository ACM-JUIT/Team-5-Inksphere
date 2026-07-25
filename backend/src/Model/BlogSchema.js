const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    coverImage:{
        type:String,
        default:''
    },
    category:{
        type:String,
        enum: ['General','Tech', 'Travel', 'Lifestyle', 'Education'],
        default:'General'
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comments'
    }],
    views:{
        type:Number,
        default:0
    }
},{
    timestamps: true,
  });

const Blog = mongoose.model('Blog',blogSchema);

module.exports =Blog;