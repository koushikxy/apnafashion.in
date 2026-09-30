import { useToast } from '../Utils/ToastContext';
﻿import React from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../Utils/ProductContext'
import { useCart } from '../Utils/CartContext'
import { useWishlist } from '../Utils/WishlistContext'
import { FaRegHeart, FaHeart } from 'react-icons/fa'

const Offer = () => {
    const { addToCart } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();
    const { addToast } = useToast();
    const { products } = useProducts();

    return (
        <div className='min-h-screen bg-white transition-colors duration-300 pb-20'>
            {/* Hero Section for Offers */}
            <div className="relative w-full h-[40vh] bg-black mb-16 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80" 
                    alt="Sale Banner" 
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-t from-red-600/50 to-transparent">
                    <h1 className="text-white text-6xl md:text-8xl font-black tracking-tighter uppercase mb-2">CLEARANCE</h1>
                    <p className="bg-white text-black font-black px-4 py-1 tracking-widest uppercase text-sm md:text-xl">UP TO 60% OFF FLAT</p>
                </div>
            </div>

            {/* Product Grid */}
            <div className='w-full mx-auto px-4 md:px-8 lg:px-16 2xl:px-24'>
                <div className='flex justify-between items-center mb-8 border-b border-gray-200 pb-4'>
                    <h2 className='text-3xl font-black tracking-tight text-black uppercase'>All Drops</h2>
                    <span className="text-sm font-bold text-gray-500 uppercase">{products.length} Styles Found</span>
                </div>

                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                    {products.map(product => (
                        <div key={product.id} className='group flex flex-col relative bg-transparent transition-transform hover:-translate-y-1'>
                            <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); addToast(isWishlisted(product.id) ? 'Removed from Wishlist' : 'Added to Wishlist'); }} className={`absolute top-4 right-4 z-10 hover:text-red-500 transition-colors ${isWishlisted(product.id) ? 'text-red-500' : 'text-gray-400'}`}>
                                    {isWishlisted(product.id) ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
                                </button>
                            
                            {/* Sale Badge */}
                            <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-black px-3 py-1 uppercase shadow-md">
                                SALE
                            </div>

                            <Link to={`/product/${product.id}`} className='relative overflow-hidden aspect-[3/4] block'>
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500'
                                />
                            </Link>
                            
                            <div className="flex flex-col pt-4 pb-2 bg-transparent">
                                <Link to={`/product/${product.id}`}>
                                    <h3 className='font-bold text-black text-sm md:text-base uppercase truncate'>{product.name}</h3>
                                    <p className='text-gray-500 text-xs mt-1 uppercase font-semibold'>{product.category}</p>
                                </Link>
                                <div className="flex items-center gap-2 mt-2">
                                    <p className='font-black text-red-500 text-lg'>₹{product.price}</p>
                                    <p className='text-gray-400 text-sm line-through font-bold'>₹{Math.floor(product.price * 1.5)}</p>
                                </div>
                            </div>

                            {/* Quick Add Overlay */}
                            <div className='absolute inset-x-0 bottom-24 p-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto flex justify-center'>
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToCart(product, product.sizes[0]);
                                        addToast(`Added to cart!`);
                                    }}
                                    className='w-[90%] bg-black text-white font-black uppercase tracking-wider py-3 shadow-xl hover:bg-red-500 hover:text-white :bg-red-500 :text-white transition-colors'
                                >
                                    Quick Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Offer
