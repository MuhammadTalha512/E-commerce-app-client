import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import { useAuthContext } from '../contexts/AuthContext'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

const Index = () => {
  const {AuthState} = useAuthContext()
  const {isAuth} = AuthState
  return (
    <>
    <Routes>
        <Route path='/*' element={<Frontend />} />
        <Route path='/auth/*' element={!isAuth? <Auth />: <Navigate to="/dashboard" />} />
        <Route path='/dashboard/*' element={<AdminRoute><Dashboard /></AdminRoute>} />
    </Routes>

    </>


  )
}

export default Index