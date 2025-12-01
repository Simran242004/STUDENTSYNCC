import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

// ----- Error Boundary -----
class SellPageErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error, info) {
    console.error("SellPage caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.errorMsg}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// ----- Sell Page Component -----
function SellPageContent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [meetingPoint, setMeetingPoint] = useState('');
  const [msg, setMsg] = useState('');
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const meetingOptions = [
    'T Point',
    'Library Gate',
    'Student Center',
    'Cafeteria',
    'Main Entrance',
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) setMsg('Please login to sell items');
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId") ?? '';
    if (!userId) {
      setMsg("User ID missing. Please login again.");
      return;
    }

    if (!meetingPoint) {
      setMsg("Please select a meeting point.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("meetingPoint", meetingPoint);
    formData.append("description", description);
    formData.append("userId", userId);
    if (image) formData.append("image", image);

    try {
      const res = await API.post("/api/items/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("SUCCESS", res.data);
      setMsg('');
      setSuccess(true);
 navigate("/");  
      // Clear form
      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('');
      setMeetingPoint('');
      setImage(null);
      setPreview(null);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("UPLOAD ERROR", err);
      setMsg("Upload failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sell an Item</h2>
      {msg && <p style={styles.msg}>{msg}</p>}
      {success && <p style={styles.success}>Item listed successfully! ✅</p>}

      <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
        <input
          style={styles.input}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        <textarea
          style={{ ...styles.input, height: 100 }}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          required
        />

        <input
          style={styles.input}
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Price"
          required
        />

        <input
          style={styles.input}
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="Category"
          required
        />

        <select
          style={styles.input}
          value={meetingPoint}
          onChange={e => setMeetingPoint(e.target.value)}
          required
        >
          <option value="">Select Meeting Point</option>
          {meetingOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <input
          style={styles.fileInput}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {preview && <img src={preview} alt="Preview" style={styles.preview} />}

        <button type="submit" style={styles.button}>List Item</button>
      </form>
    </div>
  );
}

// ----- Styles -----
const styles = {
  container: {
    maxWidth: 600,
    margin: '40px auto',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  msg: {
    textAlign: 'center',
    marginBottom: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  success: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#27ae60',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 16,
    width: '100%',
    outline: 'none',
    transition: '0.2s',
  },
  fileInput: {
    padding: 6,
    borderRadius: 8,
    border: '1px dashed #aaa',
    cursor: 'pointer',
  },
  preview: {
    marginTop: 8,
    width: '100%',
    maxHeight: 250,
    objectFit: 'cover',
    borderRadius: 8,
    border: '1px solid #ddd',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    border: 'none',
    backgroundColor: 'grey',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: 10,
    transition: '0.2s',
  },
};

// Add hover & focus styles with inline JS
styles.input[':focus'] = { borderColor: '#00aaff' };
styles.button[':hover'] = { backgroundColor: '#0088cc' };

// ----- Export with Error Boundary -----
export default function SellPage() {
  return (
    <SellPageErrorBoundary>
      <SellPageContent />
    </SellPageErrorBoundary>
  );
}
