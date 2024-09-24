import React from 'react'
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { collection, doc, getDocs, addDoc, where, query } from 'firebase/firestore'
import { db } from '../firebase.config'
import Modal from 'react-modal';
import { MdDateRange } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import Listing from '../components/Listing';

function Today() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  let date = new Date().toISOString().split('T')[0]


  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsArray = [];
        const q = query(collection(db, 'listings'), where('date', '==', date));
        const querySnap = await getDocs(q);
        querySnap.forEach((doc) => {
          listingsArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listingsArray); // Actualizează starea cu datele
        setLoading(false); // Setează loading la false
      } catch (error) {
        console.log('Eroare', error);
      }
    };

    fetchListings();
  }, []); // Efectul va rula o singură dată la montarea componentei
  return (
    <>
      <div className='px-4 sm:ml-64'>
        <div className='p-4 rounded-lg dark:border-gray-700'>
          <h1 className='max-w-lg text-4xl font-semibold leading-relaxed text-gray-900 dark:text-white inline-block  me-4'>Today <span className='text-xl text-gray-500'>({listings.length})</span></h1>
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

export default Today
