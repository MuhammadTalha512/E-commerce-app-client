import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const initialState = { isAuth: false, user: null };

const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [isAppLoading, setIsAppLoading] = useState(true);

  const loadUser = useCallback(() => {
    setIsAppLoading(true);
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setState({ isAuth: true, user: JSON.parse(storedUser) });
    } else {
      setState(initialState);
    }
    setIsAppLoading(false);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const contextLogin = (data) => {
    if (data?.token && data?.user) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setState({ isAuth: true, user: data.user });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setState(initialState);

    // Directly clear guest + user local storage
    localStorage.setItem("cart_guest", "[]");
    localStorage.setItem("wishlist_guest", "[]");

    // Also clear current user storage
    if (state.user?._id) {
      localStorage.setItem(`cart_${state.user._id}`, "[]");
      localStorage.setItem(`wishlist_${state.user._id}`, "[]");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        AuthState: state,
        setContextState: setState,
        isAppLoading,
        contextLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
