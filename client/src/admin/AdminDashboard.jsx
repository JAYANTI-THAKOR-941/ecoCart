import React, { useEffect, useState } from "react";
import { User, Book, DollarSign } from "lucide-react";
import "./admin.css";
import axios from "axios";

const AdminDashboard = () => {

  const [product, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true)

  const fetchProduct = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/product/all');
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/user/all');
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
    fetchUsers();
  }, []);
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <nav className="sidebar-nav">
          <a href="/admin-dashboard">Dashboard</a>
          <a href="/users">Users</a>
          <a href="/product-management">Products</a>
          <a href="#">Payments</a>
          <a href="#">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="admin-info">
            <img src="https://media.licdn.com/dms/image/v2/D4D03AQHa78e27J4i7w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730975035658?e=2147483647&v=beta&t=PCE5dRW9e-VGQwhrTxS-8dHd4bY1Vt76Ae0wbaao9gM" alt="Admin" className="admin-avatar" />
            <span className="admin-name">Jayanti Thakor</span>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="card">
            <User className="icon blue" />
            <div>
              <h3>Total Users</h3>
              <p>{loading ? "Loading..." : users.length}</p>
            </div>
          </div>
          <div className="card">
            <Book className="icon green" />
            <div>
              <h3>Total Products</h3>
              <p>{loading ? "Loading..." : product.length}</p>
            </div>
          </div>
          <div className="card">
            <DollarSign className="icon yellow" />
            <div>
              <h3>Total Revenue</h3>
              <p>₹1,20,000</p>
            </div>
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="recent-users">
            <h2>Recent Users</h2>
            <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="3">No users found</td>
                </tr>
              ) : (
                users.slice(-5).reverse().map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric"
                    })}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
