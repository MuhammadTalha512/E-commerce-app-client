import React, { useState, useEffect } from "react";
import {Table,Image,Tag,Button,Modal,Input,Select,message,Upload,Space,InputNumber,Switch} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useProductContext } from "../../../contexts/ProductContext";
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input;

const AllProducts = () => {
  const { products, deleteProduct, updateProduct } = useProductContext();
  const [editingProduct, setEditingProduct] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [file, setFile] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${VITE_API_URL}/api/categories/get-categories`);
      setCategories(res.data || []);
    } catch (err) {
      console.error("Get categories error →", err);
      message.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Open modal and load product values
  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormValues({
      title: product.title,
      description: product.description,
      fullDescription: product.fullDescription,
      price: product.price,
      salePrice: product.salePrice,
      stock: product.stock,
      category: product.category?._id || "",
      brand: product.brand,
      rating: product.rating,
      reviewsCount: product.reviewsCount,
      tags: product.tags?.join(", "),
      sizes: product.sizes?.join(", "),
      inStock: product.inStock,
    });

    setFile(null);
    setAdditionalImages([]);
  };

  // UPDATE PRODUCT
  const handleUpdate = async () => {
    if (!editingProduct) return;

    const formData = new FormData();

    Object.entries(formValues).forEach(([key, val]) => {
      formData.append(key, val);
    });

    if (file) formData.append("image", file);

    additionalImages.forEach((img) => {
      if (img.originFileObj) {
        formData.append("images", img.originFileObj);
      }
    });

    try {
      await updateProduct(editingProduct._id, formData);
      setEditingProduct(null);
      setFile(null);
      setAdditionalImages([]);
    } catch (error) {
      console.error(error);
    }
  };

  // Table Columns
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
      render: (img) => (
        <Image src={img} width={60} height={60} style={{ objectFit: "cover" }} />
      ),
    },
    { title: "Title", dataIndex: "title", align: "center" },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      render: (name) => <Tag color="blue">{name}</Tag>,
      align: "center",
    },
    { title: "Price", dataIndex: "price", align: "center", render: (p) => `Rs ${p}` },
    { title: "Sale Price", dataIndex: "salePrice", align: "center", render: (p) => `Rs ${p}` },
    { title: "Stock", dataIndex: "stock", align: "center" },
    {
      title: "Actions",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => openEditModal(record)}>Edit</Button>
          <Button danger onClick={() => deleteProduct(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>All Products</h2>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="_id"
        bordered
        scroll={{ x: "max-content" }}
      />

      {/* EDIT MODAL */}
      <Modal
        title="Edit Product"
        open={!!editingProduct}
        onCancel={() => {
          setEditingProduct(null);
          setFile(null);
          setAdditionalImages([]);
        }}
        onOk={handleUpdate}
        width={600}
      >
        <Input
          placeholder="Title"
          value={formValues.title || ""}
          onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
          style={{ marginBottom: 10 }}
        />

        <TextArea
          placeholder="Short Description"
          value={formValues.description || ""}
          onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
          rows={3}
          style={{ marginBottom: 10 }}
        />

        <TextArea
          placeholder="Full Description"
          value={formValues.fullDescription || ""}
          onChange={(e) => setFormValues({ ...formValues, fullDescription: e.target.value })}
          rows={4}
          style={{ marginBottom: 10 }}
        />

        <InputNumber
          placeholder="Price"
          value={formValues.price}
          onChange={(val) => setFormValues({ ...formValues, price: val })}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <InputNumber
          placeholder="Sale Price"
          value={formValues.salePrice}
          onChange={(val) => setFormValues({ ...formValues, salePrice: val })}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <InputNumber
          placeholder="Stock"
          value={formValues.stock}
          onChange={(val) => setFormValues({ ...formValues, stock: val })}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <Select
          placeholder="Select Category"
          value={formValues.category}
          onChange={(value) => setFormValues({ ...formValues, category: value })}
          style={{ width: "100%", marginBottom: 10 }}
        >
          {categories.map((cat) => (
            <Option key={cat._id} value={cat._id}>{cat.name}</Option>
          ))}
        </Select>

        <Input
          placeholder="Brand"
          value={formValues.brand}
          onChange={(e) => setFormValues({ ...formValues, brand: e.target.value })}
          style={{ marginBottom: 10 }}
        />

        <InputNumber
          placeholder="Rating"
          value={formValues.rating}
          onChange={(v) => setFormValues({ ...formValues, rating: v })}
          min={0}
          max={5}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <InputNumber
          placeholder="Reviews Count"
          value={formValues.reviewsCount}
          onChange={(v) => setFormValues({ ...formValues, reviewsCount: v })}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <Input
          placeholder="Tags (comma separated)"
          value={formValues.tags}
          onChange={(e) => setFormValues({ ...formValues, tags: e.target.value })}
          style={{ marginBottom: 10 }}
        />

        <Input
          placeholder="Sizes (comma separated)"
          value={formValues.sizes}
          onChange={(e) => setFormValues({ ...formValues, sizes: e.target.value })}
          style={{ marginBottom: 10 }}
        />

        <div style={{ marginBottom: 10 }}>
          <span>In Stock:</span>
          <Switch
            checked={formValues.inStock}
            onChange={(val) => setFormValues({ ...formValues, inStock: val })}
            style={{ marginLeft: 10 }}
          />
        </div>

        <Upload beforeUpload={(f) => { setFile(f); return false; }}>
          <Button icon={<UploadOutlined />}>Upload Main Image</Button>
        </Upload>

        <Upload
          multiple
          beforeUpload={() => false}
          onChange={({ fileList }) => setAdditionalImages(fileList)}
          style={{ marginTop: 10 }}
        >
          <Button icon={<UploadOutlined />}>Upload Additional Images</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default AllProducts;
