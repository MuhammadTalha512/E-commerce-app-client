import React, { useEffect, useState } from "react";
import { Card, Form, Input, InputNumber, Select, Button, Upload, Checkbox, message, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;

const AddProducts = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [additionalImages, setAdditionalImages] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${VITE_API_URL}/api/categories/get-categories`);
        setCategories(res.data);
      } catch (err) {
        console.log("Category API Error →", err);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = ({ fileList }) => {
    setFileList(fileList.slice(-1));
    if (fileList.length > 0 && fileList[0].originFileObj) {
      setImagePreview(URL.createObjectURL(fileList[0].originFileObj));
    } else setImagePreview(null);
  };

  const handleAdditionalImages = ({ fileList }) => {
    setAdditionalImages(fileList);
  };

  const onFinish = async (values) => {
    if (!fileList.length || !fileList[0].originFileObj) {
      message.error("Please upload the main image!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("fullDescription", values.fullDescription || "");
      formData.append("price", values.price);
      formData.append("salePrice", values.salePrice || "");
      formData.append("stock", values.stock);
      formData.append("inStock", values.inStock ? true : false);
      formData.append("category", values.category);
      formData.append("brand", values.brand || "");
      formData.append("rating", values.rating || 0);
      formData.append("reviewsCount", values.reviewsCount || 0);
      formData.append("tags", values.tags || "");
      formData.append("sizes", JSON.stringify(values.sizes || []));
      formData.append("image", fileList[0].originFileObj);

      additionalImages.forEach((file) => {
        if (file.originFileObj) formData.append("images", file.originFileObj);
      });

      const token = localStorage.getItem("token")

      const res = await axios.post(`${VITE_API_URL}/api/products/add-product`, formData, {
        headers: { Authorization:`Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      message.success(res.data?.message || "Product added successfully!");
      form.resetFields();
      setFileList([]);
      setAdditionalImages([]);
      setImagePreview(null);
    } catch (err) {
      console.error("Add product error →", err);
      message.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="add-product-container">
      <Card className="add-product-card" variant="outlined">
        <h2 className="title">Add New Product</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="row">
            {/* LEFT SIDE */}
            <div className="col-md-8 col-12">
              <Form.Item
                label="Product Title"
                name="title"
                rules={[{ required: true, message: "Title is required!" }]}
              >
                <Input placeholder="Enter product name" size="large" />
              </Form.Item>

              <Form.Item
                label="Short Description"
                name="description"
                rules={[{ required: true, message: "Description is required!" }]}
              >
                <TextArea rows={3} placeholder="Enter short description" />
              </Form.Item>

              <Form.Item label="Full Description" name="fullDescription">
                <TextArea rows={5} placeholder="Enter full description" />
              </Form.Item>

              <div className="row">
                <div className="col-md-6 col-12">
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: "Price is required!" }]}
                  >
                    <InputNumber min={1} className="w-100" size="large" placeholder="Enter price" />
                  </Form.Item>
                </div>

                <div className="col-md-6 col-12">
                  <Form.Item label="Sale Price" name="salePrice">
                    <InputNumber min={1} className="w-100" size="large" placeholder="Enter sale price" />
                  </Form.Item>
                </div>
              </div>

              <Form.Item
                label="Stock Quantity"
                name="stock"
                rules={[{ required: true, message: "Stock is required!" }]}
              >
                <InputNumber min={0} className="w-100" size="large" placeholder="Stock quantity" />
              </Form.Item>

              <Form.Item name="inStock" valuePropName="checked">
                <Checkbox>In Stock</Checkbox>
              </Form.Item>

              <Form.Item label="Brand" name="brand">
                <Input placeholder="Enter brand name" />
              </Form.Item>

              <Form.Item label="Rating" name="rating">
                <InputNumber min={0} max={5} className="w-100" placeholder="Rating 0-5" />
              </Form.Item>

              <Form.Item label="Reviews Count" name="reviewsCount">
                <InputNumber min={0} className="w-100" placeholder="Total reviews" />
              </Form.Item>

              <Form.Item label="Tags (comma separated)" name="tags">
                <Input placeholder="New Arrival, Best Seller" />
              </Form.Item>

              <Form.Item label="Sizes" name="sizes">
                <Checkbox.Group options={["S", "M", "L", "XL"]} />
              </Form.Item>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-md-4 col-12">
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Choose category!" }]}
              >
                <Select size="large" placeholder="Select category" loading={!categories.length}>
                  {categories.map((cat) => (
                    <Select.Option key={cat._id} value={cat._id}>
                      {cat.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* MAIN IMAGE */}
              <Form.Item label="Main Image" name="image" rules={[{ required: true }]}>
                <Upload
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false}
                  onChange={handleImageChange}
                  fileList={fileList}
                  accept="image/*"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 100,
                      height: 100,
                      border: "1px dashed #d9d9d9",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    <PlusOutlined style={{ fontSize: 24 }} />
                  </div>
                </Upload>
              </Form.Item>

              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="preview"
                  style={{
                    marginTop: 10,
                    width: "100%",
                    maxHeight: 200,
                    objectFit: "cover",
                    borderRadius: 4,
                    border: "1px solid #d9d9d9",
                  }}
                />
              )}

              {/* ADDITIONAL IMAGES */}
              <Form.Item label="Additional Images">
                <Upload
                  listType="picture"
                  multiple
                  beforeUpload={() => false}
                  onChange={handleAdditionalImages}
                  fileList={additionalImages}
                  accept="image/*"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 100,
                      height: 100,
                      border: "1px dashed #d9d9d9",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    <PlusOutlined style={{ fontSize: 24 }} />
                  </div>
                </Upload>
              </Form.Item>
            </div>
          </div>

          <Button type="primary" size="large" htmlType="submit" style={{ marginTop: 10 }}>
            Add Product
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddProducts;
