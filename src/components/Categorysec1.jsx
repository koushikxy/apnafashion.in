import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'New Arrivals', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80' },
    { name: 'Best Sellers', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=400&q=80' },
    { name: 'Oversized Tees', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80' },
    { name: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80' },
    { name: 'Bottoms', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1521369909029-2afed882ba54?w=400&q=80' }
];

const Categorysec1 = () => {
    return (
        <div className="bg-white transition-colors duration-300">
            <div className='w-full mx-auto px-4 md:px-8 lg:px-16 2xl:px-24 py-12 md:pt-16 pb-8'>
                <div className='grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 cursor-pointer'>
                    {categories.map((cat, idx) => (
                        <Link to='/category/men' key={idx} className='group flex flex-col items-center'>
                            <div className="overflow-hidden rounded-full border-2 border-transparent hover:border-black transition-colors bg-gray-50 w-full aspect-square">
                                <img className='w-full h-full object-cover transform group-hover:scale-110 transition duration-500' src={cat.image} alt={cat.name} />
                            </div>
                            <h1 className='text-[10px] md:text-xs font-black text-center mt-4 text-black uppercase tracking-widest group-hover:text-red-500 transition-colors'>{cat.name}</h1>
                        </Link>
                    ))}
                </div>
            </div>
            <Link to='/Offer' className='block relative w-full border-y border-gray-200'>
                <img className='w-full h-40 md:h-[400px] object-cover' src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80" alt="Flat 40% Off" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 pointer-events-none">
                    <h2 className="text-white font-black text-4xl md:text-6xl tracking-widest uppercase drop-shadow-2xl">FLAT 40% OFF</h2>
                    <p className="text-white font-bold tracking-[0.3em] uppercase mt-2 drop-shadow-xl text-xs md:text-base">ON PREPAID ORDERS</p>
                </div>
            </Link>
        </div>
    )
}

export default Categorysec1
