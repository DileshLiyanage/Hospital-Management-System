import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { motion } from "framer-motion";
import AddGeneralNotice from '../components/AddGeneralNotice';
import SummaryApi from '../common';
import GeneralNotice from '../components/GeneralNotice';
import ROLE from '../common/role';
import { useSelector } from 'react-redux';

const AllGeneralNotices = () => {
  const user = useSelector(state => state?.user?.user);
  const [openAddGeneralNotice,setOpenAddGeneralNotice] = useState(false)
  const [allNotices,setAllNotices] = useState([])

  const fetchAllNotices = async() =>{
    const response = await fetch(SummaryApi.allNotices.url)
    const dataResponse = await response.json()

    console.log("product data",dataResponse)

    setAllNotices(dataResponse?.data || [])
  }


  
  useEffect(()=>{
    fetchAllNotices()
  },[])


  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center mt-3 rounded-full'>
        <h2 className='font-bold text-lg'>General Notices</h2>

       
        {(user?.role === ROLE.ADMIN || user?.role === ROLE.DOCTOR) && (
          <motion.button 
            className='border py-4 px-6 rounded-full bg-green-600 text-white flex items-center gap-2 hover:bg-green-800 transition-all'
            onClick={() => setOpenAddGeneralNotice(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span><IoMdAdd className='text-white' /></span> 
            Add New Notice
          </motion.button>
        )}
      </div>

      {/* All Notices */}
      <div className='gap-2'>
        {
          allNotices.map((notice,index)=>{
            return(
              <GeneralNotice data={notice} key={index+"allNotices"} fetchdata={fetchAllNotices}/>

            )
          })
        
        }
      </div>




      {/* Add General Notice Component */}
      {
        openAddGeneralNotice && (
          <AddGeneralNotice onClose={()=>setOpenAddGeneralNotice(false)}/>
        )
      }
    </div>
  )
}

export default AllGeneralNotices