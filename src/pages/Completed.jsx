import React from 'react'
import { useState, useEffect } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useUser } from '../hooks/userContext';
import Listing from '../components/Listing';

function Completed() {
  const user = useUser();
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsArray = [];
        const q = query(collection(db, 'listings'), where('status', '==', 'Completed'), where('userRef', '==', user.uid));
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
  }, [user.uid]); // Efectul va rula o singură dată la montarea componentei



  return (
    <>
      <div className='px-4 sm:ml-64'>
        <div className='p-4 rounded-lg dark:border-gray-700 '>
          <h1 className='max-w-lg text-4xl font-semibold leading-relaxed text-gray-900 dark:text-white inline-block  me-4'>Completed <span className='text-xl text-gray-500'>({listings.length})</span></h1>
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

export default Completed
