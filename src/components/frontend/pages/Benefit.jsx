import React from "react";
import { Link, useLocation } from 'react-router-dom';
import HomeNavbar from "../../frontend/navbar";
import MenuBar from "../../frontend/menubar";
import SidebarList from "../../frontend/sidebar";
import Footer from "../../frontend/footer";
import benefitImage from "../../../assets/benefits.jpg";
import ImageGallery from "../Image";


const Benefits = () => {
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

          <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">Benefits</div>
          <div className="flex justify-between items-center mb-6">
            <img src={benefitImage} alt="Benefits" className="h-20 md:h-32" />
          </div>
          {/* <h1 className="text-3xl font-extrabold text-blue-900 text-center mb-6">
            Benefits of Publishing with PRJ Publication
          </h1> */}
          <p className="text-lg text-gray-800 leading-relaxed mb-3">
            At <strong>PRJ Publication</strong>, we continue to work hard to support our authors who trust us with their works.
            Here are just some of the benefits we provide:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li><strong>Open Access:</strong> Our research is freely available to all, from the time of publication. No subscription required.</li>
            <li><strong>High Visibility:</strong> Articles published in PRJ Publication reach the widest possible audience.</li>
            <li><strong>Rapid Publication:</strong> Timeframe between acceptance and publication is about one week.</li>
            <li><strong>Rigorous Peer-Review:</strong> Experienced editors and reviewers ensure high-quality feedback.</li>
            <li><strong>Post-Publication Comments:</strong> Readers and authors can exchange ideas directly.</li>
            <li><strong>International Readership:</strong> Articles are accessed from over 200 countries worldwide.</li>
            <li><strong>Promotion & Press Coverage:</strong> Articles are included in alerts and email updates.</li>
            <li><strong>Access & Reach:</strong> We submit journals to all major abstracting and indexing services.</li>
            <li><strong>Flexibility:</strong> Publish at your convenience with PRJ Publication.</li>
            <li><strong>Copyright Retention:</strong> Authors retain full copyright and have unrestricted use and distribution rights.</li>
          </ul>
        </main>
      </div>
            <ImageGallery/>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Benefits;