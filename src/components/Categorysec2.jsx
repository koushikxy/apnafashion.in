import React from 'react';
import { Link } from 'react-router-dom';

const Categorysec2 = () => {
  return (
    <div className='w-full mx-auto px-4 md:px-8 lg:px-16 2xl:px-24 mb-16'>
        <div className='flex justify-between items-center mb-8 border-b border-gray-200 pb-4'>
            <h2 className='text-3xl font-black tracking-tight text-black uppercase'>Curated Looks</h2>
            <Link to="/Fanbook" className="text-sm font-bold text-red-500 uppercase hover:text-red-400 transition-colors">
                View The Club
            </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Left Large Image */}
            <Link to="/category/men" className='w-full h-full group overflow-hidden border border-gray-200 bg-gray-50 relative block aspect-square md:aspect-auto'>
                <img className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-700" src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80" alt="Menswear Look" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-500"></div>
                <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-4xl font-black uppercase tracking-tight">Urban Utility</h3>
                    <p className="font-bold uppercase tracking-widest mt-2">Shop The Look</p>
                </div>
            </Link>

            {/* Right Grid */}
            <div className='grid grid-cols-2 gap-4'>
                <Link to="/category/women" className="group overflow-hidden border border-gray-200 bg-gray-50 relative aspect-square block">
                    <img className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-700" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80" alt="Look 1" />
                </Link>
                <Link to="/category/men" className="group overflow-hidden border border-gray-200 bg-gray-50 relative aspect-square block">
                    <img className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-700" src="https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=500&q=80" alt="Look 2" />
                </Link>
                <Link to="/category/women" className="group overflow-hidden border border-gray-200 bg-gray-50 relative aspect-square block">
                    <img className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-700" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80" alt="Look 3" />
                </Link>
                <Link to="/category/men" className="group overflow-hidden border border-gray-200 bg-gray-50 relative aspect-square block">
                    <img className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-700" src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80" alt="Look 4" />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Categorysec2
