import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SidebarList = () => {
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.13:8080/api/disciplines")
      .then((response) => response.json())
      .then((data) => setJournals(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="">
        <h3
          className="text-sm font-semibold border-b-2 p-0 py-1 text-center uppercase"
          style={{ fontFamily: "Times New Roman" }}
        >
          Journals by Subject
        </h3>
        <ul className="mt-3 space-y-3 ps-0">
          {journals.map((journal, index) => (
            <li
              key={journal.id}

              onClick={() => {

                navigate(`/journals_category/${journal.id}`);
              }}

              className={`p-2 text-lg font-medium transition-all cursor-pointer rounded-sm   hover:text-cyan-400  hover:bg-gray-200 hover:scale-105 transform duration-200 ease-in-out 
        `}
              style={{ fontFamily: "Times New Roman", color: "#333" }}
            >
              {journal.name}
            </li>
          ))}
        </ul>
      </div>


    </>



  );
};

export default SidebarList;