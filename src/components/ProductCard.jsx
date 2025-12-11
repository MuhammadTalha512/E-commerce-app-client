import React from "react";
import { Rate, Button, Tag } from "antd";
import { HeartOutlined, EyeOutlined } from "@ant-design/icons";
import "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";

const ProductCard = ({
  image,
  title,
  subtitle,
  price,
  rating,
  reviews,
  badge,
  oldPrice,
  onClick,
  addToCart,
  isInWishList,
  addToWishList,
  removeFromWishList,
}) => {
  return (
    <>
      <div className="product-card shadow-sm p-2 rounded-0">
        <div className="position-relative">
          <div className="top-icons">
            <span className="icon-btn heart-icon">
              <HeartOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  isInWishList ? removeFromWishList() : addToWishList();
                }}
              />
            </span>

            <span className="icon-btn eye-icon">
              <EyeOutlined onClick={onClick} />
            </span>
          </div>

          <img
            src={image}
            onError={(e) => (e.target.src = "/no-image.png")}
            className="product-img rounded-0"
          />

          {badge && <Tag color="black" className="badge-tag">{badge}</Tag>}
        </div>

        <div className="mt-3">
          <div className="d-flex align-items-center gap-2 py-2">
            <Rate allowHalf defaultValue={rating} disabled style={{ fontSize: 14 }} />
            <small>({reviews})</small>
          </div>

          <div className="d-flex justify-content-between">
            <h6 className="fw-semibold">{title}</h6>
            <h5 className="fw-bold text-danger">
              <span>{price}</span> 
              <span className="old-price text-muted">{oldPrice}</span>
            </h5>
          </div>

          <div className="d-flex text-align-left">
            <p className="text-muted small">{subtitle}</p>
          </div>
        </div>

        <Button
          type="primary rounded-0 mb-2"
          onClick={() => addToCart?.()}
          block
          className="add-btn text-white mt-2"
        >
          add to cart - Rs {price}
        </Button>
      </div>

      <style>{`
        .top-icons {
          position: absolute;
          top: 12px;
          flex-direction: column;
          left: 12px;
          display: flex;
          gap: 8px;
          opacity: 0;
          z-index: 10;
        }
        .product-card:hover .top-icons {
          opacity: 1;
        }
        .icon-btn {
          background: #fff;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          border: 1px solid #ddd;
          cursor: pointer;
          transition: 0.2s;
        }
        .icon-btn:hover {
          background: #f7e6ef;
          border-color: #e2b4c6;
        }
        .product-card {
          background: #ffffff;
          border: 1px solid #f1e6e6;
          transition: 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0px 6px 18px rgba(0,0,0,0.1);
        }
        .product-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          background: #f8f0f4;
        }
        .old-price {
          text-decoration: line-through;
          font-weight: 400;
          font-size: 16px;
        }
        .badge-tag {
          position: absolute;
          top: 12px;
          right: 6px;
          border-radius: 30px;
          padding: 2px 10px;
          font-size: 8px;
        }
        .add-btn {
          background: #000 !important;
          border-radius: 10px;
          font-weight: 600;
          padding: 8px 0;
          height: auto;
        }
      `}</style>
    </>
  );
};

export default ProductCard;
