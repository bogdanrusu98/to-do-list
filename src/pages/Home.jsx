import React from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, addDoc, where, query } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase.config'
import Modal from 'react-modal';
import Listing from '../components/Listing';
import { toast } from 'react-toastify'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Home() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    importance: '',
    date: '',
  })
  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {

    const fetchUserListings = async () => {
      if (auth.currentUser) {  // Verifică dacă user-ul este definit
        const listingsRef = collection(db, 'listings');
        const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid));

        const querySnap = await getDocs(q);
        let listings = [];

        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      }
    };

    fetchUserListings();  // Se apelează doar dacă utilizatorul este autentificat

  }, [auth, navigate]);

  const {
    title,
    description,
    importance,
  } = formData


  const [modalIsOpen, setIsOpen] = React.useState(false)

  const openModal = () => {
    setIsOpen(true)
  }


  const closeModal = () => {
    setIsOpen(false);
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formDataCopy = {
      ...formData,
      status: 'In Progress',
    }

    const docRef = await addDoc(collection(db, 'listings'), formDataCopy)

    setLoading(false)
    toast.success('Listing saved')
    console.log(formDataCopy.type, docRef.id);
    navigate(`/progress`);
  };

  return (
    <>
      <div className='px-4 sm:ml-64'>
        <div className='p-4 rounded-lg dark:border-gray-700'>
          <h1 className='max-w-lg text-4xl font-semibold leading-relaxed text-gray-900 dark:text-white inline-block  me-4'>My All Tasks <span className='text-xl text-gray-500'>({listings.length})</span></h1>
          <button onClick={openModal} className='btn btn-primary'>
            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
            New Task</button>
        </div>

        <div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="New Task"
          >

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create A New Task
                </h3>
                <button type="button" onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={onSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" name="title" id="title" value={title} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type task name" required="" />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="importance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Importance</label>
                    <select id="importance" name='importance' onChange={onChange} value={importance} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option selected="" disabled>Select importance</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="importance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date picker</label>
                    <input type="date" id='date' name='date' value={formData.date} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />

                  </div>

                  <div className="col-span-2">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea id="description" name='description' onChange={onChange} value={description} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write task description here"></textarea>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                  Add new task
                </button>
              </form>
            </div>
          </Modal>
        </div>
        <div className="flex flex-wrap gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            listings && listings.length > 0 ? (
              listings.map((listing) => (
                <>
                  <Listing listing={listing.data} id={listing.id} key={listing.id} />
                </>
              ))
            ) : (
              <p>No listings found</p>
            )
          )}

        </div>





      </div>
    </>
  )
}

export default Home
