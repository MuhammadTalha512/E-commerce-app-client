import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
    });
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${VITE_API_URL}/api/blogs/get`);
      setBlogs(res.data.data || []);
    } catch (err) {
      console.error("Fetch blogs error →", err);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">Blog</h2>
      <Row gutter={[24, 24]}>
        {blogs.map((blog) => (
          <Col xs={24} sm={12} md={8} key={blog._id}>
            <div className="blog-card" data-aos="fade-up">
              <img
                src={blog.bannerImage || blog.thumbnail || "https://via.placeholder.com/300"}
                alt={blog.title}
                className="blog-img"
              />
              <div className="blog-content">
                <p className="blog-date">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <Link className="blog-title">{blog.title}</Link>
                <p className="blog-desc">
                  {blog.shortDescription || blog.description?.substring(0, 100) + "..."}
                </p>
                <Link to={`/blog/${blog.slug}`} className="btn btn-danger btn-sm read-more">Read More</Link>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <style>{`
        .blog-card {
          display: flex;
          flex-direction: column;
          border: 1px solid #eee;
          border-radius: 10px;
          overflow: hidden;
          transition: 0.3s ease-in-out;
          background: #fff;
          height: 100%; /* ensures full height in column */
        }

        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 5px 18px rgba(0, 0, 0, 0.1);
        }

        .blog-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .blog-content {
          padding: 18px;
          flex: 1; /* ensures content takes remaining space */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .blog-date {
          font-size: 14px;
          color: #ff4d4f;
          margin-bottom: 6px;
        }

        .blog-title {
          font-weight: 600;
          text-decoration: none;
          font-size: 18px;
          color: #333;
          margin-bottom: 10px;
        }

        .blog-title:hover {
          color: #ff4d4f;
        }

        .blog-desc {
          font-size: 14px;
          color: #555;
          margin-bottom: 15px;
          flex-grow: 1; /* makes description flexible */
        }

        .btn {
          align-self: flex-start;
        }
      `}</style>
    </div>
  );
};

export default Blog;
