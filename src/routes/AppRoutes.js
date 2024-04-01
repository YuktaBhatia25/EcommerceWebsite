import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage, Login, ProductDetailsPage, ProductPage, Register } from '../pages'
import { CartPage } from '../pages/Cart/CartPage'
import { DashboardPage } from '../pages/Dashboard/DashboardPage'

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/products' element={ <ProductPage /> } />
        <Route path='/products/:id' element={<ProductDetailsPage />} />
        <Route path='/register' element={ <Register />} />
        <Route path='/login' element={ <Login/> } />
        <Route path='/cart' element={ <CartPage /> } />
        <Route path='/dashboard' element={ <DashboardPage /> } />
      </Routes>
    </>
  )
}
