import React from 'react'

const Contact = () => {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300 py-20 px-4">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter mb-4 text-center">
                Hit Us Up
            </h1>
            <p className="text-center text-gray-500 font-bold uppercase tracking-widest mb-12">
                Got a question? Drop it below.
            </p>

            <form className="bg-gray-50 border border-gray-200 p-8 space-y-6">
                <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-gray-600 mb-2">Name</label>
                    <input type="text" className="w-full bg-white border border-gray-300 px-4 py-4 text-black focus:outline-none focus:border-black :border-white transition-colors uppercase font-bold text-sm" placeholder="YOUR NAME" />
                </div>
                <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-gray-600 mb-2">Email</label>
                    <input type="email" className="w-full bg-white border border-gray-300 px-4 py-4 text-black focus:outline-none focus:border-black :border-white transition-colors uppercase font-bold text-sm" placeholder="YOUR EMAIL" />
                </div>
                <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-gray-600 mb-2">Message</label>
                    <textarea rows="5" className="w-full bg-white border border-gray-300 px-4 py-4 text-black focus:outline-none focus:border-black :border-white transition-colors uppercase font-bold text-sm" placeholder="WHAT'S ON YOUR MIND?"></textarea>
                </div>
                <button type="button" className="w-full bg-black text-white py-5 px-4 font-black uppercase tracking-widest hover:bg-red-500 hover:text-white :bg-red-500 transition-colors shadow-xl">
                    Send Message
                </button>
            </form>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-center border-t border-gray-200 pt-16">
                <div>
                    <h3 className="text-xl font-black text-black uppercase tracking-widest mb-2">Email Us</h3>
                    <p className="text-gray-500 font-bold">SUPPORT@APNAFASHION.IN</p>
                </div>
                <div>
                    <h3 className="text-xl font-black text-black uppercase tracking-widest mb-2">Call Us</h3>
                    <p className="text-gray-500 font-bold">+91 98765 43210</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contact
