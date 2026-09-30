import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './Utils/CartContext';
import { ThemeProvider } from './Utils/ThemeContext';
import { ProductProvider } from './Utils/ProductContext';
import { WishlistProvider } from './Utils/WishlistContext';
import { ToastProvider } from './Utils/ToastContext';
import { OrderProvider } from './Utils/OrderContext';
import { AuthProvider } from './Utils/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <ProductProvider>
        <WishlistProvider>
          <AuthProvider>
            <CartProvider>
              <OrderProvider>
                <ToastProvider>
                  <App />
                </ToastProvider>
              </OrderProvider>
            </CartProvider>
          </AuthProvider>
        </WishlistProvider>
      </ProductProvider>
    </ThemeProvider>
  </BrowserRouter>
);
