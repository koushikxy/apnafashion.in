import React from 'react';
import { useToast } from '../Utils/ToastContext';
import { useWishlist } from '../Utils/WishlistContext';
import { useCart } from '../Utils/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Wishlist = () => {
    const { wishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { addToast } = useToast();

    if (wishlist.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-white transition-colors">
                <div className="text-center max-w-md w-full">
                    <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-4">WISHLIST IS EMPTY</h2>
                    <p className="text-gray-500 uppercase font-bold text-sm tracking-widest mb-8">Save your favorites for later.</p>
                    <Link to="/" className="inline-block bg-black text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors shadow-xl">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen transition-colors duration-300 pb-20">
                {/* Wishlist Hero Header */}
            <div className="w-full bg-black py-16 px-4 text-center border-b border-gray-800 mb-12">
                <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter uppercase">
                    WISHLIST
                </h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest mt-4">
                    Your saved items.
                </p>
            </div>
            
            <div className="w-full mx-auto px-4 md:px-8 lg:px-16 2xl:px-24">
                <div className='flex justify-between items-center mb-8 border-b border-gray-200 pb-4'>
                    <h2 className='text-3xl font-black tracking-tight text-black uppercase'>All Saved</h2>
                    <span className="text-sm font-bold text-gray-500 uppercase">{wishlist.length} Styles</span>
                </div>
                
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                    {wishlist.map(product => (
                        <div key={product.id} className='group flex flex-col relative bg-transparent transition-transform hover:-translate-y-1'>
                            <button 
                                onClick={() => toggleWishlist(product)} 
                                className="absolute top-4 right-4 z-10 text-red-500 hover:text-black transition-colors"
                            >
                                <FaTrash className="text-xl" />
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
                                    <p className='text-gray-400 text-sm line-through font-bold'>₹{Math.floor(product.price * 1.5)}</p>
                                </div>
                            </div>

                            <div className='absolute inset-x-0 bottom-24 p-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto flex justify-center'>
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToCart(product, product.sizes[0]);
                                        addToast('Added to cart!');
                                    }}
                                    className='w-[90%] bg-black text-white font-black uppercase tracking-wider py-3 shadow-xl hover:bg-red-500 transition-colors'
                                >
                                    Move to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
