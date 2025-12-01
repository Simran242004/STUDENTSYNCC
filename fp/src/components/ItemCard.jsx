import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import "./ItemCard.css";

export default function ItemCard({ item, user }) {
  const navigate = useNavigate();

  const handleContact = () => {
    if (!user) {
      return navigate("/login");
    }

    // 👉 Go to static seller profile
    navigate("/seller");
  };

  return (
    <div className="card">
      <div
        className="card-image"
        style={{ backgroundImage: `url(${item.image})` }}
      />

      <div className="card-body">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-desc">{item.description}</p>

        <div className="card-meta">
          <span className="price">₹{item.price}</span>
        </div>

        <div className="card-actions">
          <button className="profile" onClick={handleContact}>
            <MessageCircle className="inline mr-1" /> Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
}
