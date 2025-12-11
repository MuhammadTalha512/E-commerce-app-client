import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import {FaFacebook,FaInstagram,FaTwitter,FaLinkedin,FaYoutube,} from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="topbar bg-light text-dark py-2">
      <div className="container">
        <Row align="middle" justify="space-between" gutter={[16, 8]}>
          <Col xs={24} sm={24} md={12}>
            <div className="topbar-links d-flex flex-wrap justify-content-center justify-content-md-start">
              <Link to="/about" className="topbar-link mx-2">About Us</Link>
              <Link to="/privacy" className="topbar-link mx-2">Privacy</Link>
              <Link to="/faqs" className="topbar-link mx-2">FAQs</Link>
              <Link to="/careers" className="topbar-link mx-2">Careers</Link>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="social-icons d-flex justify-content-center justify-content-md-end align-items-center flex-wrap gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebook size={20} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram size={20} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter size={20} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin size={20} /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaYoutube size={20} /></a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Topbar;
