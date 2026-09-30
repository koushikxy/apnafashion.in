import { useToast } from '../Utils/ToastContext';
﻿import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../Utils/ProductContext';
import { useAuth } from '../Utils/AuthContext';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../Utils/CartContext';
import { FaArrowLeft } from 'react-icons/fa';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const { currentUser } = useAuth();
    const [reviews, setReviews] = useState([
        { id: 1, author: 'Alex M.', text: 'Absolutely fire. The fit is perfect and the quality is insane.', rating: 5, date: '2023-10-12' },
        { id: 2, author: 'Sarah K.', text: 'Love the oversized look. Washes well without shrinking.', rating: 4, date: '2023-09-28' }
    ]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);
    const { products } = useProducts();
    const [selectedSize, setSelectedSize] = useState(null);
    
    // Find product based on URL param
    const product = products.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center text-xl font-bold bg-white text-black uppercase">
                Product not found!
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            addToast("PLEASE SELECT A SIZE", 'error');
            return;
        }
        addToCart(product, selectedSize);
        addToast(`ADDED TO CART!`);
    };

    return (
        <div className="bg-white min-h-screen transition-colors duration-300">
            <div className="w-full mx-auto px-4 md:px-8 lg:px-16 2xl:px-24 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 font-bold uppercase tracking-wider mb-8 transition-colors">
                    <FaArrowLeft /> BACK
                </Link>
                
                <div className="lg:grid lg:grid-cols-[1.3fr_1fr] lg:gap-x-16 lg:items-start relative">
                    {/* Product Image Gallery (Scrollable Left Side) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 border border-gray-200">
                            <img src={product.image} alt={product.name} className="w-full h-full object-center object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 border border-gray-200 hidden md:block">
                            <img src={product.image} alt={product.name} className="w-full h-full object-center object-cover opacity-[0.98] hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 border border-gray-200 hidden md:block">
                            <img src={product.image} alt={product.name} className="w-full h-full object-center object-cover opacity-[0.96] hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 border border-gray-200 hidden md:block">
                            <img src={product.image} alt={product.name} className="w-full h-full object-center object-cover opacity-[0.94] hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>

                    {/* Product Info (Sticky Right Side) */}
                    <div className="mt-10 px-4 sm:px-0 lg:mt-0 lg:sticky lg:top-32 border border-gray-200 p-8 shadow-sm bg-white z-10">
                        <p className="text-sm text-gray-500 font-bold tracking-widest mb-2 uppercase">{product.category}</p>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black uppercase leading-none">{product.name}</h1>
                        
                        <div className="mt-4 flex items-center gap-4">
                            <p className="text-4xl font-black text-black ">₹{product.price}</p>
                            <p className="text-xl text-gray-400 line-through font-bold">₹{Math.floor(product.price * 1.5)}</p>
                            <span className="bg-red-500 text-white font-bold text-xs px-2 py-1 uppercase">33% OFF</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 uppercase font-bold">Inclusive of all taxes</p>

                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <h3 className="text-sm text-black font-black uppercase tracking-wider mb-4">Select Size</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`border py-3 text-sm font-black uppercase transition-colors ${
                                            selectedSize === size
                                                ? 'border-black bg-black text-white '
                                                : 'border-gray-300 text-gray-900 hover:border-black :border-white'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-black border border-transparent py-5 px-8 flex items-center justify-center text-lg font-black text-white uppercase tracking-widest hover:bg-red-500 hover:text-white :bg-red-500 :text-white transition-colors focus:outline-none"
                            >
                                Add to Cart
                            </button>
                        </div>
                        
                        <div className="mt-12 border-t border-gray-200 pt-8">
                            <h3 className="text-sm text-black font-black uppercase tracking-wider mb-4">Product Details</h3>
                            <div className="text-sm text-gray-600 space-y-4 font-medium">
                                <p>Premium quality streetwear designed for maximum impact. Made from heavy-weight cotton blends, this {product.name.toLowerCase()} is a statement piece for your wardrobe.</p>
                                <ul className="list-disc pl-5 space-y-2 text-gray-500 ">
                                    <li>Oversized Boxy Fit</li>
                                    <li>High-Density Puff Print</li>
                                    <li>Machine Wash Cold</li>
                                    <li>Made in India</li>
                                </ul>
                            </div>
                        </div>
                    
                        
                        {/* Related Products Section */}
                        <div className="mt-16 border-t border-gray-200 pt-12 mb-12">
                            <h3 className="text-2xl text-black font-black uppercase tracking-tight mb-8">You May Also Like</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                {products
                                    .filter(p => p.category === product.category && p.id !== product.id)
                                    .slice(0, 4)
                                    .map(related => (
                                    <div key={related.id} className='group flex flex-col relative bg-transparent transition-transform hover:-translate-y-1'>
                                        <Link to={`/product/${related.id}`} onClick={() => window.scrollTo(0,0)} className='relative overflow-hidden aspect-[3/4] block'>
                                            <img 
                                                src={related.image} 
                                                alt={related.name} 
                                                className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500'
                                            />
                                        </Link>
                                        
                                        <div className="flex flex-col pt-4 pb-2 bg-transparent">
                                            <Link to={`/product/${related.id}`} onClick={() => window.scrollTo(0,0)}>
                                                <h3 className='font-bold text-black text-sm md:text-base uppercase truncate'>{related.name}</h3>
                                                <p className='text-gray-500 text-xs mt-1 uppercase font-semibold'>{related.category}</p>
                                            </Link>
                                            <div className="flex items-center gap-2 mt-2">
                                                <p className='font-black text-black text-lg'>₹{related.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="mt-16 border-t border-gray-200 pt-12">
                            <h3 className="text-2xl text-black font-black uppercase tracking-tight mb-8">Customer Reviews</h3>
                            
                            {currentUser ? (
                                <form 
                                    className="mb-12 bg-gray-50 p-6 border border-gray-200"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if(!reviewText.trim()) return;
                                        setReviews([{
                                            id: Date.now(),
                                            author: currentUser.name,
                                            text: reviewText,
                                            rating: rating,
                                            date: new Date().toISOString().split('T')[0]
                                        }, ...reviews]);
                                        setReviewText('');
                                        addToast('Review posted successfully!');
                                    }}
                                >
                                    <h4 className="font-black uppercase tracking-widest text-sm mb-4">Leave a Review</h4>
                                    <div className="flex gap-2 mb-4">
                                        {[1,2,3,4,5].map(star => (
                                            <button 
                                                key={star} 
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className={`text-xl ${rating >= star ? 'text-black' : 'text-gray-300'}`}
                                            >
                                                <FaStar />
                                            </button>
                                        ))}
                                    </div>
                                    <textarea 
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="What do you think about this piece?"
                                        className="w-full bg-white border border-gray-300 p-4 text-black focus:outline-none focus:border-black font-bold uppercase text-xs mb-4"
                                        rows="3"
                                    />
                                    <button type="submit" className="bg-black text-white px-8 py-3 font-black uppercase tracking-widest text-sm hover:bg-red-500 transition-colors">
                                        Post Review
                                    </button>
                                </form>
                            ) : (
                                <div className="mb-12 bg-gray-50 p-6 border border-gray-200 text-center">
                                    <p className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-4">Log in to leave a review</p>
                                    <Link to="/Login" className="inline-block bg-black text-white px-8 py-3 font-black uppercase tracking-widest text-sm hover:bg-red-500 transition-colors">
                                        Log In
                                    </Link>
                                </div>
                            )}

                            <div className="space-y-6">
                                {reviews.map(review => (
                                    <div key={review.id} className="border-b border-gray-100 pb-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-black uppercase tracking-widest text-black">{review.author}</span>
                                            <span className="text-xs font-bold text-gray-400">{review.date}</span>
                                        </div>
                                        <div className="flex text-black text-sm mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className={i < review.rating ? 'text-black' : 'text-gray-200'} />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 font-medium text-sm">{review.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;
