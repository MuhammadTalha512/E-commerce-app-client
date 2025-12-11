import React, { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import { useWishList } from "../../../contexts/WishListContext";
import { useCartContext } from "../../../contexts/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import ProductModal from "../../../components/ProductModal";
import ProductCard from "../../../components/ProductCard";

const WishList = () => {
  const { wishList, removeFromWishList, loading, addToWishList } = useWishList();
  const { addToCart } = useCartContext();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const openDetails = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product?.sizes?.[0] || null);
    setOpenModal(true);
  };

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
  }, []);

  if (loading)
    return (
      <div className="text-center py-5">
        <Spin size="large" tip="Loading products..." />
      </div>
    );

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">❤️ My Wishlist</h2>

      <Row gutter={[20, 20]}>
        {wishList.length === 0 ? (
          <p className="text-center w-100">Your wishlist is empty!</p>
        ) : (
          wishList.map((item) => {
            const key = item._id || item.id || Math.random();

            return (
              <Col xs={24} sm={12} md={8} key={key}>
                <ProductCard
                  image={
                    item.images?.[0]?.url ||
                    item.images?.[0] ||
                    item.image ||
                    ""
                  }
                  title={item.title}
                  subtitle={item.description?.slice(0, 50)}
                  price={item.price}
                  oldPrice={item.salePrice}
                  rating={item.rating}
                  reviews={item.reviews?.length || 0}
                  badge={item.tags?.[0] || ""}
                  options={item.sizes}
                  onClick={() => openDetails(item)}
                  addToCart={() => addToCart(item)}
                  isInWishList={true}
                  addToWishList={() => addToWishList(item)}
                  removeFromWishList={() =>
                    removeFromWishList(item._id || item.id)
                  }
                />
              </Col>
            );
          })
        )}
      </Row>

      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        product={selectedProduct}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        addToCart={addToCart}
        navigate={navigate}
      />
    </div>
  );
};

export default WishList;
