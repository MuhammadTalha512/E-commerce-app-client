import React, { useState, useEffect } from "react";
import { Row, Col, Spin } from "antd";
import { useCartContext } from "../contexts/CartContext";
import { useWishList } from "../contexts/WishListContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductModal from "./ProductModal";
import ProductCard from "./ProductCard";

const CategoryPage = ({ categoryName }) => {
  const { addToCart } = useCartContext();
  const { wishList, addToWishList, removeFromWishList } = useWishList();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const VITE_API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`${VITE_API_URL}/api/products/products`)
    .then((res)=>{
    const filtered = res.data.products.filter((p)=>{
      const cat = typeof p.category === "string" ? p.category : p.category?.name;
     return  cat?.toLowerCase() === categoryName.toLowerCase()
    })
    setProducts(filtered)
    })  
     .catch((err) => console.log(err))
     .finally(() => setLoading(false));
  }, [categoryName]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes?.[0] || null);
    setOpenModal(true);
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <Spin size="large" tip="Loading products..." />
      </div>
    );

  return (
    <>
      <div className="container py-5">
        <div className="mb-4 text-center">
          <h2>Category {categoryName}</h2>
          <p className="text-secondary">
            Explore our curated collection of {categoryName} products.
          </p>
        </div>

        <Row gutter={[20, 20]}>
          {products.map((item) => {
            const isInWishList = wishList.some(
              (w) =>
                w._id === item._id ||
                w.id === item._id ||
                w.product?._id === item._id
            );

            return (
              <Col key={item._id} xs={24} sm={12} md={8}>
                <ProductCard
                  image={item.images?.[0]?.url || item.images?.[0] || item.image || ""}
                  title={item.title}
                  subtitle={item.description?.slice(0, 50)}
                  price={item.price}
                  oldPrice={item.salePrice}
                  rating={item.rating}
                  reviews={item.reviews?.length || 0}
                  badge={item.tags?.[0] || ""}
                  options={item.sizes}
                  onClick={() => openProductModal(item)}
                  addToCart={() => addToCart(item)}
                  isInWishList={isInWishList}
                  addToWishList={() => addToWishList(item)}
                  removeFromWishList={() => removeFromWishList(item._id)}
                />
              </Col>
            );
          })}
        </Row>
      </div>

      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        product={selectedProduct}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        addToCart={addToCart}
        navigate={navigate}
      />
    </>
  );
};

export default CategoryPage;
