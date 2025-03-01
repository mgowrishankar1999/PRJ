import { useState, useRef, useEffect } from 'react';
import Sidebar from '../Admin/sidebar';
import Navbar from '../Admin/navbar'
function Home() {

    return (
        <div className="flex h-screen bg-gray-100 ">
            <Sidebar />

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col mt-20  ">
                <Navbar />
                {/* DASHBOARD CARDS */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                    {/* Card 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                        <div className="bg-blue-500 p-4 rounded-full text-white">
                            <span className="material-icons">shopping_cart</span>
                        </div>
                        <div>
                            <h3 className="text-gray-600">Orders</h3>
                            <p className="text-xl font-bold">1,250</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                        <div className="bg-green-500 p-4 rounded-full text-white">
                            <span className="material-icons">attach_money</span>
                        </div>
                        <div>
                            <h3 className="text-gray-600">Revenue</h3>
                            <p className="text-xl font-bold">$50,000</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                        <div className="bg-yellow-500 p-4 rounded-full text-white">
                            <span className="material-icons">people</span>
                        </div>
                        <div>
                            <h3 className="text-gray-600">Customers</h3>
                            <p className="text-xl font-bold">8,500</p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                        <div className="bg-red-500 p-4 rounded-full text-white">
                            <span className="material-icons">bar_chart</span>
                        </div>
                        <div>
                            <h3 className="text-gray-600">Growth</h3>
                            <p className="text-xl font-bold">15%</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;
