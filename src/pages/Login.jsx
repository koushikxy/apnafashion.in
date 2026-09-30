import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Utils/AuthContext';
import { useOrders } from '../Utils/OrderContext';
import { useToast } from '../Utils/ToastContext';
import { FaBox } from 'react-icons/fa';
import logo from '../Images/Logo/apnafashionlogo.png';
import { motion } from 'framer-motion';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, register, currentUser, logout } = useAuth();
    const { getUserOrders } = useOrders();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const toggleForm = () => setIsLogin(!isLogin);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        
        if (isLogin) {
            const success = login(data.get('email'), data.get('password'));
            if (success) {
                addToast("Welcome back!", 'success');
                navigate('/');
            } else {
                addToast("Invalid email or password", 'error');
            }
        } else {
            const success = register(data.get('name'), data.get('email'), data.get('password'));
            if (success) {
                addToast("Account created successfully!", 'success');
                navigate('/');
            } else {
                addToast("Email already exists", 'error');
            }
        }
    };

    if (currentUser) {
        const myOrders = getUserOrders(currentUser.email);
        return (
            <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-xl p-8 md:p-12 border border-gray-200">
                        <div className="flex items-center gap-6 mb-12 pb-8 border-b border-gray-200">
                            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-white text-4xl font-black uppercase">
                                {currentUser.name.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-4xl font-black uppercase tracking-widest text-black">{currentUser.name}</h1>
                                <p className="text-gray-500 font-bold tracking-widest mt-2 uppercase">{currentUser.email}</p>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-black uppercase tracking-widest text-black mb-8 flex items-center gap-4">
                                <FaBox className="text-red-500" /> Order History
                            </h2>
                            
                            {myOrders.length === 0 ? (
                                <div className="bg-gray-50 p-12 text-center border border-gray-200">
                                    <p className="text-gray-500 font-bold uppercase tracking-widest mb-6">You haven't placed any orders yet.</p>
                                    <Link to="/" className="inline-block bg-black text-white px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-red-500 transition-colors">
                                        Start Shopping
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {myOrders.map(order => (
                                        <div key={order.id} className="border border-gray-200 bg-white p-6 hover:border-black transition-colors">
                                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                                                <div>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order Number</p>
                                                    <p className="font-black text-black tracking-widest">#{order.id}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Date</p>
                                                    <p className="font-bold text-black uppercase">{new Date(order.date).toLocaleDateString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total</p>
                                                    <p className="font-black text-black">₹{order.total}</p>
                                                </div>
                                                <div>
                                                    <span className="inline-block px-4 py-2 bg-green-100 text-green-800 text-xs font-black uppercase tracking-widest">
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                {order.items.slice(0,4).map((item, i) => (
                                                    <div key={i} className="relative aspect-[3/4] bg-gray-50">
                                                        <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                                {order.items.length > 4 && (
                                                    <div className="flex items-center justify-center bg-gray-100 font-black text-gray-500">
                                                        +{order.items.length - 4}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button 
                            onClick={() => {
                                logout();
                                addToast("Logged out successfully", 'success');
                            }}
                            className="w-full bg-white text-black border-2 border-black px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors">
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4] px-4 py-12 relative overflow-hidden">
            
            {/* Minimalist Background Typography */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none opacity-[0.03]">
                <h1 className="text-[15vw] font-black leading-none tracking-tighter uppercase">APNA</h1>
                <h1 className="text-[15vw] font-black leading-none tracking-tighter text-right uppercase">CULTURE</h1>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md bg-white p-10 md:p-14 shadow-2xl z-10"
            >
                <div className="flex flex-col items-center mb-10">
                    <Link to="/"><img src={logo} alt="Apna Fashion" className="w-16 mb-6" /></Link>
                    <h2 className="text-center text-2xl md:text-3xl font-black uppercase tracking-widest text-black">
                        {isLogin ? 'SIGN IN' : 'REGISTER'}
                    </h2>
                    <p className="mt-2 text-xs font-bold text-gray-400 uppercase tracking-widest">{isLogin ? 'Access your account' : 'Join the culture'}</p>
                </div>
                
                <div className="space-y-3 mb-8">
                    <button type="button" className="w-full flex items-center justify-center gap-3 py-4 px-4 border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-xs font-black uppercase tracking-widest text-black">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
                        Continue with Google
                    </button>
                    <button type="button" className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-black hover:bg-gray-900 transition-colors text-xs font-black uppercase tracking-widest text-white">
                        <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-4 h-4 filter invert" />
                        Continue with Apple
                    </button>
                </div>
                
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px]">
                        <span className="bg-white px-4 font-bold text-gray-400 uppercase tracking-widest">Or email</span>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {!isLogin && (
                            <div>
                                <input id="name" name="name" type="text" required={!isLogin} className="block w-full px-0 py-3 border-0 border-b-2 border-gray-200 text-black placeholder-gray-400 focus:ring-0 focus:border-black transition-colors uppercase font-black text-sm tracking-widest bg-transparent" placeholder="FULL NAME" />
                            </div>
                        )}
                        <div>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className="block w-full px-0 py-3 border-0 border-b-2 border-gray-200 text-black placeholder-gray-400 focus:ring-0 focus:border-black transition-colors uppercase font-black text-sm tracking-widest bg-transparent" placeholder="EMAIL ADDRESS" />
                        </div>
                        <div>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full px-0 py-3 border-0 border-b-2 border-gray-200 text-black placeholder-gray-400 focus:ring-0 focus:border-black transition-colors uppercase font-black text-sm tracking-widest bg-transparent" placeholder="PASSWORD" />
                        </div>
                    </div>

                    {isLogin && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 border-gray-300 rounded-none bg-white text-black focus:ring-black" />
                                <label htmlFor="remember-me" className="ml-2 block text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-widest">
                                <a href="/" className="text-red-500 hover:text-red-400 transition-colors">Forgot password?</a>
                            </div>
                        </div>
                    )}

                    <div className="mt-8">
                        <button type="submit" className="w-full flex justify-center py-5 px-4 text-xs font-black uppercase tracking-widest text-white bg-black hover:bg-red-500 transition-colors">
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </div>
                </form>

                <div className="mt-10 text-center text-[10px] font-bold uppercase tracking-widest pt-6">
                    <span className="text-gray-500">
                        {isLogin ? "NO ACCOUNT? " : "HAVE AN ACCOUNT? "}
                    </span>
                    <button onClick={toggleForm} className="text-black hover:text-red-500 transition-colors ml-1">
                        {isLogin ? 'REGISTER HERE' : 'LOGIN HERE'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
export default Login;
