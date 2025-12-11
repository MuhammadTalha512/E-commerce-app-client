import React, { useState } from 'react';
import {
  FileOutlined, TeamOutlined, UserOutlined, ShoppingCartOutlined,
  ShoppingOutlined, TagsOutlined, PhoneOutlined, EyeOutlined,
  LogoutOutlined, PictureOutlined,
  EditOutlined
} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import { useAuthContext } from '../../contexts/AuthContext';   // ✅ Added

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const linkStyle = {
  color: "inherit",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: 500
};

const items = [
  getItem(<Link style={linkStyle} to="/dashboard/orders">All Orders</Link>, "/dashboard/orders",<ShoppingCartOutlined />),

  getItem('Products', 'products', <ShoppingOutlined />, [
    getItem(<Link style={linkStyle} to="/dashboard/products/all">All Products</Link>, "/dashboard/products/all"),
    getItem(<Link style={linkStyle} to="/dashboard/product/add">Add Product</Link>, "/dashboard/product/add"),
  ]),

  getItem("Blog", "blog", <EditOutlined />, [
    getItem(<Link style={linkStyle} to="/dashboard/blog/all">All Blogs</Link>, "/dashboard/blog/all"),
    getItem(<Link style={linkStyle} to="/dashboard/blog/add">Add Blog</Link>, "/dashboard/blog/add"),
  ]),

  getItem(<Link style={linkStyle} to="/dashboard/categories">Categories</Link>, "/dashboard/categories", <TagsOutlined />),
  getItem(<Link style={linkStyle} to="/dashboard/banners">Banners</Link>, "/dashboard/banners", <PictureOutlined />),
  getItem(<Link style={linkStyle} to="/dashboard/users">Users</Link>, "/dashboard/users", <TeamOutlined />),
  getItem(<Link style={linkStyle} to="/dashboard/contacts">Contacts</Link>, "/dashboard/contacts", <PhoneOutlined />),
  getItem(<Link style={linkStyle} to="/dashboard/subscribers">Subscribers</Link>, "/dashboard/subscribers", <UserOutlined />),

  getItem(<Link style={linkStyle} to="/" target="_blank">Preview Website</Link>, "/preview", <EyeOutlined />),

  getItem(<span style={linkStyle}>Logout</span>, "logout", <LogoutOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { handleLogout } = useAuthContext();   

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  const onMenuClick = (e) => {
    if (e.key === 'logout') {
      handleLogout();
      navigate('/login');     
      return;
    }

    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>

        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: collapsed ? 24 : 20,
            fontWeight: 700,
            letterSpacing: 1,
            cursor: "pointer",
          }}
        >
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            {collapsed ? "E" : "E-Commerce"}
          </Link>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          items={items}
          onClick={onMenuClick}
          style={{ fontSize: "15px" }}
        />
      </Sider>

      <Layout>
        <Content>
          <Breadcrumb />
          <div
            style={{
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <DashboardRoutes />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
