import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Frontend from './Frontend';
import Auth from './Auth';
import Dashboard from './Dashboard';
import { useAuthContext } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

const IndexRoutes = () => {
  const { AuthState } = useAuthContext();
  const { isAuth } = AuthState;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/*" element={<Frontend />} />

        <Route
          path="/auth/*"
          element={!isAuth ? <Auth /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard/*"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default IndexRoutes;
