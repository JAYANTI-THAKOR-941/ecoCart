import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/user/login', formData);
      toast.success(res.data.message || 'Login successful');
      localStorage.setItem('userToken', res.data.user.token);
      localStorage.setItem('userInfo', JSON.stringify(res.data.user));

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={1500} />

      <style>{`
        .login-form-container {
          max-width: 400px;
          margin: 40px auto;
          padding: 30px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          background-color: #f9fff9;
        }

        .login-form-container h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #2f855a;
        }

        .login-form-container input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }

        .login-form-container button {
          background-color: #38a169;
          color: white;
          padding: 10px;
          width: 100%;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        .login-form-container button:hover {
          background-color: #2f855a;
        }

        .login-links {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
          font-size: 14px;
        }

        .login-links a {
          color: #2f855a;
          text-decoration: none;
        }

        .login-links a:hover {
          text-decoration: underline;
        }
      `}</style>

      <form onSubmit={handleSubmit} className="login-form-container">
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <div className="login-links">
          <Link to="/register">Create Account</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
