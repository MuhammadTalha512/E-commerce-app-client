import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div style={{ padding: "40px" }}>
      <Result
        status="warning"
        title="Payment Cancelled!"
        subTitle="Your payment was cancelled. You can try again."
        extra={[
          <Link to="/checkout" key="retry">
            <Button type="primary">Try Again</Button>
          </Link>,
        ]}
      />
    </div>
  );
};

export default PaymentCancel;
