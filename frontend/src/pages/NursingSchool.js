import React from 'react'
import { Link } from 'react-router-dom';

const NursingSchool = () => {
  return (
    <div className='justify-items-center'>
      <div className='flex items-center  justify-between bg-white rounded-2xl h-10 pr-10 pl-10 mt-10 mr-30 ml-30 pt-4 pb-4 w-1/2'>
         <div className='cursor-pointer font-semibold'>
          <Link to = {"all-channelings"} className='px-2 py-1 '>Doctor Channelings</Link>
        </div>

        <div className='font-semibold cursor-pointer'>
          <Link to={"all-homevisits"} className='px-2 py-1' > Home Visit Appointment</Link>
        </div>

        <div className='font-semibold cursor-pointer'>
        Nursing School
        </div>

        <div className='font-semibold cursor-pointer'>
          <Link to={"all-generalnotices"}> General Notices </Link> 
        </div>

    </div>
    </div>
  )
}

export default NursingSchool
