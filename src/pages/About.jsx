import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-white transition-colors duration-300 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="border-l-8 border-red-500 pl-8 mb-12">
                    <h1 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none mb-4">
                        We Are<br/>Apna Fashion
                    </h1>
                    <p className="text-xl font-bold text-gray-500 uppercase tracking-widest">
                        The New Standard in Urban Streetwear.
                    </p>
                </div>
                
                <div className="space-y-8 text-black font-medium text-lg leading-relaxed">
                    <p>
                        We didn't start this to fit in. We started this to break the mold. <span className="font-black uppercase bg-red-500 text-white px-2">Apna Fashion</span> is for the creators, the rule-breakers, and the ones who dictate their own style.
                    </p>
                    <p>
                        Founded with a raw passion for streetwear and a hatred for overpriced, mass-produced fast fashion, we set out to create something different. Heavyweight fabrics, aggressive silhouettes, and unapologetic designs.
                    </p>
                    <div className="bg-gray-100 p-8 border border-gray-200 my-12">
                        <h2 className="text-2xl font-black uppercase tracking-widest mb-4">Our Core Values</h2>
                        <ul className="list-disc pl-5 space-y-2 font-bold text-gray-600 uppercase tracking-wider text-sm">
                            <li>Zero Compromise on Quality</li>
                            <li>Unapologetic Design</li>
                            <li>Community First, Always</li>
                        </ul>
                    </div>
                    <p>
                        This isn't just clothing. It's a uniform for the modern street. Join the club.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
