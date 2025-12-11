import React from "react";
import { Row, Col, Card } from "antd";

const About = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">About Us</h2>
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={12}>
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
            alt="About"
            style={{ width: "100%", borderRadius: "15px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
          />
        </Col>

        <Col xs={24} md={12}>
          <h3>Who We Are</h3>
          <p style={{ color: "#555" }}>
            Welcome to <strong>BabyStyle Store</strong> — your one-stop destination for adorable and
            comfortable baby fashion. Our mission is to provide high-quality baby products that blend
            safety, comfort, and style.
          </p>

          <h3>Our Promise</h3>
          <p style={{ color: "#555" }}>
            We carefully curate our collection to ensure every product meets the highest standards of
            softness, design, and durability. From cozy rompers to tiny shoes, each item is made with
            love and care for your little one.
          </p>

          <h3>Why Choose Us?</h3>
          <ul style={{ color: "#555", lineHeight: 2 }}>
            <li>👶 Premium baby wear</li>
            <li>🚚 Fast and reliable shipping</li>
            <li>💳 Secure payments</li>
            <li>💬 Excellent customer support</li>
          </ul>
        </Col>
      </Row>

      <div className="text-center mt-5">
        <Card
          bordered={false}
          style={{
            background: "#fafafa",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <h3>Our Vision</h3>
          <p style={{ color: "#555", maxWidth: "700px", margin: "0 auto" }}>
            To make baby fashion accessible, sustainable, and full of joy — because every little smile
            deserves the best.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default About;
