import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    // Create new user
    const newUser = await User.create({ name, email, password });

    // Return success response with token
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser._id),
      },
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check password
    const isPasswordValid = user && (await user.comparePassword(password));
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Return success response with token
    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};


export const getAllUsers=async(req,res)=>{
    try{
        const user =await User.find();
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({message:error.message})
    }
}