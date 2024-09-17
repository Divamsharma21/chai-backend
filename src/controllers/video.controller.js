import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    const videos = await Video.find({}).populate("user")
    .sort({ [sortBy]: sortType })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec()
    if(!video){
        return new ApiError(404, "Videos not found")
        
    }
   res.json(video)
     
    
            
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
    if(!tittle || !description){
        return new ApiError(400, "Please provide title and description")
    }
    const video = new Video({ title, description, user: req.user._id })
    try{
    const uploadedVideo = await uploadOnCloudinary(video.video)
    video.video = uploadedVideo.secure_url
    }catch(error){
        return new ApiError(500, "Error uploading video")
    }
 
 const savevideo= await video.save()
 if(!savevideo){
    return new ApiError(400, "Error saving video")
 }
    res.status(200).json({
        message: "Video published successfully",
    })

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    try {
        
        const video=await Video.findById(videoId)
        if(!video){
            return new ApiError(404, "Video not found")
    
        }
         
        res.json(video)
    } catch (error) {
        returnres.status(500).json({error:'Error fetching video'})
    }
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail
    const { title, description, thumbnail } = req.body;
    
    try {
        
        const video = await Video.findByIdAndUpdate(videoId,title,description,thumbnail, req.body, { new: true })
        if(!video){
            return new ApiError(404, "Video not found")
            }
            res.status(200).json({
                message: "Video updated successfully",
    
            })

        } catch (error) {
            return res.status(500).json({error:'Error updating video'})
        }


})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
   try {
     
     const video=await Video.findByIdAndDelete(videoId)
     if(!video){
         return new ApiError(404, "Video not found")
        }
        res.status(200).json({
            message: "Video deleted successfully",
            })
    } catch (error) {
        res.status(500).json({
            message: "Error deleting video",
            
        })
    }
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    try {
        const video = await Video.findById(videoId);
        if (!video) {
          throw new ApiError(404, "Video not found");
        }
    
        video.published = !video.published;
        await video.save();
    
        res.status(200).json({ message: "Video publish status toggled successfully" });
      } catch (error) {  
        res.status(500).json({ message: "Error toggling video publish status" });
        }
        
       
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
