import React, { useState } from "react";
import axios from "axios";
import Nav from "./Nav";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discounted_price, setDescountedPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("discounted_price", discounted_price);
    formData.append("description", description);
    formData.append("image", image);

    axios
      .post("http://localhost:8000/api/products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ye Optional h ye bs brwoser ko baatat h ki data ka type kya hai multiple types of data jisme text or image dono h form ka data
        },
      })
      .then((res) => {
        setMsg("✅ Product successfully added!");
        console.log(res.data);
      })
      .catch((err) => {
        setMsg("❌ Error occurred while adding product.");
        console.error(err);
      });
  };

  // 🎨 Object CSS Styles
  const formContainer = {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fafafa",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "15px",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  };

  const msgStyle = {
    textAlign: "center",
    color: msg.includes("success") ? "green" : "red",
    marginTop: "15px",
    fontWeight: "bold",
  };

  return (
    <>
    <Nav/>
    <div style={formContainer}>
      <h2 style={headingStyle}>🛒 Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Product Name"
          style={inputStyle}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          style={inputStyle}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Discounted_price"
          style={inputStyle}
          onChange={(e) => setDescountedPrice(e.target.value)}
        />
        <textarea
          placeholder="Description"
          rows={4}
          style={inputStyle}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*" //iska mtlb h ki ab brouwser ko pata h ki user bs image file hi select kr skta  h kisi bhi type ki image ko. Baki bina ye likhe bhi kaam ho jayega tb user koi bhi file select kr skta hai//
          style={inputStyle}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" style={buttonStyle}>
          ➕ Add Product
        </button>
      </form>
      {msg && <p style={msgStyle}>{msg}</p>}
    </div>
    </>
  );
}
