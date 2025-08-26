// src/components/ProductList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./admin.css"; 

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("http://localhost:3000/api/product/all");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    if (confirm("Are you sure?")) {
      await axios.delete(`http://localhost:3000/api/product/delete/${id}`);
      getProducts();
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="product-list-container">
      <div className="header">
        <h2>All Products</h2>
        <Link to="/add">
          <button className="add-btn">➕ Add Product</button>
        </Link>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Category</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>
              <td>
                {p.image && (
                  <img
                    src={`http://localhost:3000/${p.image}`}
                    alt={p.name}
                    className="product-img"
                  />
                )}
              </td>
              <td>
                <div className="action-btns">
                  <Link to={`/edit/${p._id}`}>
                    <button className="edit-btn">✏️ Edit</button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(p._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
