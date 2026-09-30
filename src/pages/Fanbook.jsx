import React from 'react';

const Fanbook = () => {
    return (
        <div className="min-h-screen py-20 px-4 bg-white transition-colors duration-300">
            <div className="w-full px-4 md:px-8 lg:px-16 2xl:px-24 mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-6xl md:text-8xl font-black text-black uppercase tracking-tighter mb-4">THE CLUB</h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest max-w-2xl mx-auto">
                        How you're styling Apna Fashion. Tag <span className="text-red-500">@ApnaFashion</span> to be featured.
                    </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div key={item} className="group relative bg-gray-100 border border-gray-200 overflow-hidden cursor-pointer">
                            <div className="aspect-[3/4]">
                                <img 
                                    src={['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80','https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80','https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80','https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80','https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80','https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=800&q=80','https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80','https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80','https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80'][item - 1]} 
                                    alt={`Lookbook ${item}`} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 hover: -0"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <p className="font-black text-white text-lg uppercase tracking-wider truncate">@STREET_{item}</p>
                                <p className="text-sm text-gray-300 font-bold mt-1">FLEXING THE NEW DROP. 🔥</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="bg-black text-white font-black uppercase tracking-widest py-4 px-10 hover:bg-red-500 hover:text-white :bg-red-500 :text-white transition-colors">
                        Load More Fits
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Fanbook;
