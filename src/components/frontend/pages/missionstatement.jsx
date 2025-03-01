
import React from "react";
import { Link, useLocation } from 'react-router-dom';
import HomeNavbar from "../../frontend/navbar";
import MenuBar from "../../frontend/menubar";
import SidebarList from "../../frontend/sidebar";
import Footer from "../../frontend/footer";
import missionImage from "../../../assets/mission big.jpg";
import ImageGallery from "../Image";

const MissionStatement = () => {
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

          <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">MissionStatement</div>
          <div className="flex justify-center items-center mb-8">
            <img src={missionImage} alt="Mission Statement" className="h-24 md:h-32 mx-auto" />
          </div>
          {/* <h1 className="text-4xl font-extrabold text-blue-900 mb-6">Our Mission</h1> */}
          <p className="text-lg text-gray-800 leading-relaxed">
            <strong>PRJ Publication</strong> is dedicated to advancing technological innovation and excellence for the benefit of humanity.
            <strong> PRJ Publication </strong> and its members inspire a global community through its publications, conferences,
            and professional and educational activities.
          </p>
          <p className="text-lg text-gray-800 leading-relaxed mt-6">
            We ensure that scientists and researchers get the recognition and rewards that they deserve and the opportunity
            to play a significant role in the global scientific community.
          </p>
        </main>
      </div>
      <ImageGallery/>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MissionStatement;