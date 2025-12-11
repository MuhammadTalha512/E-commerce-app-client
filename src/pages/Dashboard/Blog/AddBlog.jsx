import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Select, Row, Col, message, Upload } from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { TextArea } = Input;

const AddBlog = () => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  // Read slug from URL (Edit mode)
  const slug = new URLSearchParams(location.search).get("slug");

  // Slug generator
  const slugify = (text) =>
    text.toString().toLowerCase().trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");

  // Fetch blog for update
  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${VITE_API_URL}/api/blogs/${slug}`);
      const data = res.data.data;

      // Set form fields
      form.setFieldsValue({
        title: data.title,
        shortDescription: data.shortDescription,
        description: data.description,
        category: data.category,
        readingTime: data.readingTime,
        status: data.status,
        author: data.author,
      });

      setTags(data.tags || []);
    } catch (err) {
      console.log("Fetch error →", err);
      message.error("Failed to load blog data");
    }
  };

  useEffect(() => {
    if (slug) fetchBlog();
  }, [slug]);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("slug", slug || slugify(values.title));
      formData.append("shortDescription", values.shortDescription || "");
      formData.append("description", values.description);
      formData.append("category", values.category || "");
      formData.append("readingTime", values.readingTime || "");
      formData.append("tags", tags.join(","));
      formData.append("status", values.status || "draft");
      formData.append("author", values.author || "");

      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
      if (bannerFile) formData.append("bannerImage", bannerFile);

      if (slug) {
        // UPDATE BLOG
        await axios.put(`${VITE_API_URL}/api/blogs/${slug}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        });

        message.success("Blog updated successfully!");
      } else {
        // CREATE BLOG
        await axios.post(`${VITE_API_URL}/api/blogs/create`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        });

        message.success("Blog created successfully!");
      }

      navigate("/dashboard/blog/all");
    } catch (err) {
      console.error("Error →", err.response || err);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-blog-container add-product-container">
      <Card className="add-blog-card" bordered={false}>
        <h2 className="title mb-4">{slug ? "Update Blog" : "Create New Blog"}</h2>

        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Row gutter={16}>

            <Col xs={24} md={12}>
              <Form.Item label="Title" name="title" rules={[{ required: true }]}>
                <Input size="large" placeholder="Enter blog title" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Category" name="category">
                <Input size="large" placeholder="Enter category" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Short Description" name="shortDescription">
                <TextArea rows={2} />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Reading Time" name="readingTime">
                <Input placeholder="E.g. 5 min" />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                <TextArea rows={6} placeholder="Full blog content" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Tags">
                <Select mode="tags" value={tags} onChange={setTags} placeholder="Add tags" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Status" name="status">
                <Select>
                  <Select.Option value="draft">Draft</Select.Option>
                  <Select.Option value="published">Published</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Thumbnail">
                <Upload beforeUpload={(f) => { setThumbnailFile(f); return false; }} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Select Thumbnail</Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Banner Image">
                <Upload beforeUpload={(f) => { setBannerFile(f); return false; }} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Select Banner</Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Author" name="author">
                <Input placeholder="Author name" />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Button type="primary" htmlType="submit" loading={loading}>
                {slug ? "Update Blog" : "Create Blog"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default AddBlog;
