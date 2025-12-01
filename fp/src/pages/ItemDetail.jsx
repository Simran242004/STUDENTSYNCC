// frontend/src/pages/ItemDetail.jsx
import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useParams } from 'react-router-dom';

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (id) API.get(`/items/${id}`).then(r => setItem(r.data)).catch(e => console.error(e));
  }, [id]);

  if (!item) return <div>Loading...</div>;
  return (
    <div style={{ padding: 20 }}>
      <h2>{item.title}</h2>
      {item.image && <img src={item.image} alt={item.title} style={{ maxWidth: 400 }} />}
      <p>{item.description}</p>
      <p>Price: ₹{item.price}</p>
    </div>
  );
}
