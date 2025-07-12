import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function AddItem() {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: ''
  });
  const { addListing } = useUser();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the data. Replace with API call as needed.
    const data = new FormData();
    images.forEach((img, idx) => data.append('images', img));
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    const newItem = { ...form, images: imagePreviews };
    addListing(newItem);
    // Redirect to dashboard after submit
    navigate('/dashboard');
  };

  return (
    <div style={{
      background: '#f8fafc',
      minHeight: '100vh',
      padding: '2rem 0',
      fontFamily: 'Segoe UI, Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: 600,
        margin: '2rem auto',
        background: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 2px 16px 0 rgba(60,60,120,0.08)',
        padding: '2.5rem 2rem'
      }}>
        <h2 style={{
          color: '#6366f1',
          fontSize: '2rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Upload Images:
              <input type="file" multiple accept="image/*" onChange={handleImageChange} style={{
                display: 'block',
                marginTop: '0.5em',
                color: '#6366f1'
              }} />
            </label>
            {imagePreviews.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.7em', flexWrap: 'wrap' }}>
                {imagePreviews.map((src, idx) => (
                  <img key={idx} src={src} alt="preview" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #e0e7ff' }} />
                ))}
              </div>
            )}
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Title:
              <input type="text" name="title" value={form.title} onChange={handleInputChange} style={{
                display: 'block',
                width: '100%',
                marginTop: '0.5em',
                padding: '0.5em',
                borderRadius: '6px',
                border: '1px solid #e0e7ff'
              }} required />
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Description:
              <textarea name="description" value={form.description} onChange={handleInputChange} style={{
                display: 'block',
                width: '100%',
                marginTop: '0.5em',
                padding: '0.5em',
                borderRadius: '6px',
                border: '1px solid #e0e7ff'
              }} required />
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Category:
              <select name="category" value={form.category} onChange={handleInputChange} style={{
                display: 'block',
                width: '100%',
                marginTop: '0.5em',
                padding: '0.5em',
                borderRadius: '6px',
                border: '1px solid #e0e7ff',
                background: '#fff'
              }} required>
                <option value="">Select Category</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Shirts">Shirts</option>
                <option value="Sweaters & Hoodies">Sweaters & Hoodies</option>
                <option value="Jackets & Coats">Jackets & Coats</option>
              </select>
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Brand:
              <select name="type" value={form.type} onChange={handleInputChange} style={{
                display: 'block',
                width: '100%',
                marginTop: '0.5em',
                padding: '0.5em',
                borderRadius: '6px',
                border: '1px solid #e0e7ff',
                background: '#fff'
              }} required>
                <option value="">Select Brand</option>
                <option value="Zara">Zara</option>
                <option value="H&M">H&M</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Levi’s">Levi’s</option>
              </select>
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Size:
              <select name="size" value={form.size} onChange={handleInputChange} style={{
                display: 'block',
                width: '100%',
                marginTop: '0.5em',
                padding: '0.5em',
                borderRadius: '6px',
                border: '1px solid #e0e7ff',
                background: '#fff'
              }} required>
                <option value="">Select Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Condition:
              <select name="condition" value={form.condition} onChange={handleInputChange} style={{
                display: 'block',
                width: '100%',
                marginTop: '0.5em',
                padding: '0.5em',
                borderRadius: '6px',
                border: '1px solid #e0e7ff',
                background: '#fff'
              }} required>
                <option value="">Select Condition</option>
                <option value="Brand New (With Tag)">Brand New (With Tag)</option>
                <option value="Like New (Worn Once)">Like New (Worn Once)</option>
                <option value="Gently Used">Gently Used</option>
              </select>
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Tags:
              <input type="text" name="tags" value={form.tags} onChange={handleInputChange} style={{
                display: 'block',
                width: '100%',
                marginTop: '0.5em',
                padding: '0.5em',
                borderRadius: '6px',
                border: '1px solid #e0e7ff'
              }} placeholder="comma separated" required />
            </label>
          </div>
          <button type="submit" style={{
            background: '#6366f1',
            color: '#fff',
            border: '2px solid #6366f1',
            borderRadius: '8px',
            padding: '0.7em 1.5em',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '1rem'
          }}>Submit Item</button>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
