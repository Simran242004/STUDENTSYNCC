import React, { useState, useEffect } from "react";
import "./ProfileForm.css";

export default function ProfileForm({ userData, onUpdate }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    university: "",
    department: "",
    year: ""
  });

  // Populate form when userData is loaded
  useEffect(() => {
    if (userData) {
      setForm({
        fullName: userData.fullName || "",
        email: userData.email || "",
        university: userData.university || "",
        department: userData.department || "",
        year: userData.year || ""
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form); // send updated data to parent
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <input
        type="text"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="university"
        value={form.university}
        onChange={handleChange}
        placeholder="University"
      />
      <input
        type="text"
        name="department"
        value={form.department}
        onChange={handleChange}
        placeholder="Department"
      />
      <input
        type="text"
        name="year"
        value={form.year}
        onChange={handleChange}
        placeholder="Year"
      />
      <button type="submit">Update Profile</button>
    </form>
  );
}
