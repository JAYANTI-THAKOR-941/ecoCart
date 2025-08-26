import express from 'express';
import { createProduct,deleteProduct,getAllproduct,getProductByID,updateProduct } from '../controllers/productController.js';
import upload from '../middlewares/upload.js';
import isAdmin from '../middlewares/isAdmin.js';

const router = express.Router();

router.post('/create', upload.single('image'), createProduct);
router.put('/update/:id',upload.single('image'),updateProduct,isAdmin)
router.delete('/delete/:id',deleteProduct,isAdmin)

router.get('/all',getAllproduct);
router.get('/:id',getProductByID);

export default router;