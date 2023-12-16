import userModel from "../Model/userSchema.js"
import pswCompare from "../utils/compare.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()


const createUser = async (req, res) => {
  try{
    const { firstName, lastName, email, password, gender, age } = req.body;
    if (!firstName || !lastName || !email || !password || !gender || !age) {
      res.status(400).json({
        status: false,
        data: null,
        message: "required fields are missing",
      });
      return;
    }
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      res.status(409).json({
        status: false,
        data: null,
        message: "Email already exists",
      });
      return;
    }
  
    const hash = await bcrypt.hash(password, 10);
  
    const dataCreate = await userModel.create({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hash,
      gender,
      age,
    });
    res.status(201).json({
      status: true,
      data: dataCreate,
      message: "user create seccessfully",
    });
  }catch(err){
    res.status(500).json({
      status: false,
      data: null,
      message: err.message
    })
    
  }
}


  const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if ((!email, !password)) {
        res.status(401).json({
          status: false,
          data: null,
          message: "required fields are missing",
        });
        return;
      }
      const emailExist = await userModel.findOne({ email });
      if (!emailExist) {
        res.status(401).json({
          status: false,
          message: "invalid credentials",
          data: null,
        });
        return;
      }
  
      const checkPsw = await pswCompare(password, emailExist.password);
      if (!checkPsw) {
        res.status(401).json({
          status: false,
          message: "invalid credentials",
          data: null,
        });
        return;
      } else {
        const token = jwt.sign({ id: emailExist._id }, process.env.PRIVATE_KEY);
        res.status(200).json({
          status: true,
          message: "user logIn successfully",
          data : emailExist,
          token
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        data: null,
        message: error.message,
      });
    }
  }

  export {
    createUser,
    userLogin
  }