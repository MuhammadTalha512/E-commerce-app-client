import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import AOS from "aos";
import axios from "axios";
import "aos/dist/aos.css";

const LatestNew = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      const res = await axios.get(`${VITE_API_URL}/api/blogs/latest`);
      setLatestBlogs(res.data.data || []);
    } catch (err) {
      console.log("Error loading latest blogs →", err);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container py-5">
          <h3 className="text-center py-3" style={{ fontWeight: 700 }}>
            Latest News
          </h3>

          <Row gutter={[16, 16]} data-aos="fade-up">
  {latestBlogs.map((item, i) => (
    <Col xs={24} sm={12} md={12} lg={8} key={i} >
      <div className="blog-card rounded-0">
        <div className="blog-img-wrapper">
          <img src={item.thumbnail || item.bannerImage} alt="news" className="blog-img" />
        </div>
        <div className="blog-content">
          <p className="blog-category">{item.category || "General"}</p>
          <p className="blog-date">{new Date(item.createdAt).toLocaleDateString()}</p>
          <Link className="blog-title">{item.title}</Link>
          <p className="blog-desc">{item.shortDescription || item.description?.substring(0, 100) + "..."}</p>
          <Link to={`/blog/${item.slug}`} className="btn btn-danger btn-sm read-more">Read More</Link>
        </div>
      </div>
    </Col>
  ))}
</Row>


          {/* Inline Styles */}
          <style>{`
            .blog-card {
              border-radius: 12px;
              overflow: hidden;
              background: #fff;
              transition: all 0.3s ease-in-out;
              display: flex;
              flex-direction: column;
              height: 100%;
            }

            .blog-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 10px 20px rgba(0,0,0,0.12);
            }

            .blog-img-wrapper {
              width: 100%;
              height: 220px;
              overflow: hidden;
              border-bottom: 1px solid #eee;
            }

            .blog-img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.5s;
            }

            .blog-card:hover .blog-img {
              transform: scale(1.08);
            }

            .blog-content {
              padding: 20px;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }

            .blog-category {
              font-size: 12px;
              color: #ff4d4f;
              font-weight: 600;
              margin-bottom: 5px;
            }

            .blog-date {
              font-size: 13px;
              color: #888;
              margin-bottom: 10px;
            }

            .blog-title {
              font-size: 18px;
              font-weight: 600;
              color: #333;
              text-decoration: none;
              margin-bottom: 10px;
            }

            .blog-title:hover {
              color: #ff4d4f;
            }

            .blog-desc {
              font-size: 14px;
              color: #555;
              margin-bottom: 15px;
              line-height: 1.5;
              flex: 1;
            }

            .read-more {
              align-self: flex-start;
              font-size: 13px;
              font-weight: 600;
              text-transform: uppercase;
              padding: 6px 12px;
            }

            @media (max-width: 768px) {
              .blog-img-wrapper {
                height: 180px;
              }
              .blog-title {
                font-size: 16px;
              }
              .blog-desc {
                font-size: 13px;
              }
            }
          `}</style>
        </div>
      </div>
    </>
  );
};

export default LatestNew;
