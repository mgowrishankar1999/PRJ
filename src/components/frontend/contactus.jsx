//contactus.jsx

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeNavbar from './navbar';
import MenuBar from './menubar';
import Footer from './footer';
import ImageGallery from './Image';

function ContactUs() {
    const location = useLocation();
    const currentPath = location.pathname.split('/').filter(Boolean); // Extract dynamic path segments
    console.log(currentPath);
    const [contactus, setContactus] = useState([
        'Journals',
        'Special Issues',
        'Conferences',
        'Books',
        'Copyright',
    ]);

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <HomeNavbar />
                <MenuBar />

                {/* Main Content Area */}
                <div className="w-full  px-4 py-8 flex flex-col md:flex-row gap-11">
                    {/* Sidebar on Left */}
                    <aside className="w-full bg-white p-2 rounded-lg shadow-sm border-l-4 border-red-500">
                        <div>
                            <h3
                                className="text-sm font-semibold border-b-2 p-0 py-1 text-center uppercase"
                                style={{ fontFamily: 'Times New Roman' }}
                            >
                                Publication Services
                            </h3>
                            <ul className="mt-3 space-y-3 ps-0">
                                {contactus.map((contact) => (
                                    <li
                                        key={contact}
                                        className="p-2 text-lg font-medium transition-all cursor-pointer rounded-sm 
                              hover:text-cyan-400 hover:bg-gray-200 hover:scale-105 transform duration-200 
                              ease-in-out"
                                        style={{ fontFamily: 'Times New Roman', color: '#333' }}
                                    >
                                        {contact}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                    

                    {/* Main (Contact) Section */}
                    <main className="w-4/1 mx-auto bg-white p-6 shadow-sm rounded-lg border border-gray-300">
                        {/* Dynamic Breadcrumb Navigation */}
                        <div className="text-sm mb-2">
                            <Link to="/" className="text-blue-500 hover:underline">
                                Home
                            </Link>
                            {currentPath.map((segment, index) => (
                                <span key={index}>
                                    <span className="mx-1">/</span>
                                    <span className="capitalize">{segment.replace('-', ' ')}</span>
                                </span>
                            ))}
                        </div>

                        {/* Section Heading */}
                        <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">
                            CONTACT US
                        </div>

                        {/* Contact Details */}
                        <div>
                            <p className="text-lg font-normal text-gray-900">The Editor-in-Chief</p>
                            <p className="text-lg font-normal text-gray-900">QIT Press</p>

                            <p className="text-gray-700 mt-2">Chennai, India.</p>

                            <p className="text-gray-700">
                                Email:{' '}
                                <a href="mailto:editor@qitpress.com" className="text-blue-500 hover:underline">
                                    editor@qitpress.com
                                </a>
                            </p>
                            <p className="text-gray-700">
                                <a href="mailto:qitpress@gmail.com" className="text-blue-500 hover:underline">
                                    qitpress@gmail.com
                                </a>
                            </p>
                        </div>
                    </main>
                </div>
                <ImageGallery/>
                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}

export default ContactUs;