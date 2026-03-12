import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome CSS

export default function UpdateProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discounted_price, setDiscountedPrice] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/products/${id}/`);
      const product = res.data;
      setName(product.name);
      setPrice(product.price);
      setDiscountedPrice(product.discounted_price);
      setDescription(product.description);
      setImage(product.image);
    } catch (err) {
      console.error("Error fetching product", err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("discounted_price", discounted_price);
    formData.append("description", description);

    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      await axios.patch(`http://localhost:8000/api/products/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Product Updated Successfully");
      navigate("/");
    } catch (err) {
      console.error("❌ Failed to update product", err);
    }
  };

  return (
    <>
      <Nav />
      <div className="container mt-5">
        <h2><i className="fas fa-edit me-2"></i>Update Product</h2>
        <form onSubmit={updateProduct}>
          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fas fa-tag"></i></span>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fas fa-rupee-sign"></i></span>
            <input
              type="number"
              placeholder="Price"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fas fa-percent"></i></span>
            <input
              type="number"
              placeholder="Discounted Price"
              className="form-control"
              value={discounted_price}
              onChange={(e) => setDiscountedPrice(e.target.value)}
            />
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fas fa-align-left"></i></span>
            <input
              type="text"
              placeholder="Description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {typeof image === "string" && (
            <div className="mb-3">
              <img
                src={image}
                alt="Previous"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          )}

          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-image"></i></span>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            <i className="fas fa-save me-2"></i>Save Changes
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
