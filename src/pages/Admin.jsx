import React, { useState } from 'react';
import { useProducts } from '../Utils/ProductContext';
import { useOrders } from '../Utils/OrderContext';
import { useToast } from '../Utils/ToastContext';
import { FaTrash, FaBoxOpen, FaChartLine, FaShoppingBag } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

const Admin = () => {
    const { products, addProduct, deleteProduct } = useProducts();
    const { orders, updateOrderStatus } = useOrders();
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState('overview');
    const [isAdding, setIsAdding] = useState(false);

    // Metrics calculation
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const inventoryCount = products.length;
    const averageOrderValue = totalOrders > 0 ? Math.floor(totalRevenue / totalOrders) : 0;

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newProduct = {
            id: Date.now(),
            name: e.target.name.value,
            category: e.target.category.value.toUpperCase(),
            price: Number(e.target.price.value),
            image: e.target.image.value || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80',
            sizes: ['S', 'M', 'L']
        };
        addProduct(newProduct);
        addToast('PRODUCT ADDED SUCCESSFULLY!');
        setIsAdding(false);
        e.target.reset();
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-black text-white p-6 flex flex-col min-h-[20vh] md:min-h-screen">
                <h1 className="text-2xl font-black uppercase tracking-tighter mb-12 border-b border-gray-800 pb-4">Command<br/>Center</h1>
                <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
                    <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 px-4 py-3 font-bold uppercase tracking-widest text-xs transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}>
                        <FaChartLine /> Overview
                    </button>
                    <button onClick={() => setActiveTab('inventory')} className={`flex items-center gap-3 px-4 py-3 font-bold uppercase tracking-widest text-xs transition-colors whitespace-nowrap ${activeTab === 'inventory' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}>
                        <FaShoppingBag /> Inventory
                    </button>
                    <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-3 px-4 py-3 font-bold uppercase tracking-widest text-xs transition-colors whitespace-nowrap ${activeTab === 'orders' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}>
                        <FaBoxOpen /> Orders
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-12 w-full mx-auto max-w-[1600px]">
                <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-8">
                    {activeTab === 'overview' ? 'Dashboard Overview' : activeTab === 'inventory' ? 'Inventory Management' : 'Order Fulfillment'}
                </h2>

                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-6 border border-gray-200 shadow-sm hover:-translate-y-1 transition-transform">
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Total Revenue</p>
                                <p className="text-4xl font-black text-black">₹{totalRevenue.toLocaleString()}</p>
                                <p className="text-green-500 text-xs font-bold uppercase mt-2">+12% this week</p>
                            </div>
                            <div className="bg-white p-6 border border-gray-200 shadow-sm hover:-translate-y-1 transition-transform">
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Total Orders</p>
                                <p className="text-4xl font-black text-black">{totalOrders}</p>
                                <p className="text-green-500 text-xs font-bold uppercase mt-2">+5% this week</p>
                            </div>
                            <div className="bg-white p-6 border border-gray-200 shadow-sm hover:-translate-y-1 transition-transform">
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Active Inventory</p>
                                <p className="text-4xl font-black text-black">{inventoryCount}</p>
                                <p className="text-gray-400 text-xs font-bold uppercase mt-2">Across all categories</p>
                            </div>
                            <div className="bg-white p-6 border border-gray-200 shadow-sm hover:-translate-y-1 transition-transform">
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Avg Order Value</p>
                                <p className="text-4xl font-black text-black">₹{averageOrderValue.toLocaleString()}</p>
                                <p className="text-green-500 text-xs font-bold uppercase mt-2">+2% this week</p>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white border border-gray-200 shadow-sm p-8">
                            <h3 className="text-xl font-black text-black uppercase tracking-widest mb-6">Recent Activity</h3>
                            {orders.length === 0 ? (
                                <p className="text-gray-500 font-bold text-xs uppercase">No recent activity.</p>
                            ) : (
                                <div className="space-y-4">
                                    {orders.slice(0, 5).map(order => (
                                        <div key={order.id} className="flex justify-between items-center border-b border-gray-100 pb-4">
                                            <div>
                                                <p className="font-black text-sm uppercase text-black">Order #{order.id}</p>
                                                <p className="text-xs font-bold text-gray-500 uppercase mt-1">{order.email || 'Guest'}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-sm text-black">₹{order.total}</p>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 mt-1 inline-block ${order.status === 'Pending' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'inventory' && (
                    <>
                        <div className="mb-6 flex justify-between items-center">
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">{products.length} Products Available</p>
                            <button onClick={() => setIsAdding(!isAdding)} className="bg-black text-white px-6 py-3 font-black uppercase tracking-widest text-xs hover:bg-red-500 transition-colors flex items-center gap-2 shadow-lg">
                                <FaPlus /> {isAdding ? 'Cancel' : 'Add Product'}
                            </button>
                        </div>

                        {isAdding && (
                            <div className="bg-white p-8 border border-gray-200 mb-8 shadow-xl">
                                <h3 className="text-xl font-black text-black uppercase tracking-widest mb-6">Create New Product</h3>
                                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Product Name</label>
                                        <input name="name" required className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black uppercase font-bold text-xs transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Category</label>
                                        <select name="category" className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black uppercase font-bold text-xs transition-colors">
                                            <option>MEN</option>
                                            <option>WOMEN</option>
                                            <option>KIDS</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Price (')</label>
                                        <input name="price" type="number" required className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black uppercase font-bold text-xs transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Image URL</label>
                                        <input name="image" type="url" required className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-black focus:outline-none focus:border-black uppercase font-bold text-xs transition-colors" placeholder="https://images.unsplash.com/..." />
                                    </div>
                                    <div className="md:col-span-2 mt-2">
                                        <button type="submit" className="w-full bg-black text-white font-black uppercase tracking-widest py-4 hover:bg-red-500 transition-colors shadow-lg">
                                            Publish Product
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Product Inventory Table */}
                        <div className="bg-white border border-gray-200 overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50">
                                            <th className="p-4 text-xs font-black uppercase tracking-widest text-gray-500">Product</th>
                                            <th className="p-4 text-xs font-black uppercase tracking-widest text-gray-500">Category</th>
                                            <th className="p-4 text-xs font-black uppercase tracking-widest text-gray-500">Price</th>
                                            <th className="p-4 text-xs font-black uppercase tracking-widest text-gray-500 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                <td className="p-4 flex items-center gap-4">
                                                    <img src={product.image} alt={product.name} className="w-12 h-16 object-cover bg-gray-100" />
                                                    <span className="font-bold text-black uppercase text-sm">{product.name}</span>
                                                </td>
                                                <td className="p-4 font-bold text-gray-500 uppercase text-xs">{product.category}</td>
                                                <td className="p-4 font-black text-black">₹{product.price}</td>
                                                <td className="p-4 text-right">
                                                    <button onClick={() => deleteProduct(product.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'orders' && (
                    <div className="bg-white border border-gray-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="p-4 text-xs font-black uppercase tracking-widest text-gray-500">Order ID</th>
                                        <th className="p-4 text-xs font-black uppercase tracking-widest text-gray-500">Customer</th>
                                        <th className="p-4 text-xs font-black uppercase tracking-widest text-gray-500">Date</th>
                                        <th className="p-4 text-xs font-black uppercase tracking-widest text-gray-500">Total</th>
                                        <th className="p-4 text-xs font-black uppercase tracking-widest text-gray-500">Status</th>
                                        <th className="p-4 text-xs font-black uppercase tracking-widest text-gray-500 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-black text-black text-sm">#{order.id}</td>
                                            <td className="p-4 font-bold text-black uppercase text-xs">{order.email || 'Guest'}</td>
                                            <td className="p-4 font-bold text-gray-500 text-xs uppercase">{new Date(order.date).toLocaleDateString()}</td>
                                            <td className="p-4 font-black text-black">₹{order.total}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white ${order.status === 'Pending' ? 'bg-red-500' : order.status === 'Shipped' ? 'bg-blue-500' : 'bg-green-500'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <select 
                                                    value={order.status} 
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-black text-xs font-bold uppercase px-2 py-1 focus:outline-none focus:border-black cursor-pointer transition-colors"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="p-16 text-center">
                                                <FaBoxOpen className="mx-auto text-4xl text-gray-300 mb-4" />
                                                <p className="font-bold text-gray-500 uppercase tracking-widest">No orders yet.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Admin;
