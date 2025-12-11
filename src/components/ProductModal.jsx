import React, { useState } from "react";
import { Modal, Button, Input, Rate, Tag } from "antd";
import { CarOutlined, SafetyCertificateOutlined } from "@ant-design/icons";

const ProductModal = ({
  open,
  onClose,
  product,
  selectedSize,
  setSelectedSize,
  addToCart,
  navigate,
}) => {
  if (!product) return null;

  const [qty, setQty] = useState(1)

  return (
    <Modal
      centered
      open={open}
      footer={null}
      onCancel={onClose}
      width={window.innerWidth < 768 ? "95%" : 800}
    >
      <div
        style={{
          display: "flex",
          flexDirection: window.innerWidth < 768 ? "column" : "row",
          gap: "20px",
          padding: "10px",
        }}
      >
        {/* IMAGE SECTION */}
        <div style={{ flex: 1, minHeight: window.innerWidth < 768 ? "200px" : "300px" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
          />
        </div>

        {/* CONTENT SECTION */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px", justifyContent: "space-between" }}>
          <div>
            <h3>{product.title}</h3>
            <p className="fw-bold text-danger fs-5">Rs {product.price}</p>
            {product.brand && <p>Brand: {product.brand}</p>}
            <p>Description: {product.description}</p>
            {product.tags && <p>Tags: {product.tags.join(", ")}</p>}
            {product.rating && <Rate disabled defaultValue={product.rating} />}
            {product.sizes && (
              <div>
                <strong>Sizes: </strong>
                <div className="d-flex flex-wrap gap-2 mt-1">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      type={size === selectedSize ? "primary" : "default"}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                {selectedSize && <p className="py-2">Selected Size: <strong>{selectedSize}</strong></p>}
              </div>
            )}
            {product.fullDescription && <p>Full Description: {product.fullDescription}</p>}
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-3">
            <div>
              <h5>Quantity</h5>
              <Input type="number" min={1} value={qty} onChange={(e)=> setQty(Number(e.target.value))} style={{ width: "100px" }} />
            </div>
            <div className="d-flex flex-column flex-md-row pt-lg-4 pt-sm-0 gap-2 w-100">
              <Button type="primary" block size="large" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
              <Button
                type="primary"
                danger
                block
                size="large"
                onClick={() =>
                  navigate("/checkout", { state: { product, size: selectedSize, qty} })
                }
              >
                Buy Now
              </Button>
            </div>
          </div>

          <div className="d-flex justify-content-around mb-3 flex-wrap gap-2">
            <Tag icon={<CarOutlined />} color="green" style={{ fontSize: "14px" }}>
              Free Shipping
            </Tag>
            <Tag icon={<SafetyCertificateOutlined />} color="gold" style={{ fontSize: "14px" }}>
              Quality Guarantee
            </Tag>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;

