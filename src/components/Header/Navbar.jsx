import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Input, Drawer } from "antd";
import {SearchOutlined,UserOutlined,CloseOutlined,MenuOutlined,HeartFilled,} from "@ant-design/icons";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCartContext } from "../../contexts/CartContext";
import { useWishList } from "../../contexts/WishListContext";
import logo from "../../assets/images/logo.webp";

const Navbar = () => {
  const { AuthState, handleLogout } = useAuthContext();
  const { isAuth } = AuthState;
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { cart } = useCartContext();
  const { wishList } = useWishList();

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Shop", to: "/shop" },
  ];

  const afterNavItems = [
    { name: "Blog", to: "/blog" },
    { name: "Contact", to: "/contact" },
  ];

  const categories = [
    { name: "Men", to: "/men" },
    { name: "Women", to: "/women" },
    { name: "Baby Collection", to: "/baby" },
  ];

  // Render nav items with categories
  const renderNavItems = (isMobile = false) => (
    <>
      {navItems.map((item) => (
        <li className="nav-item" key={item.to}>
          <Link
            to={item.to}
            className={`nav-link fw-semibold ${isMobile ? "text-dark" : "text-dark mx-2"}`}
          >
            {item.name}
          </Link>
        </li>
      ))}

      {/* Categories dropdown */}
      <li className="nav-item dropdown" style={{ position: "relative" }}>
        {isMobile ? (
          <details>
            <summary className="nav-link fw-semibold text-dark" style={{ cursor: "pointer" }}>
              Categories
            </summary>
            <ul className="ps-3">
              {categories.map((cat) => (
                <li key={cat.to}>
                  <Link to={cat.to} className="nav-link fw-semibold text-dark">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        ) : (
          <span
            className="nav-link fw-semibold mx-2 text-dark dropdown-toggle"
            style={{ cursor: "pointer" }}
          >
            Categories
            <ul className="dropdown-menu shadow" style={{ top: "100%", left: 0 }}>
              {categories.map((cat) => (
                <li key={cat.to}>
                  <Link to={cat.to} className="dropdown-item">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </span>
        )}
      </li>

      {afterNavItems.map((item) => (
        <li className="nav-item" key={item.to}>
          <Link
            to={item.to}
            className={`nav-link fw-semibold ${isMobile ? "text-dark" : "text-dark mx-2"}`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <>
      {/* Topbar */}
      {/* <div className="bg-dark text-center text-white py-2 small overflow-hidden position-relative">
        <div className="marquee">
          <span>
            Sale Up To 50% Biggest Discounts. Hurry! Limited Period Offer{" "}
            <Link to="/shopnow" className="text-warning fw-bold text-decoration-none">
              Shop Now
            </Link>
            &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div> */}
    <div className="bg-dark text-center text-white py-2 small overflow-hidden position-relative">
  <div className="marquee-single">
    <span>
      Sale Up To 50% Biggest Discounts. Hurry! Limited Period Offer{" "}
      <Link to="/shopnow" className="text-warning fw-bold text-decoration-none">
        Shop Now
      </Link>
      &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
    </span>
  </div>
</div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm" style={{ zIndex: 999 }}>
        <div className="container py-2 d-flex align-items-center justify-content-between">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} width="45" alt="logo" />
            <h5 className="fw-bold text-dark m-0">
              E-<span className="text-danger">Shop</span>
            </h5>
          </Link>

          {/* Mobile Menu Button */}
          <button className="border-0 bg-transparent d-lg-none" onClick={() => setDrawerOpen(true)}>
            <MenuOutlined style={{ fontSize: 24 }} />
          </button>

          {/* Desktop Navigation */}
          <ul className="navbar-nav mb-2 mb-lg-0 text-center d-none d-lg-flex justify-content-center">
            {renderNavItems(false)}
          </ul>

          {/* Icons */}
          <div className="d-flex align-items-center gap-3 position-relative">
            {/* Search */}
            <div onClick={() => setShowSearch(!showSearch)} style={{ cursor: "pointer" }}>
              {showSearch ? <CloseOutlined style={{ fontSize: 22 }} /> : <SearchOutlined style={{ fontSize: 22 }} />}
            </div>

            {/* User */}
            <div className="position-relative">
              <UserOutlined
                style={{ fontSize: 22, cursor: "pointer" }}
                onMouseEnter={() => setShowUserMenu(true)}
                onMouseLeave={() => setShowUserMenu(false)}
              />
              {showUserMenu && (
                <div
                  className="position-absolute bg-white shadow p-3 rounded"
                  style={{ right: 0, top: "120%", zIndex: 1000, width: "180px", animation: "fadeIn 0.2s ease-in-out" }}
                >
                  {isAuth ? (
                    <>
                    {AuthState?.user?.role === "admin" && ( <Link to="/dashboard" className="btn btn-sm btn-success w-100 mb-2">
                        Dashboard
                      </Link>)}
                     
                      <button onClick={handleLogout} className="btn btn-sm btn-danger w-100">
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth/login" className="btn btn-sm btn-outline-dark w-100 mb-2">
                        Login
                      </Link>
                      <Link to="/auth/register" className="btn btn-sm btn-dark w-100">
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Badge count={cart.length} size="small" offset={[0, 4]}>
              <Link to="/cart">
                <i className="fa-solid fa-cart-plus" style={{ fontSize: 24, color: "black", cursor: "pointer" }}></i>
              </Link>
            </Badge>

            {/* Wishlist */}
            <Badge count={wishList.length} size="small" offset={[0, 4]}>
              <Link to="/wishlist">
                <HeartFilled style={{ fontSize: 24, color: "red", cursor: "pointer" }} />
              </Link>
            </Badge>
          </div>
        </div>
      </nav>

      {/* Search */}
      {showSearch && (
        <div className="bg-light py-3 shadow-sm search-bar-animation">
          <div className="container">
            <Input placeholder="Search products..." size="large" prefix={<SearchOutlined />} className="w-100 rounded-pill" />
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      <Drawer placement="left" onClose={() => setDrawerOpen(false)} open={drawerOpen} width={260}>
        <ul className="navbar-nav mb-2 text-start">{renderNavItems(true)}</ul>
      </Drawer>
      <style>
        {`
         .nav-item.dropdown:hover .dropdown-menu {
         display: block;
         visibility: visible;
         opacity: 1;
         transition: all 0.2s ease-in-out;
        }
        .marquee-single {
         width: 100%;
         overflow: hidden;
         position: relative;
         white-space: nowrap;
       }

      .marquee-single span {
        display: inline-block;
        padding-left: 100%;  /* Start from outside screen */
        animation: marqueeSingle 20s linear infinite;
      }

      /* Animation */
      @keyframes marqueeSingle {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100%); /* Move fully left */
        }
      }

        `}
      </style>
    </>
  );
};

export default Navbar;
