import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://nthealthcarebackend.onrender.com/api/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);
   const navigate = useNavigate()

  const addToCart = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Please login to add products to cart.");
      return;
    }

    try {
      await axios.post(
        "https://nthealthcarebackend.onrender.com/api/cart/",
        { product: product.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Product added to cart");
    } catch (err) {
      console.error(" Failed to add to cart", err);
      alert("Failed to add to cart please login Again");
      navigate("/login")
    }
  };

  if (!product) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg border-0 rounded-4 p-4">
              <div className="row g-4 align-items-center">
                {/* Image Section */}
                <div className="col-md-6 text-center">
                  <div className="position-relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid rounded-4 shadow-sm"
                      style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                  </div>
                </div>

                {/* Detail Section */}
                <div className="col-md-6">
                  <h2 className="fw-bold text-primary mb-3">{product.name}</h2>
                  <p className="text-muted fs-6">{product.description}</p>

                  <h4 className="my-3">
                    <span className="text-success fw-bold fs-3">₹{product.discounted_price}</span>{" "}
                    <span className="text-decoration-line-through text-muted fs-5 ms-2">
                      ₹{product.price}
                    </span>
                  </h4>

                  <div className="d-grid gap-3 mt-4">
                    <button
                      className="btn btn-success btn-lg rounded-pill shadow-sm"
                      onClick={addToCart}
                    >
                      <i className="fas fa-cart-plus me-2"></i>
                      Add to Cart
                    </button>

                    <Link to="/cart" className="btn btn-primary btn-lg rounded-pill shadow-sm">
                    <i className="fas fa-cart-plus me-2"></i>
                     View Cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
