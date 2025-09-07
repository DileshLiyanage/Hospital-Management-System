import React, { useState } from 'react'
import Logo from './Logo'
import{ GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { PiHandshakeFill } from "react-icons/pi";
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import ROLE from '../common/role';



const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)




  const handleLogout = async() => {
     const fetchData = await fetch(SummaryApi.logout_user.url,{
        method : SummaryApi.logout_user.method,
        credentials : 'include' 
     })
     

     const data = await fetchData.json()

     if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
     }

     if(data.error){
      toast.error(data.message)
    }

  }
  return (
    <header className='h-20 shadow-md bg-white customShadow'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between '>
        <div className='mt-7'>
          <Link to={"/"}>
            <Logo w={100} h={100}/>
          </Link>
        </div>

        <div className='cursor-pointer font-semibold'>
          <Link to = {"all-channelings"} className='px-2 py-1 '>Doctor Channelings</Link>
        </div>

        <div className='font-semibold cursor-pointer'>
          <Link to={"all-homevisits"} className='px-2 py-1' > Home Visit Appointment</Link>
        </div>

        <div className='font-semibold cursor-pointer'>
        <Link to={"nursing-school"} className='px-2 py-1' > Nursing School</Link>
        </div>

        <div className='font-semibold cursor-pointer'>
          <Link to={"all-generalnotices"}> General Notices </Link> 
        </div>

        <div className='font-semibold cursor-pointer'>
          Online Medical Consultations
        </div>

        <div className='flex items-center gap-7'>
         <div className='relative group flex justify-center'>
          {
            user?._id && (
              <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
              {
                user?.profilePic ? (
                  <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>
                ) : (
                  <FaRegUserCircle/>
                )
              }
            </div>
            )
          }
            


            {
              menuDisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                <nav>
                  {
                    user?.role === ROLE.ADMIN && (
                      <Link to={"/admin-panel/all-users"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                    )
                  }
                  {
                    (user?.role === ROLE.PHARMACY || user?.role === ROLE.LABORATORY) && (
                      <Link to={"pharmacy-lab-panel/all-items"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' >Pharmacy Lab Panel</Link>
                    )
                  }
                  
                </nav>
              </div>
              )
            }  
          </div>


          <div className='text-3xl relative'>
            <span>
              <PiHandshakeFill />
              <div className='bg-red-600 text-white w-5 h5 rounded-full p-1 flex items-center justify-center absolute top-0 -right-3'>
                 <p className='text-sm'>0</p>
              </div>
            </span>
          </div>

          <div>
            {
              user?._id  ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full bg-red-600 hover:bg-red-800 text-white'>Logout</button>
              ):(
                <Link to={"/login"} className='px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-800 text-white'>Login</Link>
              )
            }
            
          </div>


        </div>
      </div>
    </header>
  )
}

export default Header