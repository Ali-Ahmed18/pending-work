import postModel from "../Model/postSchema.js";
import { v2 as cloudinary, v2 } from 'cloudinary';
import fs from "fs"
import mongoose from "mongoose";

const getAllPosts = async (req, res) => {
  try {
    const allpost = await postModel.find({isActive: true});
    res.status(200).json({
      status: true,
      message: "get all post successfully",
      data: allpost,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
      data: null,
    });
  }
};



const createpost = async (req, res) => {
  try {
    const {
      price,
      title,
      location,
      productImgUrl,
      description,
      brand,
      condition,
      phoneNo,
      whatSell,
      userName,
      userId
    } = req.body;

    if (
      !price ||
      !title ||
      !location ||
      !productImgUrl.length||
      !description ||
      !brand ||
      !condition ||
      !userId ||
      !phoneNo ||
      !whatSell ||
      !userName ||
      !userId
    ) {
      res.status(400).json({
        status: false,
        message: "required fileds are missing",
        data: null,
      });
      return;
    }
    const objToSend = {
      price,
      title,
      location,
      product_img_url: productImgUrl,
      description,
      brand,
      condition,
      user_id : userId,
      phone_no : phoneNo,
      what_sell : whatSell,
      user_name : userName
    };

    const postSave = await postModel.create(objToSend);

    res.status(201).json({
        status : true,
        message : "post successfully create",
        data : postSave
    })

  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
      data: null,
    });
  }
};



const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
        message: "Invalid post ID",
        data: null
      });
    }

    const data = await postModel.findById(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Post not found",
        data: null
      });
    }

    res.status(200).json({
      status: true,
      message: "Get single post",
      data
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
      data: null
    });
  }
};
const deletePost = async(req,res)=>{
  try{
      const {id} = req.params
      const deletePost = await postModel.findByIdAndDelete(id)
      res.status(200).json({
        message: "user delete successfully",
        status: true,
      });
    }catch(err){
      res.status(500).json({
        status: false,
        message : err.message,
      })
}
}

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    console.log(body)
    if (!body) {
      return res.status(400).json({
        message: "Missing data, update failed",
        status: false,
        data: null,
      });
    }

    const userRecords = await postModel.findByIdAndUpdate(id, body, { new: true });

    if (!userRecords) {
      return res.status(404).json({
        message: "Post not found",
        status: false,
        data: null,
      });
    }

    res.status(200).json({
      message: "Post updated successfully",
      status: true,
      data: userRecords,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

const uploadImg =  (req, res) => {
  const path = req.files[0].path;
  if(!path){
    res.status(400).json({
      status : false,
      message: "file are empty!",
      data: null
    })
    return
  }
  v2.uploader.upload(path, (error, data) => {
  
    if (error) {
       res.status(500).json({
        status : false,
        message: "Could not upload image to cloud , try again",
        data: null
      });
      return
    }
    res.status(200).json({
      status : true,
      message: "image upload",
      data,
    });
    ///delete file
    fs.unlinkSync(path);
  });
}

const getMyAdd = async(req,res) => {
    try {
      const  user_id  = req.query.user_id;
      if(!user_id){
        res.status(400).json({
          status : false,
          message : "required data missing",
          data : null
        })
        return 
      }
      const data = await postModel.find({user_id :user_id})
      res.status(200).json({
        status : true,
        message : "sucessfuly get my ads",
        data
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
        status: false,
        data: null,
      });
    }
}

const deActivePost = async(req,res)=>{
  try{
        const {id,status} = req.body
        if(!id || status == undefined){
           res.status(400).json({
                status : false,
                message : "required data missing",
                data : null
              })
              return
        }
        const uptPost = await postModel.findByIdAndUpdate(id,{isActive :!status})
        res.status(200).json({
          status : true,
          message : "Ad Update Successfully",
          data : uptPost
        })
      }catch (error) {
        res.status(500).json({
          message: error.message,
          status: false,
          data: null,
        });
      }
}

// postLike
const postlike = async(req,res) => {
  try {
    const id = req.params.id
    const userId = req.body.userId
    if(!id || !userId){
      res.status(400).json({
        status : false,
        message : "required data missing"
      })
      return
    }
    const post = await postModel.findById(id);
    if (!post.likes.includes(userId)) {
        await post.updateOne({ $push: { likes: userId} });
        res.status(200).json("the Post has been liked");
    } else {
        await post.updateOne({ $pull: { likes: userId } });
        res.status(200).json("the Post has been disliked");
    }
} catch (err) {
    res.status(500).json({ error: err.message });

}
}


const getLikePosts = async(req,res)=>{
  try {
    const {id} =req.params 
    const likedPosts = await postModel.find({}); 
    const filteredPosts = likedPosts.filter((x)=>{
          return (x.likes.includes(id) && x.isActive)
   })
    res.status(200).json({
      status: true,
      message: "Liked posts retrieved successfully",
      data: filteredPosts
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
      data: null
    });
  }
};



export {
  getAllPosts,
  createpost,
  getSinglePost,
  deletePost,
  updatePost,
  uploadImg,
  getMyAdd,
  deActivePost,
  postlike,
  getLikePosts
}
