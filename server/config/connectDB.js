import mongoose from 'mongoose'

const connectDB = async()=>{
    try{
        const conn = mongoose.connect('mongodb://localhost:27017/ecoCartDB');
        console.log("Database is connection successfully..!");
    }
    catch(error){
        console.error(`MongoDB connection failed.!! : ${error.message}`);
    }
}

export default connectDB;