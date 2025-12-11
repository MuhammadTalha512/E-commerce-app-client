import React, { useEffect, useState } from "react";
import { Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const categories = [
    {
      title: "Men’s Fashion",
      img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=60&w=600",
      path: "/men",
    },
    {
      title: "Women’s Fashion",
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=60&w=600",
      path: "/women",
    },
    {
      title: "Baby Fashion",
      img: "https://media.istockphoto.com/id/931577634/photo/soft-focus-of-a-two-years-old-child-choosing-her-own-dresses-from-kids-cloth-rack.webp?a=1&b=1&s=612x612&w=0&k=20&c=vhFZMZkCxNkvxPakHvDBUJDsZh2qZ-nqbD2tB6apSCc=",
      path: "/baby",
    },
  ];

const LandingPage = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(`${VITE_API_URL}/api/banner/get-banners`);
      setBanners(res.data);
    } catch (error) {
      console.log("Banner fetch error:", error);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
  }, []);

  // Custom Arrows
  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="custom-arrow-right"
    >
      ❯
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="custom-arrow-left"
    >
      ❮
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      

      {/* SLIDER SECTION */}
      <div className="position-relative w-100 overflow-hidden">
        <Slider {...settings} data-aos="fade-up">
          {banners.map((item, index) => (
            <div key={index} className="position-relative">
              {/* IMAGE */}
              <img src={item.image} alt={item.title} className="banner-img" />

              {/* TITLE + BUTTON OVERLAY */}
              <div className="banner-overlay animate__animated animate__fadeInUp">
                <h1 className="banner-title">{item.title}</h1>

                <Button
                  type="primary"
                  style={{
                    background: "red",
                    border: "none",
                    padding: "10px 25px",
                    borderRadius: "30px",
                    fontSize: "18px",
                  }}
                  onClick={() => navigate(item.link || "/")}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <style>
        {`.banner-img {  width: 100%; height: 550px; object-fit: cover;}
          .banner-overlay {position: absolute; top: 50%; left: 10%; transform: translateY(-50%); z-index: 10; color: white;}
          .banner-title {font-size: 45px; font-weight: 700; text-shadow: 0px 3px 10px rgba(0,0,0,0.6);}
          .custom-arrow-right, .custom-arrow-left {position: absolute;
            top: 50%; transform: translateY(-50%);z-index: 20;font-size: 40px; color: #fff; cursor: pointer; padding: 10px; }
          .custom-arrow-right {right: 20px;}
          .custom-arrow-left {
            left: 20px;
          }
          @media (max-width: 768px) {
            .banner-img {
              height: 350px;
            }
            .banner-title {
              font-size: 26px;
            }
          }
        `}
      </style>
      <section className="container py-5">
       <Row gutter={[16, 16]} className="row g-4">
       {categories.map((cat, index) => (
       <div key={index} className="col-12 col-md-4">
        <div className="category-card position-relative rounded overflow-hidden shadow-sm"
          onClick={() => navigate(cat.path)}style={{ cursor: "pointer" }}>
          <img src={cat.img} alt={cat.title}
            className="w-100"
            style={{ height: "260px", objectFit: "cover" }}
          />
          <div className="category-overlay d-flex justify-content-center align-items-center">
            <h3 className="text-white fw-bold">{cat.title}</h3>
          </div>
        </div>
      </div>
    ))}

  </Row>

  {/* CSS */}
  <style>{`
    .category-card {
      position: relative;
      overflow: hidden;
    }

    .category-overlay {position: absolute; top: 0;left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.45);
      opacity: 0;
      transition: 0.3s ease-in-out;
    }

    .category-card:hover .category-overlay {
      opacity: 1;
    }
  `}</style>
</section>
      
    </>
  );
};

export default LandingPage;
