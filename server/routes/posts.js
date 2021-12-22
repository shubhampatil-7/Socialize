import express from 'express';
// import { Users } from '../../react-social/src/dummyData.js';
import Post from '../models/Post.js'
import User from '../models/user.js';
const router = express.Router();

//create a post

router.post('/', async(req, res) =>{
    const newPost = new Post(req.body)

    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})
//update a post

router.put('/:id', async(req,res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body})
            res.status(200).json("Post has been updated")
        } else{
            res.status(403).json("You can only update your posts")
        }
    } catch(err){
        res.status(500).json(err)
    }
})
//delete a post
router.delete('/:id', async(req,res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json("Post has been deleted")
        } else{
            res.status(403).json("You can only delete your posts")
        }
    } catch(err){
        res.status(500).json(err)
    }
})
//like/dislike a post

router.put('/:id/like', async(req, res) =>{
    try {
        const post = await Post.findById(req.params.id)

        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes: req.body.userId}})
            res.status(200).json("post has been liked")
        } else{
            await post.updateOne({$pull:{likes: req.body.userId}})
            res.status(200).json("post has been disliked")
        }

    } catch(err) {
        res.status(500).json(err);
    }
})
//get a post

router.get("/:id", async(req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error)
    }
})

//get timeline posts
router.get('/timeline/:userId', async(req, res) =>{
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.following.map(friendId =>{
                return Post.find({userId: friendId})
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch(err){
        res.status(500).json(err);
    }
})


//get user's all posts

router.get("/profile/:username", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default router;