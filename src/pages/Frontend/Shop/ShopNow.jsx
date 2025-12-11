import React from "react";
import { Row, Col, Button, Card } from "antd";

const { Meta } = Card;

const shopCategories = [
  {
    id: 1,
    title: "Baby Collection",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=60",
    desc: "Adorable outfits for your little ones — soft, safe, and stylish!",
  },
  {
    id: 2,
    title: "Women’s Fashion",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=60",
    desc: "Trendy styles and comfy wear for every occasion.",
  },
  {
    id: 3,
    title: "Men’s Collection",
    img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=600&q=60",
    desc: "Sharp, modern, and comfortable fashion for men.",
  },
];

const ShopNow = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-3">Shop Now</h2>
      <p className="text-center mb-5" style={{ maxWidth: 700, margin: "0 auto" }}>
        Explore our exclusive collections crafted with love and care.  
        Find everything you need for your family — from newborns to adults!
      </p>

      <Row gutter={[24, 24]}>
        {shopCategories.map((category) => (
          <Col xs={24} md={12} lg={8} key={category.id}>
            <Card
              hoverable
              cover={<img alt={category.title} src={category.img} style={{ height: "280px", objectFit: "cover" }} />}
              style={{
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
            >
              <Meta title={category.title} description={category.desc} />
              <div className="text-center mt-3">
                <Button type="primary" shape="round">
                  Shop Now
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShopNow;
