import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { Avatar, Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import { useUser } from '../hooks/userContext';

function Navbar() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const user = useUser()

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
  }, [navigate, listings]);


  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    toast.success('Logged out');
    navigate('/');
  };
  return (
    <>
      <nav className="relative top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <Link to='/' className="flex ms-2 md:me-24">
                <img src={require("../assets/icon.png")} className="h-8" alt="To Do List Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white ms-4"> To Do List
                </span>
              </Link>
            </div>

            {user ? (
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={<Avatar alt="User settings" img={user.photoURL ? user.photoURL : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"} rounded={true} />}
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user.displayName}</span>
                  <span className="block truncate text-sm font-medium">{user.email}</span>
                </Dropdown.Header>
                <Dropdown.Item>
                  <Link to='/profile'>
                    Settings
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            ) : (

              'You are not logged in'
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
