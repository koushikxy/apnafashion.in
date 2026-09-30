import { useToast } from '../Utils/ToastContext';
﻿import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../Utils/ProductContext'
import { useCart } from '../Utils/CartContext'
import { useWishlist } from '../Utils/WishlistContext'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'

const Category = () => {
    const { categoryId } = useParams();
    const { addToCart } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();
    const { addToast } = useToast();
    const { products } = useProducts();
    
    const [sortBy, setSortBy] = React.useState('newest');
    const [selectedSizes, setSelectedSizes] = React.useState([]);
    const [priceRange, setPriceRange] = React.useState('all');

    const toggleSize = (size) => {
        setSelectedSizes(prev => 
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    // Filter products by category (case insensitive)
    let categoryProducts = products.filter(product => 
        product.category.toLowerCase() === categoryId?.toLowerCase()
    );

    // Apply Size Filter
    if (selectedSizes.length > 0) {
        categoryProducts = categoryProducts.filter(product => 
            product.sizes.some(size => selectedSizes.includes(size))
        );
    }

    // Apply Price Filter
    if (priceRange === 'under1000') {
        categoryProducts = categoryProducts.filter(p => p.price < 1000);
    } else if (priceRange === '1000to2000') {
        categoryProducts = categoryProducts.filter(p => p.price >= 1000 && p.price <= 2000);
    } else if (priceRange === 'over2000') {
        categoryProducts = categoryProducts.filter(p => p.price > 2000);
    }

    let sortedProducts = [...categoryProducts];
    if(sortBy === 'price_asc') sortedProducts.sort((a,b) => a.price - b.price);
    if(sortBy === 'price_desc') sortedProducts.sort((a,b) => b.price - a.price);

    return (
        <div className='min-h-screen bg-white transition-colors duration-300 pb-20'>
            {/* Category Hero Header */}
            <div className="w-full bg-black py-16 px-4 text-center border-b border-gray-800">
                <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter uppercase">
                    {categoryId}
                </h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest mt-4">
                    Explore the latest {categoryId} drops.
                </p>
            </div>

            {/* Product Grid */}
            <div className='w-full mx-auto px-4 md:px-8 lg:px-16 2xl:px-24 pt-12'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-200 pb-4 gap-4'>
                    <div className="flex items-baseline gap-4">
                        <h2 className='text-3xl font-black tracking-tight text-black uppercase'>All {categoryId}</h2>
                        <span className="text-sm font-bold text-gray-500 uppercase">{sortedProducts.length} Styles</span>
                    </div>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-gray-50 border border-gray-200 text-black text-sm font-bold uppercase px-4 py-2 focus:outline-none cursor-pointer"
                    >
                        <option value="newest">Sort by: Newest</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>
                </div>

                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="sticky top-24 space-y-8">
                            <div>
                                <h3 className="font-black text-black uppercase tracking-widest text-sm mb-4 border-b border-gray-200 pb-2">Filter by Size</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                        <label key={size} onClick={() => toggleSize(size)} className="flex items-center gap-2 cursor-pointer group">
                                            <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${selectedSizes.includes(size) ? 'bg-black border-black' : 'border-gray-300 group-hover:border-black'}`}>
                                                {selectedSizes.includes(size) && <span className="w-2 h-2 bg-white rounded-full"></span>}
                                            </div>
                                            <span className="text-sm font-bold uppercase text-gray-700">{size}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-black text-black uppercase tracking-widest text-sm mb-4 border-b border-gray-200 pb-2">Filter by Price</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="price" value="all" checked={priceRange === 'all'} onChange={(e) => setPriceRange(e.target.value)} className="hidden" />
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${priceRange === 'all' ? 'border-black' : 'border-gray-300 group-hover:border-black'}`}>
                                            {priceRange === 'all' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                                        </div>
                                        <span className="text-sm font-bold uppercase text-gray-700">All Prices</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="price" value="under1000" checked={priceRange === 'under1000'} onChange={(e) => setPriceRange(e.target.value)} className="hidden" />
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${priceRange === 'under1000' ? 'border-black' : 'border-gray-300 group-hover:border-black'}`}>
                                            {priceRange === 'under1000' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                                        </div>
                                        <span className="text-sm font-bold uppercase text-gray-700">Under ₹1000</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="price" value="1000to2000" checked={priceRange === '1000to2000'} onChange={(e) => setPriceRange(e.target.value)} className="hidden" />
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${priceRange === '1000to2000' ? 'border-black' : 'border-gray-300 group-hover:border-black'}`}>
                                            {priceRange === '1000to2000' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                                        </div>
                                        <span className="text-sm font-bold uppercase text-gray-700">₹1000 - ₹2000</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="price" value="over2000" checked={priceRange === 'over2000'} onChange={(e) => setPriceRange(e.target.value)} className="hidden" />
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${priceRange === 'over2000' ? 'border-black' : 'border-gray-300 group-hover:border-black'}`}>
                                            {priceRange === 'over2000' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                                        </div>
                                        <span className="text-sm font-bold uppercase text-gray-700">Over ₹2000</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">

                {sortedProducts.length === 0 ? (
                    <div className="py-20 text-center">
                        <h3 className="text-2xl font-black text-black uppercase mb-4">No products found</h3>
                        <p className="text-gray-500 font-bold uppercase tracking-widest">Check back later for new drops.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                        {sortedProducts.map(product => (
                            <div key={product.id} className='group flex flex-col relative bg-transparent transition-transform hover:-translate-y-1'>
                                <button onClick={() => { toggleWishlist(product); addToast(isWishlisted(product.id) ? 'Removed from Wishlist' : 'Added to Wishlist'); }} className={`absolute top-4 right-4 z-10 hover:text-red-500 transition-colors ${isWishlisted(product.id) ? 'text-red-500' : 'text-gray-400'}`}>
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
            </div>
        </div>
    )
}

export default Category
