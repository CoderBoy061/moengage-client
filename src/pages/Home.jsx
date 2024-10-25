// import { useEffect, useState } from "react";
// import { statusCodes } from "../assets/statusCodes";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../redux/action/user-action";
// import { addList } from "../redux/action/list-action";
// const Home = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredStatusCodes, _] = useState(statusCodes);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   return (
//     <div className="h-full w-full ">
//       <div className=" flex items-center justify-between pt-5 px-10 shadow-md ">
//         <header className="bg-white w-full">
//           <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
//             <div className="flex flex-1 items-center justify-end md:justify-between">
//               <nav aria-label="Global" className="hidden md:block">
//                 <ul className="flex items-center gap-6 text-lg cursor-pointer">
//                   <li onClick={() => navigate("/")}>
//                     <p className="text-gray-500 transition hover:text-gray-500/75">
//                       Home
//                     </p>
//                   </li>
//                   <li onClick={() => navigate("/list")}>
//                     <p className="text-gray-500 transition hover:text-gray-500/75">
//                       My Saved List
//                     </p>
//                   </li>
//                 </ul>
//               </nav>

//               <div className="flex items-center gap-4">
//                 <div className="sm:flex sm:gap-4">
//                   <input
//                     type="text"
//                     placeholder="Type 200 to get 200 responses"
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="block w-80 rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   />
//                   <button
//                     className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
//                     onClick={() => dispatch(logoutUser())}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>
//       </div>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 lg:gap-8 p-10 ml-5">
//         {
//           // Filter the status codes based on the search query
//           filteredStatusCodes
//             .filter((statusCode) => statusCode.toString().includes(searchQuery))
//             .map((statusCode, index) => (
//               <div key={index} onClick={() => navigate(`/list/${statusCode}`)} className="cursor-pointer">
//                 <img
//                   alt=""
//                   src={`https://http.dog/${statusCode}.jpg`}
//                   className="h-52 w-full object-cover sm:h-80 lg:h-96"
//                 />

//                 {/* <div className="flex items-center gap-10 pt-4">
//                   <button
//                     onClick={() => navigate(`/list/${statusCode}`)}
//                     className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                   >
//                     Details
//                   </button>
//                   <button

//                   disabled={loading}
//                   // onClick={()=>dispatch(addList( ,`https://http.dog/${statusCode}.jpg`))}
                  
//                   className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
//                     Save to List
//                   </button>
//                 </div> */}
//               </div>
//             ))
//         }
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useState } from "react";
import { statusCodes } from "../assets/statusCodes";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/action/user-action";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStatusCodes] = useState(statusCodes);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="h-full w-full ">
      <div className="flex items-center justify-between pt-5 px-4 shadow-md sm:px-10">
        <header className="bg-white w-full">
          <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex flex-1 items-center mr-3">
              <button
                className="md:hidden"
                onClick={() => setIsNavOpen(!isNavOpen)}
              >
                
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>

              {/* Navigation Links for Mobile */}
              {isNavOpen && (
                <nav className="absolute top-16 left-0 right-0 bg-white shadow-md z-10">
                  <ul className="flex flex-col items-center p-4">
                    <li onClick={() => navigate("/")}>
                      <p className="text-gray-500 transition hover:text-gray-500/75 p-2">
                        Home
                      </p>
                    </li>
                    <li onClick={() => navigate("/list")}>
                      <p className="text-gray-500 transition hover:text-gray-500/75 p-2">
                        My Saved List
                      </p>
                    </li>
                  </ul>
                </nav>
              )}

              {/* Navigation Links for Larger Screens */}
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-4 text-lg cursor-pointer">
                  <li onClick={() => navigate("/")}>
                    <p className="text-gray-500 transition hover:text-gray-500/75">
                      Home
                    </p>
                  </li>
                  <li onClick={() => navigate("/list")}>
                    <p className="text-gray-500 transition hover:text-gray-500/75">
                      My Saved List
                    </p>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <input
                type="text"
                placeholder="Type 200 to get 200 responses"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full sm:w-80 rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button
                className="block rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700"
                onClick={() => dispatch(logoutUser())}
              >
                Logout
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="grid grid-cols-1 gap-5 p-4 sm:p-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {filteredStatusCodes
          .filter((statusCode) => statusCode.toString().includes(searchQuery))
          .map((statusCode, index) => (
            <div key={index} onClick={() => navigate(`/list/${statusCode}`)} className="cursor-pointer">
              <img
                alt=""
                src={`https://http.dog/${statusCode}.jpg`}
                className="h-auto w-full object-cover rounded-md"
              />
              {/* Optional Buttons for Details and Save */}
              {/* <div className="flex items-center gap-2 pt-4">
                <button
                  onClick={() => navigate(`/list/${statusCode}`)}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                >
                  Details
                </button>
                <button
                  disabled={loading}
                  onClick={() => dispatch(addList(statusCode, `https://http.dog/${statusCode}.jpg`))}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                >
                  Save to List
                </button>
              </div> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;

