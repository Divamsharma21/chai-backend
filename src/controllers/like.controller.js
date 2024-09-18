import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id")

    }
    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(404, "Video not found")
        }
        const like = await Like.findOne({videoId, userId: req.user._id})
        if (like) {
            await like.remove()
            return new ApiResponse(res, 200, "Like removed")
            }
            const newLike = new Like({videoId, userId: req.user._id})
            await newLike.save()
            return new ApiResponse(res, 200, "Like added")
            
 
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id")
        }
        const comment =await comment.findById(commentId)
        if(!comment){
            throw new ApiError(404, "Comment not found")
        }
        const like=await like.findOne({commentId,userId:req.user._id})
        if(like){
            await like.remove()
        return new ApiResponse(res, 200, "Like removed")
        }
        const newlike= new Like({commentId,userId:req.user._id})
        await newlike.save()
        return new ApiResponse(res, 200, "Like added")
                

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid tweet id")
    }
    const tweet=await tweet.findById(tweetId)
    if(!tweet){
        throw new ApiError(404, "Tweet not found")
    }
    const like= await like.findOne({tweetId,userId:req.user._id})
    if(like){
        await like.remove()
        return new ApiResponse(res, 200, "Like removed")
        }
        const newlike= new Like({tweetId,userId:req.user._id})
        await newlike.save()
        return new ApiResponse(res, 200, "Like added")
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
  try {
      
      const likedVideos = await video.find({ userId: req.user._id }).populate('videoId')
          return new ApiResponse(res, 200, "Liked videos", likedVideos)
          
  } catch (error) {
    res.status(500).json({
        status: 'error',
        message: 'Failed to get liked videos',
        
    })
  }
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}