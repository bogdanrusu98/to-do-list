import { MdDateRange } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { db } from "../firebase.config";
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { FaFlag } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Listing({ listing, id }) {
  const [status, setStatus] = useState(listing.status)
  const navigate = useNavigate()
  const [listings, setListings] = useState(null)

  const toggleStatus = async () => {
    const docRef = doc(db, "listings", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentStatus = docSnap.data().status;
      const newStatus = currentStatus === "In Progress" ? "Completed" : 'Completed' ? 'In Progress' : 'Completed'

      await updateDoc(docRef, { status: newStatus });
      setStatus(newStatus);
      toast.success('Status modified')

      navigate('/')
    } else {
      console.log("No such document!");
    }
  };

  const onDelete = async () => {
    try {
      const docRef = doc(db, 'listings', id);

      await deleteDoc(docRef);
      navigate('/progress')

      toast.success('Listing deleted');
    } catch (error) {
      toast.error('Failed to delete listing');
    }
  };


  return (
    <div className='w-96 h-62 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between'>

      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{listing.title}</h5>
      <div className="overflow-auto">
        <p className='font-normal text-gray-500 dark:text-gray-400 max-h-24'>
          {listing.description}
        </p>
      </div>
      <div className='mt-4'>
        <MdDateRange className='inline' /> {listing.date}
        <FaFlag className={`inline ms-4 ${listing.importance === 'high' ? 'text-red-600' : listing.importance === 'medium' ? 'text-yellow-300' : 'text-green-600'}`} />

        {listing.status === 'In Progress' ? (
          <GrInProgress className='ms-4 inline' onClick={toggleStatus} />
        ) : (
          <IoMdDoneAll className='ms-4 inline text-green-600' onClick={toggleStatus} />
        )}

        <button className='float-right' onClick={onDelete} ><FaRegTrashAlt /></button>
      </div>
    </div>

  )
}

export default Listing
