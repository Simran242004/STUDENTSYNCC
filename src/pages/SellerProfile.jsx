import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function SellerProfile() {
  const { user } = useContext(AuthContext);
  const [seller, setSeller] = useState(null);

  const [message, setMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!user) {
      toast.info("Login first");
      return;
    }

    // ✅ No API call — static seller details
    setSeller({
      name: "Ms. Nisha",
      email: "msnisha@gmail.com",
      phone: "8732863783",
      department: "B.Tech CSE",
      meetingPoint: "T Point",
    });

  }, [user]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setSuccessMsg("Your request has been sent to the seller!");
    setMessage("");

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  if (!user) return null;
  if (!seller) return <h2>Loading seller profile...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Seller Profile</h2>

      <div
        style={{
          marginTop: "10px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          background: "#f9f9f9",
        }}
      >
        <h3>Seller Details</h3>

        <p><strong>Name:</strong> {seller.name}</p>
        <p><strong>Email:</strong> {seller.email}</p>
        <p><strong>Contact No:</strong> {seller.phone}</p>
        <p><strong>Department:</strong> {seller.department}</p>
        <p><strong>Meeting Point:</strong> {seller.meetingPoint}</p>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          background: "#f0f9ff",
        }}
      >
        <h3>Send Request to Seller</h3>

        {successMsg && (
          <div
            style={{
              padding: "10px",
              marginBottom: "10px",
              background: "#c8ffce",
              borderRadius: "8px",
              color: "green",
              fontWeight: "bold",
            }}
          >
            {successMsg}
          </div>
        )}

        <textarea
          placeholder="Write your request to the seller..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            height: "120px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "none",
            fontSize: "14px",
          }}
        ></textarea>

        <button
          onClick={handleSendMessage}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
            fontSize: "15px",
          }}
        >
          Send Request
        </button>
      </div>
    </div>
  );
}
