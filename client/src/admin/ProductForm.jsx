// src/components/ProductForm.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./admin.css"; 

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const fetchProduct = async () => {
    const res = await axios.get(`http://localhost:3000/api/product/${id}`);
    const { name, description, price, category } = res.data;
    setFormData((prev) => ({ ...prev, name, description, price, category }));
  };

  useEffect(() => {
    if (isEdit) fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      if (isEdit) {
        await axios.put(`http://localhost:3000/api/product/update/${id}`, data);
      } else {
        await axios.post("http://localhost:3000/api/product/create", data);
      }
      navigate("/product-management");
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="product-form-wrapper">
      <div className="product-form-card">
        <h2>{isEdit ? "Update Product" : "Create New Product"}</h2>
        <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
          <div className="form-group">
            <label>Product Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₹)</label>
              <input name="price" type="number" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input name="category" value={formData.category} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input type="file" name="image" onChange={handleChange} accept="image/*" />
          </div>

          <button type="submit" className="submit-btn">
            {isEdit ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
