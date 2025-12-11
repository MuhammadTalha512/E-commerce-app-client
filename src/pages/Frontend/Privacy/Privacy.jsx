import React from "react";
import { Card } from "antd";

const PrivacyPolicy = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Privacy Policy</h2>

      <Card
        bordered={false}
        style={{
          background: "#fafafa",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          lineHeight: 1.8,
          color: "#555",
        }}
      >
        <p>
          At <strong>BabyStyle Store</strong>, we value your privacy and are committed to protecting
          your personal information. This Privacy Policy explains how we collect, use, and safeguard
          your data when you visit our website or make a purchase.
        </p>

        <h3>1. Information We Collect</h3>
        <p>
          We may collect your name, email address, shipping address, phone number, and payment
          details when you place an order. We also collect non-personal data such as browser type,
          device, and cookies for website performance and personalization.
        </p>

        <h3>2. How We Use Your Information</h3>
        <ul>
          <li>To process and deliver your orders</li>
          <li>To send updates, offers, and notifications</li>
          <li>To improve our website experience and customer service</li>
          <li>To ensure secure transactions and prevent fraud</li>
        </ul>

        <h3>3. Data Protection</h3>
        <p>
          We use secure servers and encryption technologies to protect your personal information.
          Your payment details are processed only through trusted third-party gateways.
        </p>

        <h3>4. Sharing Your Information</h3>
        <p>
          We never sell, rent, or trade your personal data. We only share it with trusted service
          providers (like delivery and payment partners) to fulfill your orders.
        </p>

        <h3>5. Cookies</h3>
        <p>
          Our website uses cookies to enhance user experience, analyze traffic, and remember your
          preferences. You can disable cookies through your browser settings if you wish.
        </p>

        <h3>6. Your Rights</h3>
        <p>
          You have the right to access, modify, or delete your personal data. Contact us at{" "}
          <a href="mailto:support@babystyle.com">support@babystyle.com</a> for any requests.
        </p>

        <h3>7. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy occasionally to reflect changes in our practices. Please
          check this page regularly for the latest version.
        </p>

        <p className="mt-4">
          <strong>Last Updated:</strong> November 2025
        </p>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
