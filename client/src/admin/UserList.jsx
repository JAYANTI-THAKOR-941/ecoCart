import React, { useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
import { Link } from "react-router-dom";
const UserList = () => {
  const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true)
  
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
      fetchUsers();
    }, []);
    return (
        
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
    )
}

export default UserList