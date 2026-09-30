import { useToast } from '../Utils/ToastContext';
﻿import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useProducts } from '../Utils/ProductContext';
import { useCart } from '../Utils/CartContext'
import { useWishlist } from '../Utils/WishlistContext';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const Search = () => {
    const location = useLocation();
    const { addToCart } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();
    const { addToast } = useToast();
    const { products } = useProducts();
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('q') || '';
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        );

        setSearchResults(filtered);
    }, [location.search, products]);

    return (
        <div className='min-h-screen bg-white transition-colors duration-300 pb-20'>
            {/* Search Hero Header */}
            <div className="w-full bg-black py-16 px-4 text-center border-b border-gray-800">
                <h1 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase">
                    Search Results
                </h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest mt-4">
                    {searchQuery ? `Showing results for "${searchQuery}"` : "Enter a search term"}
                </p>
            </div>

            {/* Product Grid */}
            <div className='w-full mx-auto px-4 md:px-8 lg:px-16 2xl:px-24 pt-12'>
                <div className='flex justify-between items-center mb-8 border-b border-gray-200 pb-4'>
                    <h2 className='text-3xl font-black tracking-tight text-black uppercase'>All Results</h2>
                    <span className="text-sm font-bold text-gray-500 uppercase">{searchResults.length} Styles Found</span>
                </div>

                {searchResults.length === 0 ? (
                    <div className="py-20 text-center">
                        <h3 className="text-2xl font-black text-black uppercase mb-4">No products found</h3>
                        <p className="text-gray-500 font-bold uppercase tracking-widest">Try searching for something else like "shirt" or "jacket".</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                        {searchResults.map(product => (
                            <div key={product.id} className='group flex flex-col relative bg-transparent transition-transform hover:-translate-y-1'>
                                <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); addToast(isWishlisted(product.id) ? 'Removed from Wishlist' : 'Added to Wishlist'); }} className={`absolute top-4 right-4 z-10 hover:text-red-500 transition-colors ${isWishlisted(product.id) ? 'text-red-500' : 'text-gray-400'}`}>
                                    {isWishlisted(product.id) ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
                                </button>

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
                                        <p className='font-black text-black text-lg'>₹{product.price}</p>
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
                )}
            </div>
        </div>
    )
}

export default Search;
