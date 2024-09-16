import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    try {
        const comment=await Comment.find({videoId})
        .skip((page-1)*limit)
        .limit(limit)
        res.status(200).json({
            status: "success",
            data: comment,
            message: "Comments fetched successfully",
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message:"Internal Server Error"
        })
    }

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId}=req.params;
    const {text}=req.body
    try{
        const video=Video.findById(videoId)
        if(!video){
            throw new ApiError(404, "Video not found")
        }
        const comment = new Comment({text, videoId})
        await comment.save()
        res.status(201).json({message: "Comment added successfully"})
         
    }catch(error){
        res.status(500).json({
            message:"Internal Server Error"
        })
    }

})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {id}=req.params
    const {text}=req.body
  try{

      const comment = await Comment.findByIdAndUpdate(id, {text}, {new: true})
      
      if(!comment){
        throw new ApiError(404, "Comment not found")
      }else{
          res.status(201).json({
              message:"Comment updated successfully"
          })

      }
  }catch(error){
    res.status(500).json({
        message:"Iinternal Server Error"
    })
  }
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
   
    const {id}=req.params
    try {
        
    const delete=await delete.findByAndDelete(id,{comment})
   if(!deleteComment){
    throw new ApiError("Comment not found", 404)

   }else{

       res.status(201).json({
           message:"Comment deleted successfully"
       })
   }


} catch (error) {
        res.status(500).json({
            message: "Internal Sever Error"

        })
    }
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
