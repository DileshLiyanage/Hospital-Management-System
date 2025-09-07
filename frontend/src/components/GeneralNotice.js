import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import EditNotice from './EditNotice';
import { MdDelete } from "react-icons/md";
import ROLE from '../common/role';
import { useSelector } from 'react-redux';

const GeneralNotice = ({
    data,
    fetchdata
    
}) => {

    const[editNotice,setEditNotice] = useState(false)
    const user = useSelector(state => state?.user?.user);
  return (
    <div>
            <div className=' bg-white pt-3 pb-3 customShadow gap-4 pl-4 mt-2 mr-80 ml-80 rounded items-center justify-center'>
                <h1 className='font-bold'>{data?.topic}</h1>
                 <div className='flex items-center justify-center'>
                 <img src={data?.noticeImage[0]} width={120} height={120} />
                 </div>
                 <h2>{data?.description}</h2>


                  {(user?.role === ROLE.ADMIN || user?.role === ROLE.DOCTOR) && (
                    <div 
                        className='w-fit ml-auto p-2 mr-2 bg-green-300 hover:bg-green-600 rounded-full text-white cursor-pointer' 
                        onClick={() => setEditNotice(true)}
                    >
                        <MdEdit />
                    </div>
                )}

                  
                  {
                    editNotice && (
                       <EditNotice noticeData={data} onClose={()=>setEditNotice(false)} fetchdata={fetchdata}/>
                    )
                  }
                  
            </div>

    </div>
  )
}

export default GeneralNotice
