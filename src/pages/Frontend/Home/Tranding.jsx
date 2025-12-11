import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { message } from "antd";
import { useCartContext } from "../../../contexts/CartContext";
import { useWishList } from "../../../contexts/WishListContext";
import Aos from "aos";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductModal from "../../../components/ProductModal";
import ProductCard from "../../../components/ProductCard";

const categories = ["Men", "Women", "Baby", "Fashion"];

const Tranding = () => {
  const [active, setActive] = useState("Men");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { addToCart } = useCartContext();
  const { wishList, addToWishList, removeFromWishList } = useWishList();

  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const swiperRef = useRef(null);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${VITE_API_URL}/api/products/products`);
      setProducts(res.data.products || []);
    } catch (error) {
      message.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // MODAL
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product?.sizes?.[0] || null);
    setOpenModal(true);
  };

  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-in-out" });
  }, []);

  // FILTER
  const filteredProducts = products.filter((p) => {
    const c = p?.category?.name || p?.category?.title;
    return c?.toLowerCase() === active.toLowerCase();
  });

  return (
    <section className="container py-5 trending-container position-relative">
      {/* HEADER */}
      <div className="top-row d-flex justify-content-between align-items-center">
        <h2 className="title">Trending This Week</h2>

        <div className="tabs">
          {categories.map((c) => (
            <button
              key={c}
              className={`tab-btn ${active === c ? "active" : ""}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper */}
      <div className="position-relative">
        {/* Custom LEFT Arrow */}
        <button
          className="swiper-custom-btn left"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          ❮
        </button>

        {/* Custom RIGHT Arrow */}
        <button
          className="swiper-custom-btn right"
          onClick={() => swiperRef.current?.slideNext()}
        >
          ❯
        </button>

        <Swiper
          loop
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={20}
          slidesPerView={4}
          navigation={false}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="mt-4"
          data-aos="fade-up"
        >
          {filteredProducts?.map((item) => {
            if (!item) return null;

            const itemId = item?._id;

            const isInWishList =
              wishList?.findIndex((w) => {
                const id = w?._id || w?.product?._id;
                return id === itemId;
              }) !== -1;

            return (
              <SwiperSlide key={itemId}>
                <ProductCard
                  image={item?.images?.[0]?.url || item?.images?.[0] || item?.image}
                  title={item?.title}
                  subtitle={item?.description?.slice(0, 50)}
                  price={item?.price}
                  oldPrice={item?.salePrice}
                  rating={item?.rating}
                  reviews={item?.reviews?.length || 0}
                  badge={item?.tags?.[0]}
                  options={item?.sizes}
                  onClick={() => openProductModal(item)}
                  addToCart={() => addToCart(item)}
                  isInWishList={isInWishList}
                  addToWishList={() => addToWishList(item)}
                  removeFromWishList={() => removeFromWishList(itemId)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* MODAL */}
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
  );
};

export default Tranding;
