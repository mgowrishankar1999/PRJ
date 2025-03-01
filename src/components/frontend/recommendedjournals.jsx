// ------------- recommendedjournals.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import defaultCoverImage from "../../assets/prj_logo.jpg";

const RecommendedJournals = () => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const response = await axios.get("http://192.168.1.13:8080/api/journals");
                setJournals(response.data);
            } catch (error) {
                console.error("Error fetching journal data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJournals();
    }, []);

    return (
        <div className="carousel-container px-4 w-[70vw]">
            {/* <h2 className="carousel-title text-center">Recommended Journals</h2>  */}
            {loading ? (
                <p className="loading-text">Loading journals...</p>
            ) : journals.length > 0 ? (
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    breakpoints={{
                        1024: { slidesPerView: 4 },
                        768: { slidesPerView: 2 },
                        480: { slidesPerView: 1 },
                    }}
                >
                    {journals.map((journal, index) => (
                        <SwiperSlide key={journal.id}>
                            <div className="carousel-card">
                                <img
                                    src={
                                        journal.coverPage
                                            ? `http://192.168.1.13:8080/static${journal.coverPage}`
                                            : defaultCoverImage
                                    }
                                    alt={journal.journalName || "Journal Cover"}
                                    className="carousel-image w-[110%] h-[200px] transition-transform duration-200 ease-in-out hover:scale-100"
                                    onMouseEnter={(e) => {
                                        console.log("Hovered index:", index);
                                        e.target.style.transform = "scale(0.9)";
                                    }}
                                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                                    onError={(e) => (e.target.src = defaultCoverImage)}
                                />
                                <p className="journal-abbreviation text-center">{journal.abbrevation}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="no-journals-text">No journals available.</p>
            )}
        </div>
    );
};

export default RecommendedJournals;