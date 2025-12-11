import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Popconfirm, Table, message } from "antd";
import DownloadCSV from "../../components/DownloadCSV";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get(`${VITE_API_URL}/api/get-subscribers`);

      if (res.data.success) {
        setSubscribers(res.data.data);
      }
    } catch (error) {
      message.error("Failed to load subscribers");
    }
  };

  const deleteSubscriber = async(id) =>{
     try {
      await axios.delete(`${VITE_API_URL}/api/delete-subscriber/${id}`);
      message.success("Subscriber deleted");
      fetchSubscribers()
     } catch (error) {
      message.error("Deleted failed")      
     }
  }

  const exportCSV =() =>{
    const headers =   ["Email", "Subscribed On"];
    const rows = subscribers.map((s) =>[
      s.email,
      dayjs(s.createdAt).format("DD MMM YYYY, hh:mm A")
    ])
    let csv = headers.join(",") + "\n";
    rows.forEach((row)  =>{
      csv += row.join(",") + "\n";
    })
    
    const blob = new Blob([csv], {type: "text/csv"});

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      align:"center",
      key: "email",
    },
    {
  title: "Subscribed On",
  dataIndex: "createdAt",
  align:"center",
  key: "createdAt",
  render: (date) => {
    if (!date) return "-";

    return dayjs(date).format("DD MMM YYYY, hh:mm A");
  },
},
{
      title: "Action",
      align:"center",
      render: (_, item) => (
        <Popconfirm
          title="Delete subscriber?"
          onConfirm={() => deleteSubscriber(item._id)}
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },

  ];

  return (
    <div className="add-category-container add-product-container">
      <Card className="add-category-card add-product-card" bordered={false}>
        
        <h2 className="title">Subscribers List</h2>
     <DownloadCSV data={subscribers} fileName="subscribers.csv">
            <Button type="primary">Download CSV</Button>
         </DownloadCSV>
        <Table
          columns={columns}
          dataSource={subscribers}
          rowKey="_id"
          scroll={{ x: "max-content" }}
          style={{ marginTop: "15px" }}
        />
      </Card>
    </div>
  );
};

export default Subscribers;
