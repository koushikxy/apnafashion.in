import React, { useState } from 'react';
import { useToast } from '../Utils/ToastContext';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    const [email, setEmail] = useState('');
    const { addToast } = useToast();

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        addToast('Subscribed! Check your email for a 10% discount.');
        setEmail('');
    };
    return (
        <footer className="bg-black text-white pt-12 pb-8 border-t border-gray-900">
            <div className="w-full mx-auto px-4 md:px-8 lg:px-16 2xl:px-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="md:col-span-1">
                        <h3 className="text-3xl font-black uppercase tracking-tight mb-4">APNA FASHION</h3>
                        <p className="text-gray-400 font-bold text-sm tracking-widest uppercase leading-relaxed mb-6">
                            THE NEW STANDARD IN URBAN STREETWEAR. REDEFINING YOUTH CULTURE EVERY DAY.
                        </p>
                        <div className="flex space-x-6">
                            <a href="/" className="text-gray-400 hover:text-red-500 text-2xl transition-colors"><FaInstagram /></a>
                            <a href="/" className="text-gray-400 hover:text-red-500 text-2xl transition-colors"><FaYoutube /></a>
                            <a href="/" className="text-gray-400 hover:text-red-500 text-2xl transition-colors"><FaTwitter /></a>
                            <a href="/" className="text-gray-400 hover:text-red-500 text-2xl transition-colors"><FaFacebook /></a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-lg font-black uppercase tracking-widest mb-6">Shop</h4>
                        <ul className="space-y-4 font-bold text-sm text-gray-400 uppercase tracking-wider">
                            <li><Link to="/Offer" className="hover:text-white transition-colors">New Drops</Link></li>
                            <li><Link to="/Offer" className="hover:text-red-500 transition-colors">Clearance</Link></li>
                            <li><Link to="/category/men" className="hover:text-white transition-colors">Best Sellers</Link></li>
                            <li><Link to="/category/women" className="hover:text-white transition-colors">Gift Cards</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-lg font-black uppercase tracking-widest mb-6">Help</h4>
                        <ul className="space-y-4 font-bold text-sm text-gray-400 uppercase tracking-wider">
                            <li><Link to="/Contact" className="hover:text-white transition-colors">Track Order</Link></li>
                            <li><Link to="/Contact" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
                            <li><Link to="/Contact" className="hover:text-white transition-colors">Shipping Info</Link></li>
                            <li><Link to="/Contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-black uppercase tracking-widest mb-6">Join The Club</h4>
                        <p className="text-gray-400 font-bold text-xs tracking-widest uppercase mb-4">Get early access to drops and exclusive discounts.</p>
                        <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="YOUR EMAIL" className="bg-gray-900 border border-gray-800 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors uppercase font-bold text-xs" />
                            <button type="submit" className="bg-white text-black font-black uppercase tracking-widest py-3 hover:bg-red-500 hover:text-white transition-colors">Subscribe</button>
                        </form>
                    </div>
                </div>
                
                <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-600 uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} APNA FASHION. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-4">
                        <Link to="/About" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/About" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
