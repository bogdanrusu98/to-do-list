import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { FaTasks } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { IoTodayOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [listings, setListings] = useState([])
  
 
    useEffect(() => {
      const fetchListings = async () => {
        try {
          const listingsArray = [];
          const querySnap = await getDocs(collection(db, 'listings'));
          querySnap.forEach((doc) => {
            listingsArray.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setListings(listingsArray); // Actualizează starea cu datele
        } catch (error) {
          console.log('Eroare', error);
        }
      };
  
      fetchListings();
    }, [navigate, listings]); // Efectul va rula o singură dată la montarea componentei

    //let inProgress = listings.filter(listings => listings.status === 'In Progress')
    //console.log('In Progess: ', inProgress)
   // console.log(listings)
    const inProgressCount = listings.filter(listings => listings.data.status === 'In Progress').length;
    const completedCount = listings.filter(listings => listings.data.status === 'Completed').length;

    let date = new Date().toLocaleDateString();
    const todayCount = listings.filter(listings => listings.data.date === date).length;

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <img
                src={require("../assets/icon.png")}
                className="h-8"
                alt="To Do List Logo"
              />

              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                To Do List
              </span>
            </div>
          </Link>
        </div>
      </nav>

      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
    
      <aside
        id="default-sidebar"
        className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaTasks />
                <span className="flex-1 ms-3 whitespace-nowrap">All Tasks</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                {listings.length}          
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/progress"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <GrInProgress />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  In Progress
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                {inProgressCount} </span>
              </Link>
            </li>
            <li>
              <Link
                to="/completed"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoMdDoneAll />
                <span className="flex-1 ms-3 whitespace-nowrap">Completed</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                 {completedCount}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/today"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoTodayOutline />
                <span className="flex-1 ms-3 whitespace-nowrap">Today</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                {todayCount}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/calendar"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CiCalendarDate />
                <span className="flex-1 ms-3 whitespace-nowrap">Calendar</span>

              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
