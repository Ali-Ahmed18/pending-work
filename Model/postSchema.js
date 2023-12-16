import mongoose from "mongoose";
const post_Schema = new mongoose.Schema({
    price:{
        type : String,
        required: true
    },
    what_sell:{
        type : String,
        required: true
    },
    title:{
        type : String,
        required: true
    },
    location:{
        type : String,
        required: true
    },
    product_img_url:{
        type : Array,
        required: true
    },
    description:{
        type : String,
        required: true
    },
    brand:{
        type : String,
        required: true
    },
    condition:{
        type : String,
        required: true
    },
    user_id:{
        type : String,
        required: true
    },
    user_name:{
        type : String,
        required: true
    },
    phone_no:{
        type : String,
        required: true
    },
    isActive:{
        type : Boolean,
        required : true,
        default : true
    },
    likes: {
        type: Array,
        required: true,
        default : []
    },
    created_on:{
        type : Date,
        required:true,
        default: Date.now
    },
    updated_on:{
        type : Date,
        required:true,
        default: Date.now
    }
   
})
const postModel = mongoose.model("post",post_Schema)

export default postModel