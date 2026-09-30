import React, { useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Login from './pages/Login'
import Home from './pages/Home'
import Offer from './pages/Offer'
import Fanbook from './pages/Fanbook'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import Category from './pages/Category'
import Search from './pages/Search'
import Admin from './pages/Admin'
import Wishlist from './pages/Wishlist'
import NotFound from './pages/NotFound'

// Layout Components
import Topnav from './components/Topnav'
import Navbar from './components/Navbar'
import Bottomnav from './components/Bottomnav'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import LivePurchases from './components/LivePurchases'

// Scroll to top BEFORE the animation starts
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const PageTransition = ({ children }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-full"
    >
        {children}
    </motion.div>
);

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === '/Login' || location.pathname === '/Checkout';

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <ScrollToTop />
      <CartDrawer />
      <LivePurchases />
      {!hideLayout && <Topnav />}
      {!hideLayout && <Navbar />}
      {!hideLayout && <Bottomnav />}
      
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route exact path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route exact path="/category/:categoryId" element={<PageTransition><Category /></PageTransition>} />
            <Route exact path="/search" element={<PageTransition><Search /></PageTransition>} />
            <Route exact path="/admin" element={<PageTransition><Admin /></PageTransition>} />
            <Route exact path="/Login" element={<PageTransition><Login /></PageTransition>} />
            <Route exact path="/Offer" element={<PageTransition><Offer /></PageTransition>} />
            <Route exact path="/Fanbook" element={<PageTransition><Fanbook /></PageTransition>} />
            <Route exact path="/About" element={<PageTransition><About /></PageTransition>} />
            <Route exact path="/Contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route exact path="/Cart" element={<PageTransition><Cart /></PageTransition>} />
            <Route exact path="/Wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
            <Route exact path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
            <Route exact path="/Checkout" element={<PageTransition><Checkout /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </div>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
