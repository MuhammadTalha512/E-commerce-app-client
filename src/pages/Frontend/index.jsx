import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Men from './Men/Men'
import Women from './Women/Women'
import Baby from './BabyCollection/Baby'
import Contact from './Contact/Contact'
import Blog from './Blog/Blog'
import Cart from './Cart/Cart'
import WishList from './WishList/WishList'
import About from './About/About'
import PrivacyPolicy from './Privacy/Privacy'
import FAQs from './Privacy/Faqs'
import Careers from './Privacy/Careers'
import ShopNow from './Home/ShopNow'
import Shop from './Shop/Shop'
import Checkout from './Checkout/Checkout'
import Payment from './Payment'
import BlogDetail from './BlogDetails/BlogDetails'

const Frontend = () => {
  return (
    <>
    <Header />
    <main>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/shopnow' element={<ShopNow />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/men' element={<Men />} />
        <Route path='/women' element={<Women />} />
        <Route path='/baby' element={<Baby />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/faqs' element={<FAQs />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/payment'  element={<Payment />}/>
        <Route path='/blog/:slug'  element={<BlogDetail />}/>
    </Routes>
    </main>
    <Footer />
    </>
  )
}

export default Frontend