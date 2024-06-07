//import models

const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.dummyLink = (req, res) => {
    res.send("This is Your Dummy Page");
}


//like post
exports.likepost = async (req, res) => {
    try{
        const {post,user} = req.body
        const like = new Like({
            post,user
        })
        const savedLike = await like.save();

        //update the post collections basis on this

        const updatedPost = await Post.findByIdAndUpdate(post, {$push :{likes:savedLike._id}},{new: true}).populate("likes").exec();

        res.json({
            post: updatedPost,
        })

    }
    catch(error){
        return res.status(400).json({
            error:"Error While Liking Post",
        })
    }
}


exports.unlikepost = async (req,res) => {
    try{
        const {post,like} = req.body

        const deletedLike = await Like.findOneAndDelete({post:post , _id:like});
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull :{likes:deletedLike._id}},{new: true}).populate("likes").exec();

        res.json({
            post: updatedPost,
        })
    }
    catch(error){
        return res.status(400).json({
            error:"Error While UnLiking Post",
        })
    }
}