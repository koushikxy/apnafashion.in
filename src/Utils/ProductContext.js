import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from './products';

const ProductContext = createContext();

export const useProducts = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Load products from localStorage or fallback to initial data
        const savedProducts = localStorage.getItem('apnafashion_products_v3');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            setProducts(initialProducts);
            localStorage.setItem('apnafashion_products_v3', JSON.stringify(initialProducts));
        }
    }, []);

    const addProduct = (newProduct) => {
        const productWithId = {
            ...newProduct,
            id: Date.now(), // Generate a simple unique ID
        };
        const updatedProducts = [...products, productWithId];
        setProducts(updatedProducts);
        localStorage.setItem('apnafashion_products_v3', JSON.stringify(updatedProducts));
    };

    const deleteProduct = (id) => {
        const updatedProducts = products.filter(p => p.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem('apnafashion_products_v3', JSON.stringify(updatedProducts));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
