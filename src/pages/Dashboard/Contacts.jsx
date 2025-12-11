import React, { useEffect, useState } from "react";
import { Table, message, Spin, Button } from "antd";
import axios from "axios";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/get-contact");
      setContacts(res.data.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch contacts. Check your API endpoint.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete-contact/${id}`);
      message.success("Contact deleted successfully");
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (error) {
      console.error(error);
      message.error("Failed to delete contact");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name", align:"center", key: "name" },
    { title: "Email", dataIndex: "email",align:"center", key: "email" },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      align:"center",
      render: (text) => (
        <p className="contact-message">{text}</p>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align:"center",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      align:"center",
      render: (_, record) => (
        <Button
          danger
          className="contact-delete-btn"
          onClick={() => handleDelete(record._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="container py-5">
      <h2 className=" fw-bold mb-4">All Contacts</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={contacts.map((item) => ({ ...item, key: item._id }))}
          bordered
          pagination={{ pageSize: 5 }}
          rowClassName="contact-row"
        />
      )}
    </div>
  );
};

export default Contacts;
