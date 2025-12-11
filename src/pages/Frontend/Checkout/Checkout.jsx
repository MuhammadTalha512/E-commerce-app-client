import React, { useState } from "react";
import {Card,Row,Col,Input,Form,Radio,Divider,Button,message,} from "antd";
import { useCartContext } from "../../../contexts/CartContext";
import Toastify from "../../../components/message";
import {UserOutlined,MailOutlined,PhoneOutlined,EnvironmentOutlined,HomeOutlined,CreditCardOutlined,ShoppingCartOutlined,} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import axios from "axios";

const initialFormState = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  address: "",
};

const cardStyle = {
  borderRadius: "16px",
  padding: "15px",
  boxShadow: "0 6px 25px rgba(0, 0, 0, 0.10)",
  border: "1px solid #f1f1f1",
  background: "white",
};

const titleStyle = {
  fontWeight: "700",
  fontSize: "20px",
  paddingBottom: "10px",
};

const Checkout = () => {
  const { cart, setCart } = useCartContext(); 
  const { state } = useLocation();
  console.log(cart)
  const productFromState = state?.product;
  const qtyFromState = state?.qty || 1;

  const [payment, setPayment] = useState("cod");
  const [formState, setFormState] = useState(initialFormState);

  const totalAmount = productFromState
    ? productFromState.price * qtyFromState
    : cart.reduce((sum, item) => sum + (item.price) * item.qty, 0);

  const handleChange = (e) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {

      if (!productFromState && cart.length === 0) {
    message.error("No product found! Please add a product before placing an order.");
    return;
  }
  
    const { fullName, email, phone, city, address } = formState;

    const trimmed = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      address: address.trim(),
    };

    if (!trimmed.fullName || !trimmed.email || !trimmed.phone || !trimmed.city || !trimmed.address) {
      Toastify("Please fill in all required fields", "error");
      return;
    }

    const items = productFromState
      ? [{ ...productFromState, qty: qtyFromState }]
      : cart.map((item) => ({
          ...item.product,
          qty: item.qty,
        }));

    const orderData = {
      ...trimmed,
      paymentMethod: payment,
      items,
      totalAmount,
    };

    try {
      const res = await axios.post(`${VITE_API_URL}/api/create-order`, orderData);

      if (!res.data.success) {
        message.error(res.data.message);
        return;
      }

      setFormState(initialFormState); 
      if (!productFromState) setCart([]);

      message.success(res.data.message);

      // COD or Bank Transfer → no Stripe
      if (payment === "cod" || payment === "bank") return;

      // Stripe Checkout
      if (payment === "card") {
        const sessionRes = await axios.post(`${VITE_API_URL}/api/create-stripe-session`, { items });
        if (sessionRes.data.url) {
          window.location.href = sessionRes.data.url;
          return;
        } else {
          message.error("Stripe session creation failed!");
        }
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  return (
    <div style={{ padding: "30px", background: "#fafafa" }}>
      <Row gutter={[25, 25]}>
        {/* LEFT SIDE - Customer Info */}
        <Col xs={24} md={16}>
          <Card title="Customer Information" bordered={false} style={cardStyle} headStyle={titleStyle}>
            <Form layout="vertical">
              <Form.Item label="Full Name" required>
                <Input
                  name="fullName"
                  value={formState.fullName}
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  style={{ borderRadius: "10px" }}
                />
              </Form.Item>
              <Form.Item label="Email Address" required>
                <Input
                  name="email"
                  value={formState.email}
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  style={{ borderRadius: "10px" }}
                />
              </Form.Item>
              <Form.Item label="Phone Number" required>
                <Input
                  name="phone"
                  value={formState.phone}
                  size="large"
                  prefix={<PhoneOutlined />}
                  placeholder="03xx-xxxxxxx"
                  onChange={handleChange}
                  style={{ borderRadius: "10px" }}
                />
              </Form.Item>
            </Form>
          </Card>

          <Divider />

          <Card title="Delivery Address" bordered={false} style={cardStyle} headStyle={titleStyle}>
            <Form layout="vertical">
              <Form.Item label="City" required>
                <Input
                  name="city"
                  value={formState.city}
                  size="large"
                  prefix={<EnvironmentOutlined />}
                  placeholder="Enter your city"
                  onChange={handleChange}
                  style={{ borderRadius: "10px" }}
                />
              </Form.Item>
              <Form.Item label="Full Address" required>
                <Input.TextArea
                  name="address"
                  value={formState.address}
                  rows={3}
                  placeholder="House #, Street, Area"
                  onChange={handleChange}
                  style={{ borderRadius: "10px", padding: "10px" }}
                />
              </Form.Item>
            </Form>
          </Card>

          <Divider />

          <Card title="Payment Method" bordered={false} style={cardStyle} headStyle={titleStyle}>
            <Radio.Group
              onChange={(e) => setPayment(e.target.value)}
              value={payment}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <Radio value="cod"><HomeOutlined /> Cash on Delivery</Radio>
              <Radio value="card"><CreditCardOutlined /> Credit / Debit Card</Radio>
              <Radio value="bank"><CreditCardOutlined /> Bank Transfer</Radio>
            </Radio.Group>
          </Card>
        </Col>

        {/* RIGHT SIDE - Order Summary */}
        <Col xs={24} md={8}>
          <Card
            title="Order Summary"
            bordered={false}
            style={{ ...cardStyle, position: "sticky", top: "20px" }}
            headStyle={titleStyle}
          >
            <div style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "5px" }}>
              {productFromState ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    paddingBottom: "8px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <img
                    src={productFromState.image}
                    alt={productFromState.title}
                    style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "6px", marginRight: "10px" }}
                  />
                  <span style={{ fontWeight: 500 }}>
                    {productFromState.title} × {qtyFromState}
                  </span>
                  <span style={{ color: "#ff6f61", fontWeight: 700 }}>
                    Rs {productFromState.price * qtyFromState}
                  </span>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "15px",
                      paddingBottom: "8px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "6px", marginRight: "10px" }}
                    />
                    <span style={{ fontWeight: 500 }}>
                      {item.title} × {item.qty}
                    </span>
                    <span style={{ color: "#ff6f61", fontWeight: 700 }}>
                      Rs {(item.price || item.price) * item.qty}
                    </span>
                  </div>
                ))
              )}
            </div>

            <Divider />

            <h3 style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", fontWeight: "700" }}>
              <span>Total:</span>
              <span style={{ color: "#ff3d3d" }}>Rs {totalAmount}</span>
            </h3>

            <Button
              type="primary"
              size="large"
              block
              icon={<ShoppingCartOutlined />}
              style={{
                marginTop: "20px",
                backgroundColor: "#ff6f61",
                borderRadius: "12px",
                height: "50px",
                fontSize: "17px",
                fontWeight: "700",
              }}
              onClick={handleSubmit}
            >
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
