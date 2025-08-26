import express from 'express';
import {
  getAllUsers,
  loginUser,
  registerUser,
} from '../controllers/userController.js';

import isAdmin from '../middlewares/isAdmin.js'; 
import { protect } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all',getAllUsers);

export default router;
