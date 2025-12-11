import React, { useEffect, useState } from "react";
import { Col, Row, message } from "antd";
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const initialFormState = { name: "", email: "", message: "" };

const Contact = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
  }, []);

  const handleChange = (e) =>
    setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const validateForm = () => {
    let newErrors = {};
    if (!formValues.name.trim()) newErrors.name = "Please enter your name!";
    else if (formValues.name.length < 3) newErrors.name = "Name must be at least 3 characters!";
    if (!formValues.email.trim()) newErrors.email = "Please enter your email!";
    else if (!/\S+@\S+\.\S+/.test(formValues.email)) newErrors.email = "Please enter a valid email!";
    if (!formValues.message.trim()) newErrors.message = "Please enter your message!";
    else if (formValues.message.length < 10) newErrors.message = "Message must be at least 10 characters!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const VITE_API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${VITE_API_URL}/api/add-contact`, formValues);
      if (res.status === 201) {
        message.success("Message sent successfully!");
        setFormValues(initialFormState);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="container py-5 contact-wrapper">
      <h2 className="text-center fw-bold mb-5">Contact Us</h2>
      <Row gutter={[24, 24]}>
        {/* LEFT FORM */}
        <Col xs={24} md={16} data-aos="fade-up">
          <div className="form-card p-4 shadow-sm rounded">
            <h4 className="fw-semibold mb-3">Get in Touch</h4>
            <p className="text-muted mb-4">Feel free to reach out for any queries or support!</p>

            <form onSubmit={handleSubmit}>
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control input-field"
                placeholder="Your Name"
                value={formValues.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-danger small mt-1">{errors.name}</p>}

              <label className="form-label mt-3">Email</label>
              <input
                type="email"
                name="email"
                className="form-control input-field"
                placeholder="Your Email"
                value={formValues.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-danger small mt-1">{errors.email}</p>}

              <label className="form-label mt-3">Message</label>
              <textarea
                name="message"
                rows={5}
                className="form-control input-field"
                placeholder="Your Message"
                value={formValues.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <p className="text-danger small mt-1">{errors.message}</p>}

              <button type="submit" className="btn btn-danger px-5 mt-4">
                Send Message
              </button>
            </form>
          </div>
        </Col>

        {/* RIGHT INFO */}
        <Col xs={24} md={8} data-aos="fade-up">
          <div className="info-card p-4 shadow-sm rounded">
            <div className="info-box">
              <EnvironmentOutlined style={{ fontSize: 32, color: "#ff4d4f" }} />
              <p className="fw-semibold mt-2 mb-1">Address</p>
              <p className="text-muted">
                <a
                  href="https://www.google.com/maps?q=123+Main+St,+Anytown,+USA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  123 Main St, Anytown, USA
                </a>
              </p>
            </div>

            <div className="info-box">
              <PhoneOutlined style={{ fontSize: 32, color: "#ff4d4f" }} />
              <p className="fw-semibold mt-2 mb-1">Phone</p>
              <p className="text-muted">
                <a href="tel:+11234567890">(123) 456-7890</a>
              </p>
            </div>

            <div className="info-box">
              <MailOutlined style={{ fontSize: 32, color: "#ff4d4f" }} />
              <p className="fw-semibold mt-2 mb-1">Email</p>
              <p className="text-muted">
                <a href="mailto:support@capitalshop.com">support@capitalshop.com</a>
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <style jsx>{`
        .form-label {
          display: block;
          width: 100%;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }
        .input-field {
          border-radius: 10px !important;
          border: 1px solid #ccc;
          padding: 10px 12px;
          transition: all 0.3s;
        }
        .input-field:focus {
          border-color: #ff4d4f;
          box-shadow: 0 0 5px rgba(255, 77, 79, 0.5);
          outline: none;
        }
        .form-card {
          background-color: #fff;
        }
        .info-card {
          background-color: #fff;
        }
        .info-box {
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 15px 12px;
          margin-bottom: 20px;
          text-align: center;
          transition: all 0.3s;
        }
        .info-box:hover {
          border-color: #ff4d4f;
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        .info-box a {
          color: #555;
          text-decoration: none;
        }
        .info-box a:hover {
          text-decoration: underline;
          color: #ff4d4f;
        }

        @media (max-width: 768px) {
          .form-card,
          .info-card {
            margin-bottom: 20px;
          }
          .info-box {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
