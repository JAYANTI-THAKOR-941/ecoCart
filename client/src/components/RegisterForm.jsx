import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/user/register', formData);
      localStorage.setItem('userToken', res.data.user.token);
      localStorage.setItem('userInfo', JSON.stringify(res.data.user));
      toast.success(res.data.message || 'Registration successful');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      <style>{`
        .register-form-container {
          max-width: 400px;
          margin: 40px auto;
          padding: 30px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          background-color: #f9fff9;
        }

        .register-form-container h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #2f855a;
        }

        .register-form-container input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }

        .register-form-container button {
          background-color: #38a169;
          color: white;
          padding: 10px;
          width: 100%;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        .register-form-container button:hover {
          background-color: #2f855a;
        }

        .register-links {
          text-align: center;
          margin-top: 10px;
        }

        .register-links a {
          color: #2f855a;
          text-decoration: none;
        }

        .register-links a:hover {
          text-decoration: underline;
        }
      `}</style>

      <form onSubmit={handleSubmit} className="register-form-container">
        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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

        <button type="submit">Register</button>

        <div className="register-links">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default RegisterForm;
