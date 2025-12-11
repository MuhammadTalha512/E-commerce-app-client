import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@ant-design/v5-patch-for-react-19';
import "./components/message.jsx"
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext.jsx';
import { ConfigProvider } from 'antd';
import CartProvider from './contexts/CartContext.jsx';
import WishListProvider from './contexts/WishListContext.jsx';
import ProductContextProvider from './contexts/ProductContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{ components: { Button: { colorPrimary: "#1d3557" } } }}>
       <AuthContextProvider>
        <CartProvider>
          <WishListProvider>
              <ProductContextProvider>
                <App />
              </ProductContextProvider>
          </WishListProvider>
        </CartProvider>
       </AuthContextProvider>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
)

