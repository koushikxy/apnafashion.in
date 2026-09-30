import React from 'react'

const Topnav = () => {
  return (
    <div className="bg-black text-white overflow-hidden border-b border-gray-800 flex justify-between items-center h-10">
      <div className="flex-1 overflow-hidden flex whitespace-nowrap">
          <div className="animate-marquee flex items-center text-xs font-bold tracking-[0.2em] uppercase shrink-0">
            <span className="mx-8">🔥 FLASHSALE IS LIVE</span>
            <span className="mx-8">|</span>
            <span className="mx-8">EXTRA 20% OFF ON PREPAID ORDERS</span>
            <span className="mx-8">|</span>
            <span className="mx-8">FREE SHIPPING OVER ₹999</span>
            <span className="mx-8">|</span>
            <span className="mx-8">🔥 FLASHSALE IS LIVE</span>
            <span className="mx-8">|</span>
            <span className="mx-8">EXTRA 20% OFF ON PREPAID ORDERS</span>
            <span className="mx-8">|</span>
            <span className="mx-8">FREE SHIPPING OVER ₹999</span>
            <span className="mx-8">|</span>
          </div>
          <div className="animate-marquee flex items-center text-xs font-bold tracking-[0.2em] uppercase shrink-0">
            <span className="mx-8">🔥 FLASHSALE IS LIVE</span>
            <span className="mx-8">|</span>
            <span className="mx-8">EXTRA 20% OFF ON PREPAID ORDERS</span>
            <span className="mx-8">|</span>
            <span className="mx-8">FREE SHIPPING OVER ₹999</span>
            <span className="mx-8">|</span>
            <span className="mx-8">🔥 FLASHSALE IS LIVE</span>
            <span className="mx-8">|</span>
            <span className="mx-8">EXTRA 20% OFF ON PREPAID ORDERS</span>
            <span className="mx-8">|</span>
            <span className="mx-8">FREE SHIPPING OVER ₹999</span>
            <span className="mx-8">|</span>
          </div>
      </div>
      <div className="hidden md:flex items-center bg-black px-6 h-full border-l border-gray-800 z-10 shrink-0">
        <span className="text-[10px] font-black tracking-widest uppercase cursor-pointer hover:text-red-500 transition-colors">EN / ₹ INR</span>
      </div>
    </div>
  )
}

export default Topnav
