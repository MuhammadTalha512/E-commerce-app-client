import React, { useState } from "react";
import { Row, Col, Button, message } from "antd";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    const VITE_API_URL = import.meta.env.VITE_API_URL;

    if (!email) return message.error("Please enter your email");

    try {
      const res = await axios.post(`${VITE_API_URL}/api/subscriber`, { email });
      if (res.data.success) {
        message.success("Subscribed Successfully");
        setEmail("");
      }
    } catch (error) {
      message.error("Already subscribed or something went wrong!");
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#000", color: "#fff", padding: "60px 0" }}>
      <div className="container" style={{ overflow: "hidden" }}>

        <Row gutter={[20, 20]}>
          {/* LEFT SIDE */}
          <Col xs={24} md={12}>
            <h4 style={{ marginBottom: "20px" }}>Useful Links</h4>
            <p style={{ margin: "6px 0", cursor: "pointer" }}>Privacy Policy</p>
            <p style={{ margin: "6px 0", cursor: "pointer" }}>Terms & Conditions</p>

            <h4 style={{ marginTop: "30px" }}>Social Media</h4>
            <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
              <a href="#" style={{ color: "#fff", fontSize: "22px" }}>
                <FaFacebook />
              </a>
              <a href="#" style={{ color: "#fff", fontSize: "22px" }}>
                <FaInstagram />
              </a>
              <a href="#" style={{ color: "#fff", fontSize: "22px" }}>
                <FaTwitter />
              </a>
              <a href="#" style={{ color: "#fff", fontSize: "22px" }}>
                <FaLinkedin />
              </a>
              <a href="#" style={{ color: "#fff", fontSize: "22px" }}>
                <FaYoutube />
              </a>
            </div>

            <h4 style={{ marginTop: "30px" }}>Copyright</h4>
            <p>Complete Nutrition © {year}</p>

          </Col>

          {/* RIGHT SIDE */}
          <Col xs={24} md={12}>
            <h3 style={{ lineHeight: "1.3" }}>Subscribe to our newsletter and</h3>
            <h3 style={{ marginBottom: "15px" }}>Get 10% off</h3>

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                padding: "14px",
                marginBottom: "12px",
                border: "1px solid #333",
                background: "#111",
                color: "#fff",
                borderRadius: "4px",
              }}
            />

            <Button
              onClick={handleSubscribe}
              style={{
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                background: "#fff",
                color: "#000",
                padding: "16px",
                borderRadius: "4px",
                fontWeight: "bold",
              }}
            >
              Subscribe
            </Button>

            <p style={{ marginTop: "10px", opacity: 0.7 }}>
              Get regular updates on our product with our newsletter.
            </p>
          </Col>
        </Row>

        <p
          style={{
            marginTop: "50px",
            fontSize: "14px",
            opacity: 0.6,
            textAlign: "center",
            lineHeight: "1.5",
          }}
        >
          *These statements have not been evaluated by the Food and Drug Administration.
          This product is not intended to diagnose, treat, cure or prevent any disease.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
