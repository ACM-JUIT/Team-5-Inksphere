const blogmodel = require('../Model/BlogSchema')
const commentmodel = require('../Model/commentSchema')
const usermodel = require('../Model/userShema')

const createblog = async (req,res)=> {
    try{
        const {title,content,coverImage,category} = req.body;
        const blog = await blogmodel.create({
            title,content,coverImage,category,author:req.user.id
        })
        return res.status(201).json({
            message:"blog created sucessfully"
        })
    } catch (error){
        return res.status(409).json({
            message:error.message
        })
    }
}

const getblog = async (req,res)=>{
    try{
        const blogs = await blogmodel.find().populate('author','username profilepic')
        return res.status(201).json({
            message:'Blogs are fetched sucessfully',
            blogs
        })
    } catch (error){
        return res.status(409).json({
            message:error.message
        })
    }
}

const getsingleblog = async (req,res)=> {
    try{
        const blog = await blogmodel.findById(req.params.id).populate('author','username profilepic')
        if (!blog){
            return res.status(409).json({
                message:'Not available'
            })
        }
        return res.status(201).json({
            message:'Blog fetch sucessfully',
            blog
        }) 
        } catch(error) {
            return res.status(400).json({
                message:error.message
            })
            
        }
}

const getblogsonprofile = async (req,res)=>{
    const blogs = await blogmodel.find({author: req.params.id}).populate('author','username profilepic')
    if (!blogs){
        return res.status(201).json({
            message:"No blogs"
        })
        
    }
    return res.status(201).json({
            message:'Blogs of profile fetched sucessfully',
            count: blogs.length,
            blogs
    })
}


const deleteblog = async (req,res)=>{
    try {
        const blog = await blogmodel.findById(req.params.id)
        if(!blog){
            return res.status(409).json({
                message:'Not available'
            })
        }
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to delete this blog"
            });
        }
        await blog.deleteOne();
        return res.status(201).json({
            message:'Blog deleted sucessfully',
        })
    } catch(error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

const updateblog = async (req,res)=>{
    const {title,content,coverImage,category} = req.body
    const update = {} 
    try{
        const blog = await blogmodel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to edit this blog"
            });
        }
        if (title){
            update.title = title
        }
        if (content){
            update.content = content
        }
        if (coverImage){
            update.coverImage = coverImage
        }
        if (category){
            update.category = category
        }
        await blogmodel.findByIdAndUpdate(req.params.id,update)
        return res.status(200).json({
            message:'Updated sucessfully'
        })
    } catch (error){
        return res.status(500).json({
            message:error.message
        })
    }
}

const getblogbycategory = async (req,res)=>{
    try {
        const blogs = await blogmodel.find({category: req.params.category})
        if(blogs.length==0){
            return res.status(404).json({
                message:'No blogs in this category'
            })
        }
        return res.status(200).json({
            message:'Blogs are fetched by category',
            blogs
        })
    } catch (error){
        return res.status(500).json({
            message:error.message
        })
    }
}

const like = async (req,res)=> {
    try {
        const blog = await blogmodel.findById(req.params.blogId)
        if (!blog){
            return res.status(404).json({
                message:'Blog not found'
            })
        }
        const alreadyliked =  blog.likes.some( id => id.equals(req.user.id))
        if (alreadyliked){
            blog.likes.pull(req.user.id)
            await blog.save()
            return res.status(201).json({
                message:'blog disliked'
            })
        }
        blog.likes.push(req.user.id)

        await blog.save()
        return res.status(201).json({
            message:'blog liked'
        })
    } catch (error){
        return res.status(500).json({
            message:error.message
        })
    }
}

const getbloglikes = async (req,res)=>{
    try {
        const blog = await blogmodel.findById(req.params.blogId);
        return res.status(201).json({
            message:'Likes fetched sucessfully',
            likes: blog.likes.length
        })
    } catch (error){
        return res.status(500).json({
            message:error.message
        })
    }
}
const createcomment = async (req,res)=>{
    try {
        const {content} = req.body
        const blog = await blogmodel.findById(req.params.blogId)
        if (!blog){
            return res.status(404).json({
                message:'Blog not found'
            })
        }
        const comment = await commentmodel.create({
            username : req.user.id,
            blog : blog._id,
            content
        })
        blog.comments.push(comment._id)
        blog.save()
        return res.status(201).json({
            message:'Comment created sucessfully',
            comment
        })
    } catch (error){
        return res.status(500).json({
            message:error.message
        })
    }
}

const getcomment = async (req,res)=>{
    try {
        const comments = await commentmodel.find({ blog: req.params.blogId }).populate('username', 'username profilepic');
        
        return res.status(200).json({
            message:'Comment found sucessfully',
            comments

        })
    } catch (error){
        return res.status(500).json({
            message:error.message
        })
    }
}

const dltcomment = async (req,res)=>{
    try {
        const comment = await commentmodel.findById(req.params.commentId) .populate('blog', 'author')
        if (!comment){
            return res.status(404).json({
                message:'Blog not found'
            })
        }
        if (comment.username.toString() !== req.user.id && comment.blog.author.toString() !== req.user.id){
            return res.status(403).json({
                message:'UnAuthorized'
            })
        }
        
        await comment.deleteOne();
        return res.status(200).json({
            message:'blog delted sucessfuly'
        })
    } catch (error){
        return res.status(400).json({
            message:error.message
        })
    }
}

const bookmark = async (req,res)=>{
    try {
        const user = await usermodel.findById(req.user.id)
        const bookmark = user.bookmarks.some( id => id.equals(req.params.blogId))
        if (bookmark){
            user.bookmarks.pull(req.params.blogId)
            await user.save()
            return res.status(200).json({
                message:'Bookmark removed',
            })
        }
        user.bookmarks.push(req.params.blogId)
        await user.save()
        return res.status(200).json({
            message:'Bookmark Added',    
        })
    } catch(error){
        return res.status(409).json({
            message:error.message
        })
    }
}

const getbookmarks = async (req,res)=>{
    try {
        const user = await usermodel.findById(req.user.id).populate('bookmarks')
        return res.status(200).json({
            message:'Bookmark fetched', 
            bookmarks : user.bookmarks   
        })
    } catch(error){
        return res.status(409).json({
            message:error.message
        })
    }
}

const searchblog = async (req,res)=>{
    try {
        const {query} = req.query
        if (!query){
            return res.status(400).json({
                message:"Query required"
            })
        }
        const searchtitle = await blogmodel.find({
            title:{$regex:query,
                $options:'i'
            }
        })
        const searchAuthor = await usermodel.find({
            username:{$regex:query,
                $options:'i'
            }
        })
        const searchcontent = await blogmodel.find({
            content:{$regex:query,
                $options:'i'
            }
        })
        const [title,Author,content]=  await Promise.all([
            searchtitle,searchAuthor,searchcontent
        ])

        const result = {
            title,Author,content
        }
        return res.status(200).json({
            message:"Searched Results",
            result
        })
    } catch(error){
        return res.status(409).json({
            message:error.message
        })
    }
}

const latestblog = async (req,res)=>{
    try {
        const blogs = await blogmodel.find().sort({createdAt:-1})
        return res.status(200).json({
            message:'latest blogs are fetched sucessfully',
            blogs
        })
    } catch (error){
        return res.status(400).json({
            message:error.message
        })
    }
}
module.exports = {createblog,getblog,deleteblog,getblogsonprofile,getsingleblog, updateblog,getblogbycategory,like,createcomment,getbloglikes,getcomment,dltcomment,bookmark,getbookmarks,searchblog,latestblog}