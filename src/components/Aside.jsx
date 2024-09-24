import { useNavigate } from "react-router-dom";
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
import { useUser } from '../hooks/userContext';


function Aside() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([])
  const user = useUser()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsArray = [];
        // Creezi o interogare cu filtrul where
        const q = query(
          collection(db, 'listings'),
          where('userRef', '==', user.uid) // Condiție pentru a filtra doar documentele utilizatorului curent
        );

        // Apoi folosești interogarea `q` pentru a obține documentele
        const querySnap = await getDocs(q);

        // Iterezi prin documentele returnate
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

  let date = new Date().toISOString().split('T')[0]
  const todayCount = listings.filter(listings => listings.data.date === date).length;
  return (
    <>

      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
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
  )
}

export default Aside
