import React, { useEffect, useState } from "react";
import { Row, Col, Input,  Spin,  } from "antd";
import { useCartContext } from "../../../contexts/CartContext";
import { useWishList } from "../../../contexts/WishListContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductModal from "../../../components/ProductModal";
import ProductCard from "../../../components/ProductCard";
import FilterSidebar from "../../../components/FilterSidebar";

const { Search } = Input;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const { addToCart } = useCartContext();
  const { addToWishList, removeFromWishList, wishList } = useWishList();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const VITE_API_URL = import.meta.env.VITE_API_URL || "";

  // Fetch products from backend
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${VITE_API_URL}/api/products/products`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
  }, []);

  // FILTER PRODUCTS
 const filteredProducts = products
  .filter((item) => {
    const itemCategory =
      typeof item.category === "string"
        ? item.category.toLowerCase()
        : item.category?.name?.toLowerCase() || "";

    const matchesCategory =
      selectedCategory === "All" ||
      itemCategory === selectedCategory.toLowerCase();

    const matchesSearch = item.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesMin = item.price >= priceRange[0];
    const matchesMax = item.price <= priceRange[1];

    return (
      matchesCategory &&
      matchesSearch &&
      matchesMin &&
      matchesMax
    );
  })
  .sort((a, b) => {
    if (sortOption === "priceLowHigh") return a.price - b.price;
    if (sortOption === "priceHighLow") return b.price - a.price;
    if (sortOption === "topRated") return b.rating - a.rating;
    if (sortOption === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });


  if (loading) {
    return (
      <div className="text-center py-5">
        <Spin size="large" tip="Loading products..." />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-4">
        Shop <span className="text-danger">Products</span>
      </h2>

      <div className="d-flex flex-column flex-md-row gap-4">
        <FilterSidebar 
         selectedCategory={selectedCategory}
         setSelectedCategory={setSelectedCategory}
         searchQuery={searchQuery}
         setSearchQuery={setSearchQuery}
         priceRange={priceRange}
         setPriceRange={setPriceRange}
         sortOption={sortOption}
         setSortOption={setSortOption} />


        {/* PRODUCTS GRID */}
        <div style={{ flex: 1 }}>
          <Row gutter={[20, 20]}>
          {filteredProducts.map((item) => {
            const isInWishList =
              wishList.findIndex((w) => {
                const id = w._id || w.id || w.product?._id;
                return id === item._id;
              }) !== -1;

            return (
              <Col key={item._id} xs={24} sm={12} md={8} data-aos="fade-up">
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
                  onClick={() => {
                    setSelectedProduct(item);
                    setSelectedSize(item.sizes?.[0] || null);
                    setOpenModal(true);
                  }}
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
    </div>
  );
};

export default Shop;
