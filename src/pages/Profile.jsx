import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function ProfileForm({ userData, onUpdate = () => {} }) {
  const navigate = useNavigate(); // React Router hook
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    university: "",
    department: "",
    year: "",
    phone: "",
  });

  const [success, setSuccess] = useState(""); // For success message

  // Initialize form with userData
  useEffect(() => {
    if (userData) setForm(userData);
  }, [userData]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission (Submit button)
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form); // update parent
    setSuccess("Profile submitted successfully!");

    // Navigate to homepage after 1 second (for user to see success)
    setTimeout(() => {
      setSuccess("");
      navigate("/"); // change "/" if your homepage route is different
    }, 1000);
  };

  // Handle Update button (updates parent without navigation)
  const handleUpdateClick = () => {
    onUpdate(form);
    setSuccess("Profile updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {success && <div className="success-message">{success}</div>}
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>University</label>
          <input type="text" name="university" value={form.university} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input type="text" name="department" value={form.department} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Year of Study</label>
          <input type="text" name="year" value={form.year} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} />
        </div>

        {/* Buttons */}
        <div className="button-container">
          <button type="button" className="update-btn" onClick={handleUpdateClick}>
            Update
          </button>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
