import React, { useState } from 'react';
import { useCart } from '../Utils/CartContext';
import { useOrders } from '../Utils/OrderContext';
import { useAuth } from '../Utils/AuthContext';
import { useToast } from '../Utils/ToastContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Checkout = () => {
    const { cart: cartItems, clearCart } = useCart();
    const { addOrder } = useOrders();
    const { currentUser } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();
    
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 99;
    const tax = Math.floor(subtotal * 0.05);
    const discountAmount = Math.floor(subtotal * discount);
    const total = subtotal + shipping + tax - discountAmount;

    const applyPromo = (e) => {
        e.preventDefault();
        if (promoCode === 'STREET20') {
            setDiscount(0.20);
            setPromoError('');
            addToast('Promo applied successfully!');
        } else {
            setDiscount(0);
            setPromoError('Invalid Promo Code');
        }
    }

    const handleCheckout = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            addToast('Your cart is empty', 'error');
            return;
        }

        const newOrder = {
            id: Math.floor(Math.random() * 1000000),
            date: new Date().toISOString().split('T')[0],
            items: [...cartItems],
            total: total,
            status: 'Processing',
            email: currentUser ? currentUser.email : e.target.email.value
        };

        addOrder(newOrder);
        clearCart();
        addToast('ORDER PLACED SUCCESSFULLY!');
        navigate('/');
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-white transition-colors">
                <div className="text-center max-w-md w-full">
                    <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-4">YOUR CART IS EMPTY</h2>
                    <p className="text-gray-500 uppercase font-bold text-sm tracking-widest mb-8">Add items to your cart before checking out.</p>
                    <Link to="/" className="inline-block bg-black text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-red-500 transition-colors shadow-xl">
                        Return to Store
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen transition-colors duration-300">
            <div className="w-full mx-auto px-4 md:px-8 lg:px-16 2xl:px-24 py-12">
                <Link to="/Cart" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 font-bold uppercase tracking-wider mb-8 transition-colors">
                    <FaArrowLeft /> BACK TO CART
                </Link>

                <div className="lg:grid lg:grid-cols-[1.5fr_1fr] lg:gap-x-16 lg:items-start">
                    {/* Left Column: Forms */}
                    <div className="mb-16 lg:mb-0">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black uppercase mb-10 border-b border-gray-200 pb-6">Checkout</h1>
                        
                        <form id="checkout-form" onSubmit={handleCheckout} className="space-y-12">
                            {/* Contact Info */}
                            <div>
                                <h2 className="text-xl font-black text-black uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Contact Info</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                                        <input type="email" id="email" name="email" required defaultValue={currentUser?.email || ''} className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black focus:bg-white transition-colors uppercase font-bold text-xs" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Phone Number</label>
                                        <input type="tel" id="phone" required className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black focus:bg-white transition-colors uppercase font-bold text-xs" />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Info */}
                            <div>
                                <h2 className="text-xl font-black text-black uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Shipping Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">First Name</label>
                                        <input type="text" id="firstName" name="firstName" required defaultValue={currentUser?.name?.split(' ')[0] || ''} className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black focus:bg-white transition-colors uppercase font-bold text-xs" />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Last Name</label>
                                        <input type="text" id="lastName" name="lastName" required defaultValue={currentUser?.name?.split(' ').slice(1).join(' ') || ''} className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black focus:bg-white transition-colors uppercase font-bold text-xs" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="address" className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Address</label>
                                        <input type="text" id="address" required className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black focus:bg-white transition-colors uppercase font-bold text-xs" />
                                    </div>
                                    <div className="md:col-span-2 flex gap-4">
                                        <div className="w-1/2">
                                            <label htmlFor="city" className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">City</label>
                                            <input type="text" id="city" required className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black focus:bg-white transition-colors uppercase font-bold text-xs" />
                                        </div>
                                        <div className="w-1/2">
                                            <label htmlFor="postalCode" className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">PIN Code</label>
                                            <input type="text" id="postalCode" required className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black focus:bg-white transition-colors uppercase font-bold text-xs" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div>
                                <h2 className="text-xl font-black text-black uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Payment</h2>
                                <div className="bg-red-50 p-4 border border-red-200 text-xs font-bold text-red-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                    Test Mode Active. No real payment required.
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor="card" className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Card number</label>
                                        <input type="text" id="card" placeholder="0000 0000 0000 0000" required className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black focus:bg-white transition-colors uppercase font-bold text-xs" />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <label htmlFor="exp" className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Valid Thru (MM/YY)</label>
                                            <input type="text" id="exp" placeholder="MM/YY" required className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black focus:bg-white transition-colors uppercase font-bold text-xs" />
                                        </div>
                                        <div className="w-1/2">
                                            <label htmlFor="cvc" className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">CVV</label>
                                            <input type="text" id="cvc" placeholder="123" required className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black focus:bg-white transition-colors uppercase font-bold text-xs" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Order Summary (Sticky) */}
                    <div className="lg:sticky lg:top-24 bg-gray-50 border border-gray-200 p-8 shadow-sm">
                        <h2 className="text-2xl font-black text-black uppercase tracking-widest mb-6">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                            {cartItems.map(item => (
                                <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center bg-white border border-gray-100 p-2">
                                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover" />
                                    <div className="flex-1">
                                        <h3 className="text-xs font-black uppercase text-black">{item.name}</h3>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase">Size: {item.size} • Qty: {item.quantity}</p>
                                        <p className="text-xs font-black text-black mt-1">₹{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Promo Code */}
                        <div className="mb-6">
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="PROMO CODE (e.g. STREET20)"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    className="flex-1 bg-white border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black transition-colors uppercase font-bold text-xs"
                                />
                                <button onClick={applyPromo} className="bg-black text-white px-6 font-black uppercase tracking-widest text-xs hover:bg-red-500 transition-colors">
                                    Apply
                                </button>
                            </div>
                            {promoError && <p className="text-red-500 text-xs font-bold uppercase mt-2">{promoError}</p>}
                            {discount > 0 && <p className="text-green-500 text-xs font-bold uppercase mt-2">Promo applied: {(discount * 100)}% OFF</p>}
                        </div>

                        <div className="space-y-3 border-t border-gray-200 pt-6">
                            <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : `'${shipping}`}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                                <span>Tax (5%)</span>
                                <span>₹{tax}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between items-center text-xs font-bold text-green-500 uppercase tracking-widest">
                                    <span>Discount ({(discount * 100)}%)</span>
                                    <span>-₹{discountAmount}</span>
                                </div>
                            )}

                            <div className="flex justify-between items-center text-2xl font-black text-black uppercase tracking-tight mb-8 mt-4 pt-4 border-t border-gray-200">
                                <span>Total</span>
                                <span className="text-red-500">₹{total}</span>
                            </div>
                            
                            <button
                                type="submit"
                                form="checkout-form"
                                className="w-full bg-black text-white py-5 px-4 font-black uppercase tracking-widest hover:bg-red-500 transition-colors shadow-xl"
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
