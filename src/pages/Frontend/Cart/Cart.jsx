import React, { useEffect } from "react";
import { useCartContext } from "../../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Rate } from "antd";

const cartResponsiveCSS = `
@media (max-width: 768px) {
  .cart-wrapper {
    flex-direction: column !important;
    align-items: center !important;
    padding: 20px !important;
  }

  .cart-left {
    width: 100% !important;
  }

  .cart-right {
    width: 90% !important;
    margin-top: 20px !important;
    text-align: center !important;
  }

  .product-card {
    flex-direction: column !important;
    text-align: center !important;
    width: 100% !important;
  }

  .product-card img {
    margin: 0 auto 15px auto !important;
  }

  .product-card .details {
    flex-direction: column !important;
    gap: 15px !important;
    align-items: center !important;
    text-align: center !important;
  }

  .qty-section {
    justify-content: center !important;
    align-items: center !important;
    width: 100% !important;
    gap: 15px !important;
  }

  .cart-right .row {
    justify-content: space-between !important;
  }
}
`;

document.head.insertAdjacentHTML("beforeend", `<style>${cartResponsiveCSS}</style>`);

const Cart = () => {
  const { cart, removeFromCart, updateQty } = useCartContext();
  const navigate = useNavigate();

  /* LOCALSTORAGE SAFE CART */
  const safeCart = Array.isArray(cart) ? cart : [];

  /* SAFE SUBTOTAL */
  const subtotal = safeCart.reduce((acc, item) => {
    const price = Number(item?.price) || 0;
    const qty = Number(item?.qty) || 0;
    return acc + price * qty;
  }, 0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="cart-wrapper" style={styles.wrapper}>
        
        {/* LEFT SIDE */}
        <div style={styles.left}>
          <h2 style={styles.heading}>
            🛒 Shopping Cart{" "}
            <span style={{ fontSize: "18px" }}>({safeCart.length} items)</span>
          </h2>

          {safeCart.length === 0 && <p>No items in cart.</p>}

          {safeCart.map((item) => (
            <div
              key={item._id}
              style={styles.card}
              className="product-card"
              data-aos="fade-up"
            >
              {/* IMAGE */}
              <img
                src={item?.image}
                style={styles.image}
                alt={item?.product?.title}
              />

              <div className="details" style={styles.details}>
                <div className="cart-left" style={styles.detailsLeft}>
                  
                  {/* TITLE */}
                  <h3 style={styles.name}>{item?.title}</h3>
                  <h3 style={styles.name}>{item?.description}</h3>

                  {/* PRICE */}
                  <h2 className="price text-danger fw-semibold" style={styles.price}>
                    Rs. {item?.price * item?.qty}
                    <span className="text-muted ms-2" style={styles.each}>
                      (Rs.{item?.price} each)
                    </span>
                  </h2>

                  {item?.product?.rating && (
                    <Rate disabled defaultValue={item?.product?.rating} />
                  )}
                </div>

                {/* QTY SECTION */}
                <div className="qty-section cart-right" style={styles.qtySec}>
                  <div style={styles.qtyBox}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() =>
                        item.qty > 1 && updateQty(item._id, item.qty - 1)
                      }
                    >
                      –
                    </button>

                    <span style={styles.qtyNum}>{item.qty}</span>

                    <button
                      style={styles.qtyBtn}
                      onClick={() => updateQty(item._id, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => removeFromCart(item._id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SUMMARY */}
        <div style={styles.right} className="product-card mt-5" data-aos="fade-up">
          <h2 style={styles.summaryHeading}>Order Summary</h2>

          <div style={styles.row}>
            <span>Subtotal ({safeCart.length} items)</span>
            <strong className="price text-danger fw-semibold">Rs. {subtotal}</strong>
          </div>

          <div style={styles.row}>
            <span>Shipping</span>
            <strong style={{ color: "green" }}>FREE</strong>
          </div>

          <hr style={{ margin: "15px 0" }} />

          <div style={styles.row}>
            <span>Total</span>
            <strong className="price text-danger fw-semibold">Rs. {subtotal}</strong>
          </div>

          <button
            style={styles.checkoutBtn}
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>

          <button
            style={styles.continueBtn}
            onClick={() => navigate("/")}
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

/* -------------------  STYLES (UNCHANGED) ------------------- */

const styles = { 
  wrapper: { display: "flex", gap: "25px", },
  left: { width: "70%", },
  heading: { marginBottom: "15px", fontSize: "28px", fontWeight: "700", },
  card: { display: "flex", padding: "20px", background: "#fff", borderRadius: "14px", marginBottom: "18px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)", },
  image: { width: "140px", height: "130px", objectFit: "cover", borderRadius: "8px", marginRight: "20px", },
  details: { flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", },
  name: { paddingBottom: "8px", fontSize: "20px", fontWeight: "700", },
  price: { fontSize: "22px", fontWeight: "700", marginTop: "10px", },
  each: { color: "#777", fontSize: "15px", },
  qtyBox: { border: "1px solid #000", borderRadius: "8px", },
  qtySec: { display: "flex", alignItems: "center", marginTop: "15px", gap: "10px", },
  qtyBtn: { padding: "4px 12px", fontSize: "22px", borderRadius: "8px", border: "1px solid #ccc", background: "#fff", cursor: "pointer", },
  qtyNum: { padding: "4px 18px", borderRadius: "8px", background: "#f0f0f0", fontSize: "22px", fontWeight: "600", },
  deleteBtn: { padding: "8px 12px", marginLeft: "15px", borderRadius: "8px", border: "1px solid #ccc", background: "#fff", fontSize: "16px", cursor: "pointer", },
  right: { width: "30%", padding: "25px", background: "#fff", borderRadius: "14px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)", height: "fit-content", },
  summaryHeading: { marginBottom: "18px", fontSize: "24px", fontWeight: "700", },
  row: { display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "16px", },
  checkoutBtn: { width: "100%", padding: "12px", border: "none", borderRadius: "10px", background: "#ff6f61", color: "#fff", fontSize: "17px", cursor: "pointer", marginTop: "20px", },
  continueBtn: { width: "100%", padding: "10px", marginTop: "10px", border: "1px solid #ccc", borderRadius: "10px", fontSize: "16px", background: "#fff", cursor: "pointer", },
};
