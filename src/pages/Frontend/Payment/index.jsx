import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PaymentSuccess from './PaymentSuccess'
import PaymentCancel from './PaymentCancel'

const Payment = () => {
  return (
    <div>
        <Routes>
            <Route path='/success' element={<PaymentSuccess />} />
            <Route path='/cancel' element={<PaymentCancel />} />
        </Routes>
    </div>
  )
}

export default Payment