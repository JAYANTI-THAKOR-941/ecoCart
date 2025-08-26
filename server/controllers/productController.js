import Product from "../model/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.path : null;

 

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const {name,description,price,category} = req.body;
        const image = req.file ? req.file.path:null;

        const updatedData = {
            name,
            description,
            price,
            category
        }
        if(image){
            updatedData.image = image;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updatedData,
            {new:true}
        )
        if(!updatedData){
            return res.status(404).json({message:'Product not found'});
        }

        res.status(200).json(updatedProduct)
    }
    catch(error){
        res.status(401).json({message:error.message});
    }
}


export const deleteProduct = async(req,res)=>{
    try{
        const {id} = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if(!deletedProduct){
            return res.status(404).json({message:'Product not found.!'});
        }

        res.status(201).json({message:'Product deleted successfully.!!'});
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}

export const getAllproduct=async(req,res)=>{
    try{
        const product =await Product.find();
        res.status(200).json(product);
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

export const getProductByID = async(req,res)=>{
    try{
        const {id}  = req.params;
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({message:'Product Not Found.!'})
        }

        res.status(200).json(product);
    }catch(error){
        res.status(400).json({message:error.message});
    }
}