import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const CITIES = ['Tokyo', 'New York', 'London', 'Paris', 'Berlin', 'Seoul', 'Mumbai', 'Los Angeles', 'Dubai'];
const PRODUCTS = ['Heavyweight Boxy Tee', 'Cargo Parachute Pants', 'Oversized Hoodie', 'Tactical Vest', 'Silver Chain Necklace', 'Distressed Denim', 'Leather Bomber Jacket'];

const LivePurchases = () => {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        let timeout1;
        let timeout2;

        const triggerRandomPurchase = () => {
            const timeToNext = Math.floor(Math.random() * (20000 - 8000 + 1) + 8000);
            
            timeout1 = setTimeout(() => {
                const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
                const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
                const timeAgo = Math.floor(Math.random() * 12) + 1;
                
                setNotification({ city: randomCity, product: randomProduct, time: timeAgo });
                
                timeout2 = setTimeout(() => {
                    setNotification(null);
                    triggerRandomPurchase();
                }, 5000);

            }, timeToNext);
        };

        // Start initial cycle faster
        timeout1 = setTimeout(() => {
            triggerRandomPurchase();
        }, 3000);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, []);

    return (
        <AnimatePresence>
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                    className="fixed bottom-6 left-6 z-50 bg-white border border-gray-200 shadow-2xl p-6 flex gap-4 max-w-sm pointer-events-none"
                >
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mt-1"></div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Someone in {notification.city}
                        </p>
                        <p className="text-xs font-black text-black uppercase tracking-widest leading-snug">
                            Just purchased <br/>
                            <span className="text-red-500">{notification.product}</span>
                        </p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                            {notification.time} mins ago
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LivePurchases;
