// src/pages/Product.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product/all");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "20px",
      padding: "30px",
      minHeight: "100vh",
    },
    card: {
      width: "300px",
      height: "400px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(224, 190, 190, 0.51)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
    },
    image: {
      width: "100%",
      height: "220px",
      objectFit: "cover",
    },
    info: {
      padding: "15px",
      flex: 1,
    },
    title: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    description: {
      fontSize: "0.95rem",
      color: "#555",
      marginBottom: "12px",
    },
    bottom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    price: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#333",
    },
    button: {
      backgroundColor: "#ff5722",
      color: "#fff",
      border: "none",
      padding: "8px 14px",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    h1: {
      textAlign: "center",
      fontSize: "3rem",
      margin: "30px 0",
    },
    loading: {
      textAlign: "center",
      fontSize: "1.5rem",
      marginTop: "100px",
    },
  };

  if (loading) {
    return <div style={styles.loading}>Loading products...</div>;
  }

  return (
    <>
      <h1 style={styles.h1}>Explore Our Products</h1>
      <div style={styles.container}>
        {products.map((product) => (
          <div key={product._id || product.id} style={styles.card}>
           <img src={`http://localhost:3000/${product.image}`} />
            <div style={styles.info}>
              <h3 style={styles.title}>{product.name}</h3>
              <p style={styles.description}>{product.description}</p>
              <div style={styles.bottom}>
                <span style={styles.price}>₹{product.price}</span>
                <button
                  style={styles.button}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#e64a19")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#ff5722")}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
