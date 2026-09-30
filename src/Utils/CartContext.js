import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('apnafashion_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('apnafashion_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, size) => {
        setIsCartOpen(true);
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id && item.selectedSize === size);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id && item.selectedSize === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, selectedSize: size, quantity: 1 }];
        });
    };

    
    const updateQuantity = (productId, size, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId, size);
            return;
        }
        setCart(prevCart => prevCart.map(item => 
            item.id === productId && item.selectedSize === size
                ? { ...item, quantity: quantity }
                : item
        ));
    };
    
    const removeFromCart = (productId, size) => {
        setCart(prevCart => prevCart.filter(item => !(item.id === productId && item.selectedSize === size)));
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getCartItemCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartItemCount, isCartOpen, setIsCartOpen, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
