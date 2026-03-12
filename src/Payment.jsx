import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";

const PaymentQR = () => {

  const [qr, setQr] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access_token");

  useEffect(() => {

    const fetchData = async () => {
      try {

        const qrRes = await axios.get("http://127.0.0.1:8000/api/qrcode/");

        if (qrRes.data.length > 0) {
          setQr(qrRes.data[0]);
        }

        const cartRes = await axios.get("http://localhost:8000/api/cart/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCart(cartRes.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.product_price,
    0
  );

  return (
    <>
      <Nav />

      {loading && (
        <div style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          Loading Payment Details...
        </div>
      )}

      {!loading && qr && (

        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#6366f1,#a855f7,#ec4899)"
        }}>

          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "20px",
            textAlign: "center",
            width: "350px"
          }}>

            <h2>Scan & Pay</h2>

            <p style={{ color: "gray" }}>
              Secure Payment
            </p>

            <img
              src={qr.qr}
              alt="qr"
              style={{
                width: "220px",
                margin: "20px 0"
              }}
            />

            <h3>{qr.name}</h3>

            {/* TOTAL BILL */}
            <div style={{
              marginTop: "20px",
              padding: "10px",
              background: "#f5f5f5",
              borderRadius: "10px"
            }}>

              <p style={{ margin: 0, color: "gray" }}>
                Total Amount
              </p>

              <h2 style={{
                margin: 0,
                color: "#16a34a"
              }}>
                ₹{totalPrice.toLocaleString("en-IN")}
              </h2>

            </div>

            <p style={{
              fontSize: "14px",
              color: "gray",
              marginTop: "15px"
            }}>
              After payment send screenshot on WhatsApp attach payment screenshot 
            </p>

            {/* WHATSAPP BUTTON */}

            <a
              href={`https://wa.me/917011617976?text=Hello%20I%20have%20completed%20payment%20of%20₹${totalPrice}%20Here%20is%20my%20screenshot.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                marginTop: "15px",
                background: "#25D366",
                color: "#fff",
                padding: "12px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600"
              }}
            >
              Send Screenshot on WhatsApp
            </a>

          </div>

        </div>
      )}
    </>
  );
};

export default PaymentQR;