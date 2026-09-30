import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const Headerslider = () => {
    return (
        <div className='relative w-full h-[85vh] bg-black overflow-hidden'>
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className='w-full h-full'
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className='relative w-full h-full'>
                        <img 
                            src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1920&q=80" 
                            alt="Summer Collection" 
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-16 bg-gradient-to-r from-black/80 to-transparent">
                            <h2 className="text-red-500 font-bold tracking-[0.3em] uppercase mb-2 text-sm md:text-base">New Drop</h2>
                            <h1 className="text-white text-5xl md:text-7xl font-black uppercase leading-tight mb-6 max-w-2xl">URBAN<br/>STREETWEAR</h1>
                            <Link to="/Offer" className="bg-white text-black font-bold uppercase tracking-wider text-sm px-10 py-4 hover:bg-gray-200 transition-colors duration-300">
                                Shop Collection
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className='relative w-full h-full'>
                        <img 
                            src="https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=1920&q=80" 
                            alt="Menswear" 
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-16 bg-gradient-to-r from-black/80 to-transparent">
                            <h2 className="text-red-500 font-bold tracking-[0.3em] uppercase mb-2 text-sm md:text-base">Trending Now</h2>
                            <h1 className="text-white text-5xl md:text-7xl font-black uppercase leading-tight mb-6 max-w-2xl">FRESH<br/>KICKS</h1>
                            <Link to="/Offer" className="bg-white text-black font-bold uppercase tracking-wider text-sm px-10 py-4 hover:bg-gray-200 transition-colors duration-300">
                                Explore
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Headerslider
