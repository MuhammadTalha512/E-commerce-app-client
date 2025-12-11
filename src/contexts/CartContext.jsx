// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useAuthContext } from "./AuthContext";
// import { message } from "antd";

// const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const { AuthState, isAppLoading } = useAuthContext();
//   const userId = AuthState?.user?._id || "guest";

//   const [cart, setCart] = useState([]);

//   // LOAD CART ON USER CHANGE OR APP LOAD
//   useEffect(() => {
//     if (isAppLoading) return;

//     const savedGuest = localStorage.getItem("cart_guest");
//     const savedUser = localStorage.getItem(`cart_${userId}`);

//     if (AuthState.isAuth) {
//       // merge guest cart into user cart on login
//       const guestCart = savedGuest ? JSON.parse(savedGuest) : [];
//       const userCart = savedUser ? JSON.parse(savedUser) : [];

//       // merge items without duplication
//       const merged = [...userCart];

//       guestCart.forEach((item) => {
//         const exists = merged.find(
//           (i) => i._id === item._id || i.product?._id === item._id
//         );
//         if (!exists) merged.push(item);
//       });

//       setCart(merged);
//       localStorage.setItem(`cart_${userId}`, JSON.stringify(merged));
//       localStorage.setItem("cart_guest", "[]");
//     } else {
//       // guest
//       setCart(savedUser ? JSON.parse(savedUser) : savedGuest ? JSON.parse(savedGuest) : []);
//     }
//   }, [userId, isAppLoading, AuthState.isAuth]);

//   // SAVE CART
//   useEffect(() => {
//     if (isAppLoading) return;
//     const key = AuthState.isAuth ? `cart_${userId}` : "cart_guest";
//     localStorage.setItem(key, JSON.stringify(cart));
//   }, [cart, userId, isAppLoading, AuthState.isAuth]);

//   const addToCart = (product) => {
//     if (!product?._id) return;
//     setCart((prev) => {
//       const exists = prev.find(
//         (item) => item._id === product._id || item?.product?._id === product._id
//       );
//       if (exists) {
//         return prev.map((item) =>
//           item._id === product._id || item?.product?._id === product._id
//             ? { ...item, qty: item.qty + 1 }
//             : item
//           );
//       }
//       message.success("Product Add To Cart")
//       return [...prev, { _id: product._id, product, qty: 1 }];
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart((prev) =>
//       prev.filter((item) => item._id !== id && item?.product?._id !== id)
//     );
//   };

//   const updateQty = (id, qty) => {
//     const safeQty = Number(qty);
//     if (isNaN(safeQty) || safeQty < 1) return;
//     setCart((prev) =>
//       prev.map((item) =>
//         item._id === id || item?.product?._id === id ? { ...item, qty: safeQty } : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider value={{ cart, setCart, addToCart, setCart ,removeFromCart, updateQty }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCartContext = () => useContext(CartContext);
// export default CartProvider;

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useAuthContext } from "./AuthContext";
// import { message } from "antd";

// const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const { AuthState, isAppLoading } = useAuthContext();
//   const userId = AuthState?.user?._id || "guest";

//   const [cart, setCart] = useState([]);

//   // LOAD CART ON USER CHANGE
//   useEffect(() => {
//     if (isAppLoading) return;

//     const key = AuthState.isAuth ? `cart_${userId}` : "cart_guest";
//     const saved = localStorage.getItem(key);

//     setCart(saved ? JSON.parse(saved) : []);
//   }, [userId, isAppLoading, AuthState.isAuth]);

//   // SAVE CART
//   useEffect(() => {
//     if (isAppLoading) return;

//     const key = AuthState.isAuth ? `cart_${userId}` : "cart_guest";
//     localStorage.setItem(key, JSON.stringify(cart));
//   }, [cart, userId, isAppLoading, AuthState.isAuth]);

//   const addToCart = (product) => {
//     if (!product?._id) return;

//     setCart((prev) => {
//       const exists = prev.find(
//         (item) => item._id === product._id
//       );

//       if (exists) {
//         return prev.map((item) =>
//           item._id === product._id
//             ? { ...item, qty: item.qty + 1 }
//             : item
//         );
//       }

//       message.success("Product Added To Cart");

//       return [...prev, {  product, qty: 1 }];
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart((prev) => prev.filter((item) => item._id !== id));
//   };

//   const updateQty = (id, qty) => {
//     const safeQty = Number(qty);
//     if (isNaN(safeQty) || safeQty < 1) return;

//     setCart((prev) =>
//       prev.map((item) =>
//         item._id === id ? { ...item, qty: safeQty } : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQty, setCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCartContext = () => useContext(CartContext);
// export default CartProvider;


import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { message } from "antd";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { AuthState, isAppLoading } = useAuthContext();
  const userId = AuthState?.user?._id || "guest";

  const [cart, setCart] = useState([]);

  // LOAD CART
  useEffect(() => {
    if (isAppLoading) return;

    const key = AuthState.isAuth ? `cart_${userId}` : "cart_guest";
    const saved = localStorage.getItem(key);

    setCart(saved ? JSON.parse(saved) : []);
  }, [userId, isAppLoading, AuthState.isAuth]);

  // SAVE CART
  useEffect(() => {
    if (isAppLoading) return;

    const key = AuthState.isAuth ? `cart_${userId}` : "cart_guest";
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, userId, isAppLoading, AuthState.isAuth]);

  // ADD TO CART
  const addToCart = (product) => {
    if (!product?._id) return;

    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);

      if (exists) {
        return prev.map((item) =>
          item._id === product._id
        ? { ...item, qty: item.qty + 1 }
        : item
      );
    }
    
    
    // qty inside product object
    return [...prev, { ...product, qty: 1 }];
  });
  message.success("Product Added To Cart");
  };

  // REMOVE
  const removeFromCart = (id) => {
    // setCart((prev) => prev.filter((item) => item._id !== id));
     setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // UPDATE QTY
  const updateQty = (id, qty) => {
    const safeQty = Number(qty);
    if (isNaN(safeQty) || safeQty < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: safeQty } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, setCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
export default CartProvider;
