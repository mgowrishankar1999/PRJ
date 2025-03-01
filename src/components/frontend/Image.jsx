import React from "react";
import AcademiaLogo from "../../assets/academia.jpeg";
import SSRNLogo from "../../assets/ssrn.jpeg";
import OpenAccessLogo from "../../assets/open-access.jpeg";
import GoogleScholarLogo from "../../assets/google-scholar.png";
import ORCIDLogo from "../../assets/orcid.png";
import CrossRefLogo from "../../assets/crossref-doi.jpeg";
import SemanticScholarLogo from "../../assets/semantic-scholar.jpeg";


const ImageGallery = () => {
    // Image Data Array
    const imageData = [
        { src: AcademiaLogo, alt: "Academia" },
        { src: SSRNLogo, alt: "Elsevier SSRN" },
        { src: OpenAccessLogo, alt: "Open Access" },
        { src: GoogleScholarLogo, alt: "Google Scholar" },
        { src: ORCIDLogo, alt: "ORCID" },
        { src: CrossRefLogo, alt: "CrossRef DOI" },
        { src: SemanticScholarLogo, alt: "Semantic Scholar" },
    ];

    return (
        // <div className="min-h-[70vh] p-8">
        //     <h1 className="text-3xl font-bold text-center">Indexing & Research Platforms</h1>

        //     {/* Image Grid Layout */}
        //     <div className="grid grid-cols-2 border-box pt-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
        //         {imageData.map((item, index) => (
        //             <div
        //                 key={index}
        //                 className="flex justify-center bg-gray-40 items-center p-4 shadow-md border rounded-lg transition-transform transform hover:scale-95"
        //             >
        //                 <img src={item.src} alt={item.alt} className="h-20 w-[50px] object-contain" />
        //             </div>
        //         ))}
        //     </div>
        // </div>

        <div className="min-h-[45vh] px-6">
            {/* <h1 className="text-3xl font-bold text-center">Indexing & Research Platforms</h1> */}

            {/* Image Grid Layout */}
            <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2">
                {imageData.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-center items-center bg-white shadow-md border rounded-lg transition-transform transform hover:scale-95 h-[150px]" // Ensure all boxes are the same height
                    >
                        <img
                            src={item.src}
                            alt={item.alt}
                            className="max-w-[150px] h-[80px] object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>



    );
};

export default ImageGallery;