import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, Card, Spin, Modal } from "antd";
import { Table, Popconfirm, message, Image } from "antd";

const Banner = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editPreview, setEditPreview] = useState("");
  const [editImage, setEditImage] = useState(null);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  // ================= Add Banner ==================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!title || !image) {
      alert("Title & Banner Image Required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("image", image);

    try {
      await axios.post(`${VITE_API_URL}/api/banner/add-banner`, formData);

      alert("Banner Added Successfully!");

      setTitle("");
      setLink("");
      setImage(null);
      setPreview("");
      fetchBanners();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  // ================= Fetch Banners ==================
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${VITE_API_URL}/api/banner/get-banners`);
      setBanners(res.data || []);
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  // ================= Delete Banner ==================
  const deleteBanner = async (id) => {
    try {
      await axios.delete(`${VITE_API_URL}/api/banner/delete-banner/${id}`);
      message.success("Banner Deleted successfully");
      fetchBanners();
    } catch (error) {
      message.error("Delete failed");
    }
  };

  // ================= Edit Image Handler ==================
  const handleEditImage = (e) => {
    const file = e.target.files[0];
    setEditImage(file);
    setEditPreview(URL.createObjectURL(file));
  };

  // ================= Update Banner ==================
  const updateBanner = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", editData.title);
      formData.append("link", editData.link);
      if (editImage) formData.append("image", editImage);

      await axios.put(
        `${VITE_API_URL}/api/banner/update-banner/${editData._id}`,
        formData
      );

      message.success("Banner Updated Successfully");
      setIsModalOpen(false);
      setEditImage(null);
      fetchBanners();
    } catch (error) {
      console.error(error);
      message.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= Table Columns ==================
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
      render: (img) => (
        <Image
          width={60}
          height={60}
          src={img}
          style={{
            borderRadius: 10,
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      align: "center",
    },
    {
      title: "Link",
      dataIndex: "link",
      align: "center",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Actions",
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          {/* Open Modal */}
          <Button
            type="primary"
            onClick={() => {
              setEditData(record);
              setEditPreview(record.image);
              setIsModalOpen(true);
            }}
          >
            Update
          </Button>

          <Popconfirm
            title="Delete Banner"
            onConfirm={() => deleteBanner(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* ADD BANNER FORM */}
      <div className="add-category-container add-product-container">
        <Card className="add-category-card add-product-card" bordered={false}>
          <h2 className="title">Add New Banner</h2>

          <div className="row g-4 mt-3">
            <div className="col-md-6">
              <Input
                placeholder="Banner Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="large"
                className="mb-3"
              />

              <Input
                placeholder="Redirect Link (optional)"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                size="large"
                className="mb-3"
              />

              <Input
                type="file"
                size="large"
                onChange={handleImageChange}
                className="mb-3"
              />

              <Button type="primary" size="large" block onClick={handleSubmit}>
                Add Banner
              </Button>
            </div>

            <div className="col-md-6 d-flex justify-content-center align-items-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="img-fluid rounded border shadow-sm"
                  style={{
                    height: "250px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center border rounded bg-light text-muted"
                  style={{ height: "250px", width: "100%" }}
                >
                  Banner Preview
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* ALL BANNERS TABLE */}
      <div style={{ padding: 20, display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "90%" }}>
          <h2 className="text-center mb-4">All Banners</h2>

          <Spin spinning={loading}>
            <Table
              columns={columns}
              dataSource={banners}
              rowKey="_id"
              bordered
              pagination={{ pageSize: 5 }}
            />
          </Spin>
        </Card>
      </div>

      {/* UPDATE MODAL */}
      <Modal
        title="Update Banner"
        open={isModalOpen}
        onOk={updateBanner}
        onCancel={() => setIsModalOpen(false)}
        okText="Update"
        width={600}
      >
        {editData && (
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="Title">Title :</label>
              <Input
                placeholder="Banner Title"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                size="large"
                className="mb-3"
              />
              <label htmlFor="Title">Link :</label>
              <Input
                placeholder="Redirect Link"
                value={editData.link}
                onChange={(e) =>
                  setEditData({ ...editData, link: e.target.value })
                }
                size="large"
                className="mb-3"
              />
             <label htmlFor="Title">Image :</label>
              <Input type="file" size="large" onChange={handleEditImage} />
            </div>

            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <img
                src={editPreview}
                alt="Edit Preview"
                className="img-fluid rounded border"
                style={{
                  height: "200px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Banner;
