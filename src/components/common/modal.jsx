// import React from "react";

// const Modal = ({ show, type, message, onClose }) => {
//     if (!show) return null; // Don't render if `show` is false

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//             <div className={`p-6 rounded-lg shadow-lg text-white ${type === "success" ? "bg-green-500" : "bg-red-500"}`}>
//                 <h3 className="text-lg font-bold">{type === "success" ? "Success!" : "Error!"}</h3>
//                 <p>{message}</p>
//                 <button
//                     onClick={onClose}
//                     className="mt-3 bg-white text-gray-800 px-4 py-2 rounded"
//                 >
//                     Close
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Modal;
import React from "react";
import { IoClose } from "react-icons/io5"; // Import close icon

const Modal = ({ show, type, message, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-[2px] z-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-lg w-[50vw] h-[50vh] flex flex-col justify-center items-center">
                
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                >
                    <IoClose />
                </button>

                {/* Content */}
                <div className="text-center">
                    <h3 className={`text-2xl font-bold ${type === "success" ? "text-green-700" : "text-red-700"}`}>
                        {type === "success" ? "✅ Success!" : "❌ Error!"}
                    </h3>
                    
                    <p className="text-gray-700 mt-2 text-lg">{message}</p>

                    {/* Additional Description */}
                    <p className="text-gray-500 mt-4 text-sm">
                        {type === "success"
                            ? "Your action has been successfully completed."
                            : "Something went wrong. Please try again later."
                        }
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={onClose}
                        className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;


