import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Space, Card } from "antd";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${VITE_API_URL}/api/users/get-users`);
      setUsers(res.data.users);
    } catch (error) {
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${VITE_API_URL}/api/users/delete-user/${id}`);
      message.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const makeAdmin = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${VITE_API_URL}/api/users/make-admin/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success("User is now an Admin");
      fetchUsers();
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to update role");
    }
  };

  const makeUser = async(id)=>{

    try {

      const token = localStorage.getItem("token")

      await axios.put(`${VITE_API_URL}/api/users/make-user/${id}`,
        {},
        {headers:{Authorization: `Bearer ${token}`}}

      )
      message.success("Role Changed to User");
      fetchUsers()

    } catch (error) {
      message.error("falied") 
    }

  }

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (role) => (
        <span
          style={{
            fontWeight: 600,
            color: role === "admin" ? "red" : "green",
          }}
        >
          {role}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space>
          {record.role === "user" ? (
            <Popconfirm
              title="Make Admin?"
              onConfirm={() => makeAdmin(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Make Admin</Button>
            </Popconfirm>
          ):
          <Popconfirm
              title="Make User?"
              onConfirm={() => makeUser(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button>Make User</Button>
            </Popconfirm>          
            }
          <Popconfirm
            title="Delete User?"
            onConfirm={() => deleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="add-category-container add-product-container">
      <Card className="add-category-card add-product-card" bordered={false}>
        
        <h2 className="title ">All Users</h2>

        <Table
          columns={columns}
          dataSource={users}
          rowKey="_id"
          loading={loading}
          bordered
          style={{ marginTop: 20 }}
        />
      </Card>
    </div>
  );
};

export default AllUsers;
