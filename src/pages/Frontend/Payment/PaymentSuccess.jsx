import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div style={{ padding: "40px" }}>
      <Result
        status="success"
        title="Payment Successful!"
        subTitle="Thank you! Your order has been placed successfully."
        extra={[
          <Link to="/" key="home">
            <Button type="primary">Go to Home</Button>
          </Link>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;
