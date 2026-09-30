import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Utils/CartContext';
import { FaTimes, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Drawer */}
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-[101] flex flex-col"
                    >
                        <div className="px-6 py-6 border-b border-gray-200 flex items-center justify-between bg-white">
                            <h2 className="text-2xl font-black uppercase tracking-widest text-black">Your Cart</h2>
                            <button 
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 text-gray-400 hover:text-black transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-4xl">🛍️</span>
                                    </div>
                                    <p className="text-xl font-black text-black uppercase tracking-widest">Cart is Empty</p>
                                    <button 
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-red-500 font-bold uppercase text-sm tracking-widest hover:text-red-400"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map((item) => (
                                        <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 bg-white p-4 border border-gray-200 shadow-sm relative group">
                                            <img src={item.image} alt={item.name} className="w-24 h-32 object-cover bg-gray-100" />
                                            <div className="flex-1 flex flex-col">
                                                <div className="flex justify-between items-start pr-6">
                                                    <div>
                                                        <h3 className="font-bold text-black uppercase text-sm">{item.name}</h3>
                                                        <p className="text-gray-500 text-xs font-bold uppercase mt-1">Size: {item.selectedSize}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-auto flex items-center justify-between">
                                                    <div className="flex items-center border border-gray-300">
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                                                            className="px-3 py-1 hover:bg-gray-100 text-black transition-colors"
                                                        >
                                                            <FaMinus className="text-xs" />
                                                        </button>
                                                        <span className="px-4 py-1 font-black text-sm text-black border-x border-gray-300">
                                                            {item.quantity}
                                                        </span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                                                            className="px-3 py-1 hover:bg-gray-100 text-black transition-colors"
                                                        >
                                                            <FaPlus className="text-xs" />
                                                        </button>
                                                    </div>
                                                    <p className="font-black text-black">₹{item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.id, item.selectedSize)}
                                                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="border-t border-gray-200 p-6 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-bold text-gray-500 uppercase tracking-widest text-sm">Subtotal</span>
                                    <span className="text-2xl font-black text-black">₹{getCartTotal()}</span>
                                </div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Shipping & taxes calculated at checkout</p>
                                <button 
                                    onClick={() => {
                                        setIsCartOpen(false);
                                        navigate('/Checkout');
                                    }}
                                    className="w-full bg-black text-white font-black uppercase tracking-widest py-4 hover:bg-red-500 transition-colors shadow-xl"
                                >
                                    Proceed to Checkout
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsCartOpen(false);
                                        navigate('/Cart');
                                    }}
                                    className="w-full text-center mt-4 text-sm font-bold text-gray-500 uppercase tracking-widest hover:text-black transition-colors"
                                >
                                    View Full Cart
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
