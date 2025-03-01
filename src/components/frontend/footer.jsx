//footer.jsx


import React, { useState, useEffect } from 'react';
import logo1 from '../../assets/PRJ_RESEARCHLOGO.gif';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button if scrolled more than 100px
      if (window.pageYOffset > 100) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#616161] text-white pt-4">
      <div className="w-[100%] px-4 mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Logo Section */}
        <div className="flex flex-col ">
          <img src={logo1} alt="PRJ Publications" className="rounded h-[20%] w-[60%]" />
          <p className="mt-2">PRJ Publication</p>
          <p className="mt-1 text-sm">Tel:</p>
          <p className="text-sm">
            Email:{' '}
            <a href="mailto:prj@gmail.com" className="text-blue-400 hover:underline">
              prj@gmail.com
            </a>
          </p>
          <p className="text-sm">prj@gmail.com</p>
        </div>

        {/* Quick Links 1 */}
        <div>
          <h4 className="text-lg font-semibold border-b-2  border-green-400 pb-1 mb-4">QUICK LINKS</h4>
          <ul className="space-y-2  text-sm">
            <li onClick={() => navigate('/aboutus')} className="hover:text-blue-500 cursor-pointer">About</li>
            <li onClick={() => navigate('/journallist')} className="hover:text-blue-500 cursor-pointer">Journals</li>
            <li className="hover:text-blue-500 cursor-pointer">Author Info</li>
            <li className="hover:text-blue-500 cursor-pointer">Articles</li>
            <li className="hover:text-blue-500 cursor-pointer">Special Issue</li>
            <li onClick={() => navigate('/newsevents')} className="hover:text-blue-500 cursor-pointer">News</li>
            <li onClick={() => navigate('/contactus')}  className="hover:text-blue-500 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Quick Links 2 */}
        <div>
          <h4 className="text-lg font-semibold border-b-2 border-yellow-400 pb-1 mb-4">QUICK LINKS</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-500 cursor-pointer">Careers</li>
            <li className="hover:text-blue-500 cursor-pointer">Downloads</li>
            <li className="hover:text-blue-500 cursor-pointer">Publication Fee</li>
            <li className="hover:text-blue-500 cursor-pointer">Payment Policy</li>
            <li className="hover:text-blue-500 cursor-pointer">Indexing Policy</li>
            <li className="hover:text-blue-500 cursor-pointer">Article Removal Fee</li>
          </ul>
        </div>

        {/* Publication Services */}
        <div>
          <h4 className="text-lg font-semibold border-b-2 border-blue-400 pb-1 mb-4">PUBLICATION SERVICES</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-500 cursor-pointer">Disclaimer of Warranties and Liability</li>
            <li className="hover:text-blue-500 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-blue-500 cursor-pointer">Terms &amp; Conditions</li>
            <li className="hover:text-blue-500 cursor-pointer">Testimonials</li>
            <li className="hover:text-blue-500 cursor-pointer">Site Map</li>
            <li className="hover:text-blue-500 cursor-pointer">FAQ's</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center text-sm border-t border-gray-500 pt-4 bottom-0">
        <p>
          <span className="text-red-400 font-bold">PRJ Publication</span> | All rights reserved 2022 - PRJ Publications
        </p>
        {/* Social Icons */}
        {/* <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram"></i>
          </a>
        </div> */}
        {/* Scroll to Top Button - only show when scrolled down */}
        {showScroll && (
          <button
            onClick={handleScrollToTop}
            className="fixed rounded bottom-6 right-6 bg-blue-500 text-white p-2  shadow-md hover:bg-blue-600 transition transform hover:scale-110"
            style={{ animation: 'fadeIn 1s ease-out' }}
          >
            <i className="fas fa-arrow-up"></i> TOP
          </button>
        )}
      </div>
      {/* Inline CSS for the fadeIn animation */}
      {/* <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style> */}
    </footer>
  );
};

export default Footer;