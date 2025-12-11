import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Tag, Form, Input, Button, message } from "antd";

const VITE_API_URL = import.meta.env.VITE_API_URL || "";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form] = Form.useForm();

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${VITE_API_URL}/api/blogs/${slug}`);
      setBlog(res.data.data); // backend returns data inside "data"
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const handleCommentSubmit = async (values) => {
    setSubmitting(true);
    try {
      const res = await axios.post(`${VITE_API_URL}/api/blogs/${slug}/comment`, values);
      
      // Assuming backend returns the saved comment
      setBlog((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), res.data.data],
      }));

      message.success("Comment submitted successfully!");
      form.resetFields();
    } catch (error) {
      console.error("Error submitting comment:", error);
      message.error("Failed to submit comment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!blog) {
    return <h2 className="text-center mt-20 text-red-500">Blog not found</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">

  {/* Banner Image */}
  {blog.bannerImage && (
    <div className="overflow-hidden rounded-2xl shadow-xl mb-8">
      <img
        src={
          blog.bannerImage
            ? `${VITE_API_URL}/${blog.bannerImage}`
            : `${VITE_API_URL}/${blog.thumbnail}`
        }
        alt={blog.title}
        className="w-full max-h-[450px] object-cover hover:scale-105 transition-all duration-500"
      />
    </div>
  )}

  {/* Title */}
  <h1 className="text-4xl font-extrabold leading-tight mb-4 text-gray-900">
    {blog.title}
  </h1>

  {/* Meta Info */}
  <div className="flex flex-wrap gap-4 text-gray-600 mb-6 text-sm">
    <span className="bg-gray-100 px-3 py-1 rounded-full">👤 {blog.author}</span>
    <span className="bg-gray-100 px-3 py-1 rounded-full">⏱ {blog.readingTime}</span>
    <span className="bg-gray-100 px-3 py-1 rounded-full">
      📅 {new Date(blog.createdAt).toLocaleDateString()}
    </span>
    <span className="bg-gray-100 px-3 py-1 rounded-full">👁 {blog.views} views</span>
  </div>

  {/* Tags */}
  <div className="flex gap-2 flex-wrap mb-6">
    {blog.tags?.map((tag, i) => (
      <Tag key={i} color="blue" className="text-md py-1 px-3 rounded-full">
        {tag}
      </Tag>
    ))}
  </div>

  {/* Description */}
  <div
    className="prose prose-lg max-w-none leading-relaxed text-gray-800"
    dangerouslySetInnerHTML={{ __html: blog.description }}
  ></div>

  {/* Divider */}
  <div className="border-t my-10"></div>

  {/* Comments Section */}
  <h2 className="text-3xl font-bold mb-4">Comments</h2>

  {blog.comments?.length > 0 ? (
    blog.comments.map((cmt, index) => (
      <div key={index} className="p-4 mb-4 bg-gray-50 rounded-lg shadow-sm">
        <p className="font-semibold text-gray-900">{cmt.name}</p>
        <p className="text-gray-500 text-sm">{cmt.email}</p>
        <p className="mt-2">{cmt.comment}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No comments yet.</p>
  )}

  {/* Comment Form */}
  <div className="py-6 my-5 mx-5 bg-white shadow-xl rounded-xl">
    <h3 className="text-2xl font-semibold my-5 mx-5 mb-4">Add a Comment</h3>

    <Form layout="vertical" form={form} onFinish={handleCommentSubmit}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input size="large" placeholder="Your name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true }, { type: "email" }]}
      >
        <Input size="large" placeholder="Your email" />
      </Form.Item>

      <Form.Item name="comment" label="Comment" rules={[{ required: true }]}>
        <Input.TextArea rows={4} size="large" placeholder="Write your comment..." />
      </Form.Item>

      <Button type="primary" htmlType="submit" size="large" loading={submitting}>
        Submit Comment
      </Button>
    </Form>
  </div>
</div>
  );
}
