import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    image:{
        type:String,
    },
    createAt:{
        type:Date,
        default:Date.now,
    }
});


const Product = mongoose.model('Product',productSchema);

export default Product;