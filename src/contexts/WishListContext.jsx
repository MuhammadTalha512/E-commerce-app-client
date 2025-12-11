import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { message } from "antd";

const WishListContext = createContext();

const WishListProvider = ({ children }) => {
  const { AuthState, isAppLoading } = useAuthContext();
  const userId = AuthState?.user?._id || "guest";

  const [wishList, setWishList] = useState([]);

  // LOAD WISHLIST ON USER CHANGE
  useEffect(() => {
    if (isAppLoading) return;

    const savedGuest = localStorage.getItem("wishlist_guest");
    const savedUser = localStorage.getItem(`wishlist_${userId}`);

    if (AuthState.isAuth) {
      const guestList = savedGuest ? JSON.parse(savedGuest) : [];
      const userList = savedUser ? JSON.parse(savedUser) : [];

      const merged = [...userList];

      guestList.forEach((item) => {
        const exists = merged.find(
          (i) => i._id === item._id || i?.product?._id === item._id
        );
        if (!exists) merged.push(item);
      });

      setWishList(merged);
      localStorage.setItem(`wishlist_${userId}`, JSON.stringify(merged));
      localStorage.setItem("wishlist_guest", "[]");
    } else {
      setWishList(savedUser ? JSON.parse(savedUser) : savedGuest ? JSON.parse(savedGuest) : []);
    }
  }, [userId, isAppLoading, AuthState.isAuth]);

  // SAVE WISHLIST
  useEffect(() => {
    if (isAppLoading) return;
    const key = AuthState.isAuth ? `wishlist_${userId}` : "wishlist_guest";
    localStorage.setItem(key, JSON.stringify(wishList));
  }, [wishList, userId, isAppLoading, AuthState.isAuth]);

  const addToWishList = (product) => {
    if (!product?._id) return;

    const exists = wishList.some(
      (item) => item._id === product._id || item?.product?._id === product._id
    );
    if (exists) return;

    setWishList((prev) => [...prev, product]);
    message.success("product add to WishList")
  };

  const removeFromWishList = (id) => {
    setWishList((prev) =>
      prev.filter((item) => item._id !== id && item?.product?._id !== id)
    );
  };

  return (
    <WishListContext.Provider value={{ wishList, addToWishList, removeFromWishList }}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => useContext(WishListContext);
export default WishListProvider;
