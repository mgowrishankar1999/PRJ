
import React from "react";
import { Link, useLocation } from 'react-router-dom';
import HomeNavbar from "../../frontend/navbar";
import MenuBar from "../../frontend/menubar";
import SidebarList from "../../frontend/sidebar";
import Footer from "../../frontend/footer";
// import missionImage from "../../../assets/mission big.jpg";
import openAccessImage from "../../../assets/OPENACCESS.jpg";
import ImageGallery from "../Image";


const OpenAccess = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').filter(Boolean);
  return (
    <div className=" min-h-screen flex flex-col bg-white ">
      <div class=''>

        {/* Navbar */}
        <HomeNavbar />
        <MenuBar />
        {/* Menu Bar */}
      </div>

      <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white ">
        {/* Sidebar on Left */}
        <aside className="w-full bg-white p-2 rounded-lg shadow-sm ">
          <SidebarList />
        </aside>


        {/* Main Content */}
        <main className="w-4/1  bg-white p-8 shadow-sm flex flex-col rounded-lg ">
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

          <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">OpenAccess</div>
          <div className="flex justify-center items-center mb-8">
            <img src={openAccessImage} alt="Open Access" className="h-24 md:h-32 mx-auto" />
          </div>
          {/* <h1 className="text-4xl font-extrabold text-blue-900 mb-6 text-center">Open Access</h1> */}
          <p className="text-lg text-gray-600 leading-relaxed mb-4 font-medium text-center">
            All research articles published in <strong>PRJ Publication</strong> Open Access International Journals are immediately
            freely available to read, download, and share.
          </p>
          <div className="text-2xl font-semibold text-blue-400 mt-6">PRJ Publication Open Access Offers:</div>
          <ul className="list-disc list-inside text-lg text-gray-600 pl-6">
            <li>Freely available research on PRJ Publication International Journal website</li>
            <li>Fast and efficient publication process</li>
            <li>High-quality peer-reviewed publishing</li>
            <li>Dedicated editorial support with expert board members</li>
            <li>Comprehensive metrics for articles and institutions</li>
            <li>Easy sharing across social networks</li>
          </ul>
          <div className="text-2xl font-semibold text-blue-400 mt-6">What is Open Access?</div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Open access (OA) allows unrestricted access to peer-reviewed scholarly journal articles, theses, monographs, and book chapters.
            By removing barriers to access, it accelerates research and recognition for authors worldwide.
          </p>
          <div className="text-2xl font-semibold text-blue-400 mt-6">Benefits of Open Access</div>
          <ul className="list-disc list-inside text-lg text-gray-600 pl-6">
            <li>Provides free and open access to knowledge.</li>
            <li>Enhances research visibility and citation potential.</li>
            <li>Supports unrestricted teaching and learning.</li>
            <li>Expands readership to a global audience.</li>
            <li>Reduces financial burdens on libraries and researchers.</li>
          </ul>
          <div className="text-2xl font-semibold text-blue-400 mt-6">PRJ Publication Open Access Policy</div>
          <p className="text-lg text-gray-600 leading-relaxed">
            <strong>PRJ Publication</strong> publishes over 320+ open access, peer-reviewed journals, ensuring that all articles are
            freely available under the Creative Commons Attribution (CC BY) license. Authors retain copyright and all
            content can be freely distributed without prior permission.
          </p>
          <div className="text-2xl font-semibold text-blue-400 mt-6">Article Processing Charges</div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Open Access publishing ensures free availability but requires processing costs for reviewing, plagiarism checks,
            proofreading, copyediting, and digital preservation. Authors or their institutions cover these costs through
            an Article Processing Charge (APC).
          </p>
        </main>
      </div>
      <ImageGallery/>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OpenAccess;