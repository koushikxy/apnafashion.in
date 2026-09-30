import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-white text-center">
            <h1 className="text-9xl font-black text-black tracking-tighter mb-4">404</h1>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-6">Page Not Found</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-10 max-w-md mx-auto">
                The style you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="inline-block bg-black text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-red-500 transition-colors shadow-xl">
                Return Home
            </Link>
        </div>
    );
};

export default NotFound;
