import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('apnafashion_orders');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('apnafashion_orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (orderData) => {
        const newOrder = {
            ...orderData,
            id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
            date: new Date().toISOString(),
            status: 'Pending'
        };
        setOrders(prev => [newOrder, ...prev]);
        return newOrder.id;
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const getTotalRevenue = () => {
        return orders.reduce((sum, order) => sum + order.total, 0);
    };

    const getUserOrders = (email) => {
        return orders.filter(order => order.email === email);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, getTotalRevenue, getUserOrders }}>
            {children}
        </OrderContext.Provider>
    );
};
