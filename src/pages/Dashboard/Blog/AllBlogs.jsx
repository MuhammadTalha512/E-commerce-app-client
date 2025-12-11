import React, { useEffect, useState } from "react";
import { Card, Table, Tag, Button, Spin, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${VITE_API_URL}/api/blogs/get`);
      setBlogs(res.data.data || []);
    } catch (err) {
      message.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (slug) => {
    try {
      await axios.delete(`${VITE_API_URL}/api/blogs/${slug}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      message.success("Blog deleted successfully!");
      fetchBlogs();
    } catch (err) {
      message.error("Failed to delete blog");
    }
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      align: "center",
      render: (_, record) => (
        <img
          src={
            record.thumbnail ||
            record.bannerImage ||
            "https://via.placeholder.com/80"
          }
          alt="blog"
          style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 6 }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: 250,
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      align: "center",
      render: (a) => a || "N/A",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
      render: (c) => c || "-",
    },
    {
      title: "Reading Time",
      dataIndex: "readingTime",
      key: "readingTime",
      align: "center",
      render: (r) => r || "-",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      align: "center",
      render: (tags) =>
        tags?.length
          ? tags.map((tag, i) => (
              <Tag color="blue" key={i}>
                {tag}
              </Tag>
            ))
          : "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (s) => (
        <Tag color={s === "published" ? "green" : "orange"}>{s}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div className="d-flex justify-content-center gap-2">
          <Button
            type="primary"
            onClick={() =>
              navigate(`/dashboard/blog/add?slug=${record.slug}`)
            }
          >
            Update
          </Button>

          <Button danger onClick={() => deleteBlog(record.slug)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="add-category-container add-product-container">
      <Card className="add-category-card add-product-card" bordered={false}>
        
        {/* Center Heading */}
        <h2 className="title">All Blogs</h2>

        {loading ? (
          <div className="text-center py-5">
            <Spin size="large" tip="Loading blogs..." />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={blogs}
            rowKey="_id"
            scroll={{ x: "max-content" }}
            style={{ marginTop: "20px" }}
          />
        )}
      </Card>
    </div>
  );
};

export default AllBlogs;
