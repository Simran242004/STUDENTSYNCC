// frontend/src/pages/ItemsPage.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api"; // adjust if your api helper path is different
import { Link } from "react-router-dom";

export default function ItemPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await API.get("/api/items"); // backend path: /api/items
      setItems(res.data);
    } catch (e) {
      console.error(e);
      setErr("Failed to fetch items");
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Marketplace</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {items.map((it) => (
          <div key={it._id || it.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
            {it.image && <img src={it.image.startsWith("/") ? it.image : it.image} alt={it.title} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }} />}
            <h4 style={{ margin: "8px 0 4px" }}>{it.title}</h4>
            <p style={{ margin: "0 0 8px" }}>₹{it.price}</p>
            <Link to={`/items/${it._id || it.id}`}>View details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
