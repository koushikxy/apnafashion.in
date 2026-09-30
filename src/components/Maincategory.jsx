import { useToast } from '../Utils/ToastContext';
import React from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../Utils/ProductContext'
import { useCart } from '../Utils/CartContext'
import { useWishlist } from '../Utils/WishlistContext'
import { FaRegHeart, FaHeart } from 'react-icons/fa'

const Maincategory = () => {
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const { products } = useProducts();
    const { toggleWishlist, isWishlisted } = useWishlist();
    
    return (
        <div className='w-full py-12 bg-white transition-colors'>
            <div className='w-full mx-auto px-4 md:px-8 lg:px-16 2xl:px-24'>
                <div className='flex justify-between items-center mb-8'>
                    <h2 className='text-2xl md:text-4xl font-black text-black uppercase tracking-tight'>TRENDING NOW</h2>
                    <Link to="/Offer" className="text-sm font-bold text-red-500 uppercase hover:text-red-400 transition-colors">
                        View All
                    </Link>
                </div>
                
                <div className='grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6'>
                    {products.slice(0, 5).map(product => (
                        <div key={product.id} className='group flex flex-col relative bg-transparent transition-transform hover:-translate-y-1'>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleWishlist(product);
                                }} 
                                className={`absolute top-4 right-4 z-10 transition-colors ${isWishlisted(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                            >
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

export default Maincategory
