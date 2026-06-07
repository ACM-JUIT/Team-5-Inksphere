const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'   
    },
    content:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Comments = mongoose.model('Comment',commentSchema);


module.exports = Comments;
