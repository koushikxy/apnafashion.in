import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaRegHeart, FaSearch, FaShoppingCart, FaTimes, FaUser } from "react-icons/fa";
import logo from '../Images/Logo/apnafashionlogo.png'
import { useCart } from '../Utils/CartContext'
import { useProducts } from '../Utils/ProductContext'
import { useAuth } from '../Utils/AuthContext'

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { getCartItemCount, setIsCartOpen } = useCart();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { products } = useProducts();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchMatches = searchQuery.trim() ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4) : [];

    const handelClick = () => setClick(!click);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
        }
    };

    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40 transition-colors duration-300">
            <div className='w-full mx-auto px-4 md:px-8 lg:px-16 2xl:px-24'>
                <div className='flex justify-between items-center h-20'>
                    {/* Mobile Menu Button */}
                    <div className='flex items-center gap-4 flex-1 md:flex-none'>
                        <div className='md:hidden cursor-pointer p-2 -ml-2 text-black hover:opacity-70 transition' onClick={handelClick}>
                            {!click ? <FaBars className='text-2xl' /> : <FaTimes className='text-2xl' />}
                        </div>
                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/category/men" className="text-[11px] font-black tracking-[0.15em] text-black uppercase hover:text-gray-500 transition">New Arrivals</Link>
                            <Link to="/category/men" className="text-[11px] font-black tracking-[0.15em] text-black uppercase hover:text-gray-500 transition">Men</Link>
                            <Link to="/category/women" className="text-[11px] font-black tracking-[0.15em] text-black uppercase hover:text-gray-500 transition">Women</Link>
                            <Link to="/Fanbook" className="text-[11px] font-black tracking-[0.15em] text-black uppercase hover:text-gray-500 transition">The Club</Link>
                            <Link to="/Offer" className="text-[11px] font-black tracking-[0.15em] text-red-500 uppercase hover:text-red-400 transition">Sale</Link>
                        </div>
                    </div>
                    
                    {/* Center Logo */}
                    <div className='flex-shrink-0 flex justify-center flex-1'>
                        <Link to="/" className="flex items-center gap-3">
                            <img src={logo} alt="Apna Fashion Logo" className="w-10" />
                            <h1 className='text-xl md:text-3xl font-black text-black tracking-widest uppercase'>APNA FASHION</h1>
                        </Link>
                    </div>

                    {/* Right Icons */}
                    <div className='flex justify-end items-center gap-5 flex-1 md:flex-none'>
                        <div className="relative hidden lg:block">
                            <form 
                                onSubmit={handleSearch} 
                                className="flex items-center bg-gray-100 rounded px-4 py-2 w-64 border border-transparent focus-within:border-gray-300 transition-all"
                            >
                                <button type="submit">
                                    <FaSearch className="text-gray-500" />
                                </button>
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                    className="bg-transparent border-none outline-none w-full ml-3 text-sm text-black" 
                                />
                            </form>
                            
                            {/* Autocomplete Dropdown */}
                            {isSearchFocused && searchQuery.trim() && (
                                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 shadow-2xl py-2 z-50" onMouseDown={(e) => e.preventDefault()}>
                                    {searchMatches.length > 0 ? (
                                        <>
                                            <p className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 mb-2">Products</p>
                                            {searchMatches.map(match => (
                                                <Link 
                                                    key={match.id} 
                                                    to={`/product/${match.id}`}
                                                    onClick={() => {
                                                        setSearchQuery("");
                                                        setIsSearchFocused(false);
                                                    }}
                                                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                                                >
                                                    <img src={match.image} alt={match.name} className="w-10 h-12 object-cover bg-gray-100" />
                                                    <div>
                                                        <h4 className="text-xs font-black uppercase text-black">{match.name}</h4>
                                                        <p className="text-xs font-bold text-red-500">₹{match.price}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                            <button 
                                                onClick={handleSearch}
                                                className="w-full text-left px-4 py-3 mt-2 text-xs font-black text-black hover:bg-gray-50 uppercase tracking-widest border-t border-gray-100"
                                            >
                                                See all results for "{searchQuery}" →
                                            </button>
                                        </>
                                    ) : (
                                        <p className="px-4 py-6 text-sm text-center font-bold text-gray-500 uppercase">No matches found</p>
                                    )}
                                </div>
                            )}
                        </div>
                        <Link to="/Wishlist" className="text-black hover:opacity-70 transition hidden md:block relative">
                            <FaRegHeart className="text-xl" />
                        </Link>
                        <Link to="/Login" className="text-black hover:text-red-500 transition hidden md:flex items-center gap-2">
                            {currentUser ? (
                                <span className="text-xs font-black uppercase tracking-widest">{currentUser.name.split(' ')[0]}</span>
                            ) : (
                                <FaUser className="text-xl" />
                            )}
                        </Link>
                        <button onClick={() => setIsCartOpen(true)} className="text-black hover:opacity-70 transition relative flex items-center">
                            <FaShoppingCart className="text-xl" />
                            {getCartItemCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                                    {getCartItemCount()}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${click ? 'translate-x-0' : '-translate-x-full'} md:hidden border-r border-gray-200 `}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 ">
                        <span className="font-black text-xl tracking-widest text-black ">MENU</span>
                        <FaTimes className="text-2xl text-black cursor-pointer" onClick={handelClick} />
                    </div>
                    
                    {/* Mobile Search */}
                    <form onSubmit={(e) => { handelClick(); handleSearch(e); }} className="flex items-center bg-gray-100 rounded px-4 py-3 mb-6 border border-gray-200 ">
                        <button type="submit">
                            <FaSearch className="text-gray-500" />
                        </button>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none w-full ml-3 text-sm text-black " 
                        />
                    </form>

                    <ul className="flex flex-col space-y-6 flex-grow">
                        <li><Link to="/category/men" onClick={handelClick} className="text-xl font-black tracking-widest text-black hover:text-gray-500 transition block uppercase">New Arrivals</Link></li>
                        <li><Link to="/category/men" onClick={handelClick} className="text-xl font-black tracking-widest text-black hover:text-gray-500 transition block uppercase">Men</Link></li>
                        <li><Link to="/category/women" onClick={handelClick} className="text-xl font-black tracking-widest text-black hover:text-gray-500 transition block uppercase">Women</Link></li>
                        <li><Link to="/Fanbook" onClick={handelClick} className="text-xl font-black tracking-widest text-black hover:text-gray-500 transition block uppercase">The Club</Link></li>
                        <li><Link to="/Offer" onClick={handelClick} className="text-xl font-black tracking-widest text-red-500 hover:text-red-400 transition block uppercase">Clearance Sale</Link></li>
                        <li className="pt-8 mt-8 border-t border-gray-200"><Link to="/Login" onClick={handelClick} className="text-sm font-black tracking-widest text-gray-400 hover:text-black transition block uppercase flex items-center gap-3"><FaUser /> My Account</Link></li>
                    </ul>
                </div>
            </div>
            
            {/* Mobile Backdrop */}
            {click && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden backdrop-blur-sm" onClick={handelClick}></div>
            )}
        </div>
    )
}

export default Navbar
