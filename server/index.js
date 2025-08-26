import express from 'express'
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

// routes 
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'

app.use('/api/user',userRoutes);
app.use('/api/product',productRoutes)
 
app.get('/',(req,res)=>{
    res.send("\nWelcome in EcoCart.");
})


app.listen(PORT,()=>{
    console.log(`Server is Running on : http://localhost:${PORT}`);
})