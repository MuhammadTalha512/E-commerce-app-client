import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Home = lazy(() => import("./Home"));
const Men = lazy(() => import("./Men/Men"));
const Women = lazy(() => import("./Women/Women"));
const Baby = lazy(() => import("./BabyCollection/Baby"));
const Contact = lazy(() => import("./Contact/Contact"));
const Blog = lazy(() => import("./Blog/Blog"));
const Cart = lazy(() => import("./Cart/Cart"));
const WishList = lazy(() => import("./WishList/WishList"));
const About = lazy(() => import("./About/About"));
const PrivacyPolicy = lazy(() => import("./Privacy/Privacy"));
const FAQs = lazy(() => import("./Privacy/Faqs"));
const Careers = lazy(() => import("./Privacy/Careers"));
const ShopNow = lazy(() => import("./Home/ShopNow"));
const Shop = lazy(() => import("./Shop/Shop"));
const Checkout = lazy(() => import("./Checkout/Checkout"));
const Payment = lazy(() => import("./Payment"));
const BlogDetail = lazy(() => import("./BlogDetails/BlogDetails"));

const Frontend = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shopnow" element={<ShopNow />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/baby" element={<Baby />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Frontend;
