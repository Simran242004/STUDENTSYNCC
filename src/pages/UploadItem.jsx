import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import "./UploadItem.css";


function UploadItem() {
  const [item, setItem] = useState({
    title: "",
    // description: "",
    price: "",
    category: "",
    image: "",
  });

  const [message, setMessage] = useState("");
 const { user, loading } = useContext(AuthContext); // 👈 get user
  const navigate = useNavigate();

  // ✅ Redirect to login if not logged in
 useEffect(() => {
  if (!loading && !user) {
    navigate("/login");
  }
}, [loading, user, navigate]);

if (loading) return null; 

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Optionally attach token in headers if your API requires it
      const token = localStorage.getItem("token");
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      const res = await API.post("/items/upload", item, config);
      setMessage("Item uploaded successfully!");
      console.log(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Item</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          name="title"
          placeholder="Item Title"
          value={item.title}
          onChange={handleChange}
          required
        />
        {/* <input
          type="text"
          name="description"
          placeholder="Description"
          value={item.description}
          onChange={handleChange}
          required
        /> */}
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={item.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={item.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={item.image}
          onChange={handleChange}
        />

        <button type="submit" className="upload-btn">
          Upload
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadItem;
