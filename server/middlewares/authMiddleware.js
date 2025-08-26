// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided in headers',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    req.user = user; 
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token invalid or expired',
    });
  }
};
