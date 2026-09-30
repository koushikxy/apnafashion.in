import React from 'react';
import { useCart } from '../Utils/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowRight } from 'react-icons/fa';

const Cart = () => {
    const { cart, removeFromCart, getCartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-white transition-colors">
                <div className="text-center max-w-md w-full">
                    <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-500 uppercase font-bold text-sm tracking-widest mb-8">Cop some fresh styles.</p>
                    <Link to="/" className="inline-block bg-black text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-red-500 hover:text-white :bg-red-500 :text-white transition-colors shadow-xl">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen transition-colors duration-300">
            <div className="w-full mx-auto px-4 md:px-8 lg:px-16 2xl:px-24 py-12">
                <h1 className="text-4xl font-black tracking-tight text-black uppercase mb-10 border-b border-black pb-6">Shopping Cart</h1>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <div className="lg:col-span-7">
                        <ul className="divide-y divide-gray-200 border-b border-gray-200 ">
                            {cart.map((item, index) => (
                                <li key={`${item.id}-${item.selectedSize}-${index}`} className="flex py-8">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-32 object-cover border border-gray-200 "
                                        />
                                    </div>

                                    <div className="ml-6 flex-1 flex flex-col justify-between">
                                        <div className="relative sm:grid sm:grid-cols-2 sm:gap-x-6">
                                            <div>
                                                <h3 className="text-base font-black text-black uppercase tracking-tight truncate">
                                                    {item.name}
                                                </h3>
                                                <p className="mt-1 text-xs font-bold text-gray-500 uppercase">Size: {item.selectedSize}</p>
                                                <p className="mt-1 text-xs font-bold text-gray-500 uppercase">Qty: {item.quantity}</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end">
                                                <p className="text-lg font-black text-black ">₹{item.price * item.quantity}</p>
                                                <div className="absolute top-0 right-0 sm:top-auto sm:right-0">
                                                    <button
                                                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                                                        type="button"
                                                        className="p-2 inline-flex text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <FaTrash className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Order summary */}
                    <div className="mt-16 bg-gray-50 border border-gray-200 px-6 py-8 sm:p-10 lg:mt-0 lg:col-span-5 lg:sticky lg:top-24 transition-colors">
                        <h2 className="text-xl font-black text-black uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
                        
                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between text-sm font-bold uppercase text-gray-600 ">
                                <dt>Subtotal</dt>
                                <dd className="text-black ">₹{getCartTotal()}</dd>
                            </div>
                            <div className="flex items-center justify-between text-sm font-bold uppercase text-gray-600 ">
                                <dt>Shipping</dt>
                                <dd className="text-black ">₹99</dd>
                            </div>
                            <div className="flex items-center justify-between text-sm font-bold uppercase text-gray-600 ">
                                <dt>Tax</dt>
                                <dd className="text-black ">₹{(getCartTotal() * 0.05).toFixed(0)}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
                                <dt className="text-xl font-black text-black uppercase tracking-widest">Total</dt>
                                <dd className="text-xl font-black text-red-500">₹{getCartTotal() + 99 + parseInt((getCartTotal() * 0.05).toFixed(0))}</dd>
                            </div>
                        </dl>

                        <div className="mt-8">
                            <Link
                                to="/Checkout"
                                className="w-full flex justify-center items-center gap-3 bg-black py-5 px-4 text-base font-black text-white uppercase tracking-widest hover:bg-red-500 hover:text-white :bg-red-500 :text-white transition-colors focus:outline-none"
                            >
                                Proceed to Checkout
                                <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
