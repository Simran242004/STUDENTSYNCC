import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-toastify";

export default function ContactSeller() {
  const { sellerId } = useParams();
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return toast.error("Message cannot be empty");

    try {
      await API.post(`/messages/send`, {
        sellerId,
        message,
      });

      toast.success("Message sent!");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="contact-box">
      <h2>Send Message to Seller</h2>

      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
