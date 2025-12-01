// ... other imports
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../context/AuthContext";
import "../pages/HomePage.css";
import API from "../api/api";
import bg from "../pages/assets/Img.png";
import sampleItems from "../data/sampleData.js";
import { toast } from "react-toastify";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [items, setItems] = useState([]);
  const { user, loading } = useContext(AuthContext);

  const [showUpload, setShowUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [uploadCategory, setUploadCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  // Fetch items
  const fetchItems = async () => {
    try {
      const res = await API.get("/api/items");
      if (Array.isArray(res.data)) setItems(res.data);
      else if (Array.isArray(res.data.items)) setItems(res.data.items);
      else setItems(sampleItems);
    } catch (error) {
      console.error("Backend Error:", error);
      setItems(sampleItems);
    }
  };

  useEffect(() => {
    fetchItems();
    const interval = setInterval(fetchItems, 10000);
    return () => clearInterval(interval);
  }, []);

  // Filter items
  const filteredItems = items.filter((it) => {
    const matchesQuery =
      query.trim() === "" ||
      it.title?.toLowerCase().includes(query.toLowerCase()) ||
      it.description?.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      category === "All Categories" || it.category === category;
    return matchesQuery && matchesCategory;
  });

  // Upload item
  const handleItemUpload = async (e) => {
    e.preventDefault();
    if (!user) return toast.warn("Please login to upload items");
    if (!image) return toast.warn("Please select an image");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", uploadCategory);
    formData.append("condition", condition);
    formData.append("sellerId", user._id);
    formData.append("image", image);

    try {
      const res = await API.post("/api/items/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Item uploaded successfully!");
      setShowUpload(false);
      setItems((prev) => [res.data, ...prev]);

      setTitle("");
      setDescription("");
      setPrice("");
      setUploadCategory("");
      setCondition("");
      setImage(null);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed");
    }
  };

  // ✅ Navigate to seller profile
  const goToProfile = (sellerId) => {
    if (loading) return; // wait until auth state loaded
    if (!sellerId) {
      toast.error("Seller profile not found");
      return;
    }

    if (!user) {
      toast.warn("Please login to view seller profiles!", { position: "top-center" });
      setTimeout(() => navigate("/login"), 300);
      return;
    }

    navigate(`/seller/${sellerId}`);
  };

  return (
    <main className="container homepage">
      {/* HERO HEADER */}
      <header
        className="hero"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      ></header>

      {/* SEARCH & UPLOAD */}
      <div className="search-upload-row">
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
        />
        <button className="upload-btn-inline" onClick={() => setShowUpload(true)}>
          Upload Item
        </button>
      </div>

      {/* ITEMS GRID */}
      <section className="grid">
        {filteredItems.length === 0 ? (
          <div className="no-items">No items found. Be the first to list something!</div>
        ) : (
          filteredItems.map((item, index) => {
            const sellerId = item.sellerId || item.seller?._id || null;
            return (
              <div className="item-card" key={item._id || index}>
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `http://localhost:5000/uploads/${item.image?.replace(/\\/g, "/")}`
                  }
                  alt={item.title}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                  className="item-img"
                />

                <h3>{item.title}</h3>
                <p>{item.category}</p>
                <p>₹{item.price}</p>

                <button className="profile-btn" onClick={() => goToProfile(sellerId)}>
                  Profile
                </button>
              </div>
            );
          })
        )}
      </section>

      {/* UPLOAD ITEM MODAL */}
      {showUpload && (
        <div className="upload-overlay">
          <div className="upload-form">
            <h2>Upload New Item</h2>
            <form onSubmit={handleItemUpload}>
              <label>Item Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required />

              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <label>Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <label>Category</label>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option>Electronics</option>
                <option>Books</option>
                <option>Hostel Essentials</option>
                <option>Lab equipments</option>
                <option>Others</option>
              </select>

              <label>Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
              >
                <option value="">Select Condition</option>
                <option>Brand New</option>
                <option>Like New</option>
                <option>Good</option>
                <option>Used</option>
              </select>

              <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />

              {image && (
                <img src={URL.createObjectURL(image)} className="preview-img" alt="preview" />
              )}

              <div className="form-actions">
                <button type="submit" className="upload-submit-btn">
                  Upload
                </button>
                <button type="button" className="cancel-btn" onClick={() => setShowUpload(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
