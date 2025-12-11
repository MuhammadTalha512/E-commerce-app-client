import React from "react";
import { Collapse, Card } from "antd";

const { Panel } = Collapse;

const FAQs = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Frequently Asked Questions (FAQs)</h2>

      <Card
        bordered={false}
        style={{
          background: "#fafafa",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Collapse accordion>
          <Panel header="1. How can I place an order?" key="1">
            <p>
              To place an order, simply browse our products, add your favorite items to the cart,
              and proceed to checkout. You’ll receive a confirmation email after completing your
              purchase.
            </p>
          </Panel>

          <Panel header="2. What payment methods do you accept?" key="2">
            <p>
              We accept major payment options including Visa, MasterCard, PayPal, and Cash on
              Delivery (for selected areas).
            </p>
          </Panel>

          <Panel header="3. Can I track my order?" key="3">
            <p>
              Yes! Once your order is shipped, you’ll receive a tracking link via email or SMS to
              monitor your delivery status in real time.
            </p>
          </Panel>

          <Panel header="4. How long does delivery take?" key="4">
            <p>
              Standard delivery usually takes 3–5 business days depending on your location. Express
              delivery options are also available at checkout.
            </p>
          </Panel>

          <Panel header="5. What is your return policy?" key="5">
            <p>
              We offer a 7-day return policy for unused and undamaged products with original
              packaging. Please contact our support team to initiate a return.
            </p>
          </Panel>

          <Panel header="6. How do I contact customer support?" key="6">
            <p>
              You can reach our friendly support team anytime at{" "}
              <a href="mailto:support@babystyle.com">support@babystyle.com</a> or through the contact
              form on our website.
            </p>
          </Panel>

          <Panel header="7. Do you offer discounts or promotions?" key="7">
            <p>
              Yes! We frequently run flash sales and exclusive promotions. Subscribe to our
              newsletter or follow us on social media to stay updated.
            </p>
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
};

export default FAQs;
