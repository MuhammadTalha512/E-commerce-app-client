import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AllUsers from './AllUsers';
import AllOrders from './Orders/AllOrders';
import AbandondOrders from './Orders/AbandondOrders';
import AllProducts from './Product/AllProducts';
import Contacts from './Contacts';
import Subscribers from './Subscribers';
import Banners from './Banners';
import Categories from './Categories';
import EditProduct from './Product/EditProduct';
import AddProducts from './Product/AddProducts';
import AddBlog from './Blog/AddBlog';
import AllBlog from './Blog/AllBlogs';

const DashboardRoutes = () => {
  return (
<Routes>

  <Route index element={<Navigate to="orders" replace />} />
  <Route path="orders" element={<AllOrders />} />
  <Route path="orders/abandoned" element={<AbandondOrders />} />
  <Route path="products/all" element={<AllProducts />} />
  <Route path="product/add" element={<AddProducts />} />
  <Route path="products/edit/:id" element={<EditProduct />} />
  <Route path="users" element={<AllUsers />} />
  <Route path="contacts" element={<Contacts />} />
  <Route path="subscribers" element={<Subscribers />} />
  <Route path="banners" element={<Banners />} />
  <Route path="categories" element={<Categories />} />
  <Route path="blog/add" element={<AddBlog />} />
  <Route path="blog/all" element={<AllBlog />} />
</Routes>
  );
};

export default DashboardRoutes;

