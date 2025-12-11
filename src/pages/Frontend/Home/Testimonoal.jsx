import React, { useEffect, useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { message } from "antd";
import { useCartContext } from "../../../contexts/CartContext";
import { useWishList } from "../../../contexts/WishListContext";
import { useNavigate } from "react-router-dom";
import ProductModal from "../../../components/ProductModal";

import Slider from "react-slick"; // Testimonial slider
import { Swiper, SwiperSlide } from "swiper/react"; // Products slider
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../../../components/ProductCard";

// Testimonials
const testimonials = [
  {
    name: "Petey Cruiser",
    role: "Designer",
    img: "https://i.pravatar.cc/100?img=1",
    text: "Everybody is different...",
  },
  {
    name: "Jane Doe",
    role: "Developer",
    img: "https://i.pravatar.cc/100?img=2",
    text: "Great product!",
  },
  {
    name: "John Smith",
    role: "Manager",
    img: "https://i.pravatar.cc/100?img=3",
    text: "Excellent service...",
  },
];

// Trending-style custom arrows
const Arrow = ({ onClick, type }) => (
  <button
    onClick={onClick}
    className={`swiper-custom-btn ${type === "prev" ? "left" : "right"}`}
  >
    {type === "next" ? "❯" : "❮"}
  </button>
);

const Testimonial = () => {
  const { addToCart } = useCartContext();
  const { wishList, addToWishList, removeFromWishList } = useWishList();

  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const swiperRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API}/api/products/products`)
      .then((res) => setProducts(res.data.products || []))
      .catch(() => message.error("Failed to load products"));
  }, []);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize(null);
    setOpenModal(true);
  };

  /* --- Testimonial Slick Slider Settings --- */
  const testimonialSettings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    arrows: false,
    dots:true,
  };

  return (
    <>
      {/* Testimonial Section */}
      <section
        style={{
          background: "#f8f0e3",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
        data-aos="fade-up"
      >
        <h2 className="mb-4">Customer Testimonial</h2>
        <Slider {...testimonialSettings}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ padding: "1rem 2rem" }}>
              <p>{t.text}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                <img
                  src={t.img}
                  alt={t.name}
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
                <div>
                  <h5>{t.name}</h5>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Products Section */}
      <section className="container py-5 position-relative">
        <h2 className="text-center mb-4">You May Like</h2>

        {/* Custom Arrows */}
        <Arrow
          type="prev"
          onClick={() => swiperRef.current?.slidePrev()}
        />
        <Arrow
          type="next"
          onClick={() => swiperRef.current?.slideNext()}
        />

        <Swiper 
         loop
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          navigation={false} // we use custom arrows
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="mt-4"
          data-aos="fade-up"
        >
          {products.map((item) => {
            const isInWishList =
              wishList.findIndex((w) => {
                const id = w._id || w.id || w.product?._id;
                return id === item._id;
              }) !== -1;

            return (
              <SwiperSlide key={item._id}>
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
              </SwiperSlide>
            );
          })}
        </Swiper>

        <ProductModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          product={selectedProduct}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          addToCart={addToCart}
          navigate={navigate}
        />
      </section>
    </>
  );
};

export default Testimonial;
