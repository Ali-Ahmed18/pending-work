import Express from "express";
import { createUser, userLogin } from "../Controller/authController.js";
import {
  createpost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
  uploadImg,
  getMyAdd,
  deActivePost,
  postlike,
  getLikePosts
} from "../Controller/postController.js";
import authMiddleware from "../Middlewares/index.js";
import upload from "../utils/multer.js";
const router = Express.Router();

// createUser//
router.post("/api/v1/createuser", createUser);

// login//
router.post("/api/v1/userlogin", userLogin);

// createPost//
router.post("/api/v1/post", [authMiddleware], createpost);

// getAllPosts//
router.get("/api/v1/post", getAllPosts);

// getSinglePost//
router.get("/api/v1/post/:id", getSinglePost);

// deletePost//
router.delete("/api/v1/post/:id", [authMiddleware], deletePost);

// updatePost//
router.put("/api/v1/post/:id", updatePost);

// get my add//
router.get("/api/v1/myads", getMyAdd);

// uploadImg//
router.post("/api/v1/uploadimage", upload.any("image"),uploadImg);

// deActivePost//
router.put("/api/v1/post",[authMiddleware],deActivePost);

// postlike//
router.put("/api/v1/:id/like",[authMiddleware],postlike);

// getLikePosts//
router.get("/api/v1/likeposts/:id",[authMiddleware],getLikePosts);




export default router;
