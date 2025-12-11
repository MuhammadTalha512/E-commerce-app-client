import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, message, Table, Popconfirm } from "antd";
import axios from "axios";

const { TextArea } = Input;
const VITE_API_URL = import.meta.env.VITE_API_URL || "";

export default function AddCategory() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${VITE_API_URL}/api/categories/get-categories`);
      setCategory(res.data || []);
    } catch (err) {
      console.error("Get categories error →", err);
      message.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${VITE_API_URL}/api/categories/delete-category/${id}`);
      message.success("Category deleted successfully");
      fetchCategories();
    } catch (err) {
      console.error("Delete category error →", err);
      message.error("Failed to delete category");
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${VITE_API_URL}/api/categories/add-category`,
        values
      );

      message.success(res.data?.message || "Category added successfully");
      form.resetFields();
      fetchCategories();
    } catch (err) {
      console.error("Add category error →", err);
      message.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      responsive: ["xs","sm","md","lg"],
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      responsive:["sm","md","lg"],
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      responsive:["xs","sm","md","lg"],
      render: (_, record) => (
        <Popconfirm
          title="Delete this category?"
          onConfirm={() => deleteCategory(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="add-category-container add-product-container">
      <Card className="add-category-card add-product-card" bordered={false}>
        <h2 className="title">Add New Category</h2>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="row">
            <div className="col-md-8 col-12">
              <Form.Item
                label="Category Name"
                name="name"
                rules={[{ required: true, message: "Category name is required!" }]}
              >
                <Input placeholder="Enter category name" size="large" />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <TextArea rows={5} placeholder="Enter category description" />
              </Form.Item>
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
          >
            Add Category
          </Button>
        </Form>

        <h3 style={{ marginTop: "30px" }}>All Categories</h3>

        <Table
          columns={columns}
          dataSource={category}
          rowKey="_id"
          scroll={{x:"max-content"}}
          style={{ marginTop: "15px" }}
        />
      </Card>
    </div>
  );
}
