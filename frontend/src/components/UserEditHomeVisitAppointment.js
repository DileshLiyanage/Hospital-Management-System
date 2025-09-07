import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import doctorsList from '../helpers/doctorsList';
import SummaryApi from '../common';
import { toast } from 'react-toastify';



const UserEditHomeVisitAppointment = (
    {
        onClose,
        homeVisitAppointmentData,
        fetchData
    }
) => { 


    const [data,setData] = useState({
        ...homeVisitAppointmentData,
        doctorName : homeVisitAppointmentData?.doctorName,
        date : homeVisitAppointmentData?.date,
        patientName : homeVisitAppointmentData?.patientName,
        contactNo : homeVisitAppointmentData?.contactNo,
        email : homeVisitAppointmentData?.email,
        address : homeVisitAppointmentData?.address,
        otherNotes : homeVisitAppointmentData?.otherNotes
    
      })
    
      const handleOnChange = (e)=>{
          const { name,value} = e.target
    
          setData((preve)=>{
            return{
              ...preve,
              [name] : value
    
            }
          })
      }
    
    
      {/** update channeling appointment when click*/}
      const handleSubmit = async(e) =>{
        e.preventDefault()
    
        const response = await fetch(SummaryApi.updateHomeVisitAppointment.url,{
          method : SummaryApi.updateHomeVisitAppointment.method,
          credentials : 'include',
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
    
        const responseData = await response.json()
       
        if(responseData.success){
          toast.success(responseData?.message)
          onClose()
          fetchData()
        }
        else if(responseData.error){
          toast.error(responseData?.message)
        }
      }
    


  return (
    <div className='fixed w-full h-full bg-slate-200 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-40 rounded-3xl'>
       <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[90%] pb-10'>

        <div className='flex justify-between items-center pb-1'>
           <h2 className='font-bold text-lg items-center'>
              Edit HomeVisit Appointment
           </h2>
           <div className='w-fit ml-auto text-2xl hover:text-red-800 cursor-pointer' onClick={onClose}>
              <IoClose/>
           </div>
        </div>


        <form className='grid p-4 gap-4 overflow-y-scroll h-full' onSubmit={handleSubmit}>

           <label htmlFor='doctorName' className='mt-3'>Doctor Name : </label>
           <select id='doctorName' name='doctorName' value={data.doctorName} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' required>
                      <option value={""} >Select Doctor</option>
                      {
                        doctorsList.map((el,index)=>{
                          return(
                            <option value={el.value} key={el.value+index}>{el.label}</option>
                          )
                        })
                      }
           </select>
              

            <label htmlFor='date'>Date : </label>
            <input 
                type='date' 
                id='date' 
                placeholder='Select Date' 
                value={data.date}
                name='date' 
                onChange={handleOnChange}
                className='p-2 bg bg-slate-100 border rounded'
                required
                />

            

            <label htmlFor='patientName'>Patient Name : </label>
            <input 
                type='text' 
                id='patientName' 
                placeholder='Enter Patient Name' 
                value={data.patientName} 
                name='patientName'
                onChange={handleOnChange}
                className='p-2 bg bg-slate-100 border rounded'
                required
                />


            <label htmlFor='contactNo'>Contact No : </label>
            <input 
                type='text' 
                id='contactNo' 
                placeholder='Enter Contact No' 
                value={data.contactNo} 
                name='contactNo'
                onChange={handleOnChange}
                className='p-2 bg bg-slate-100 border rounded'
                required
                />

            <label htmlFor='email'>Email : </label>
            <input 
                type='email' 
                id='email' 
                placeholder='Enter Email' 
                value={data.email} 
                name='email'
                onChange={handleOnChange}
                className='p-2 bg bg-slate-100 border rounded'
                required
                />

            <label htmlFor='address'>Address : </label>
            <input 
                type='text' 
                id='address' 
                placeholder='Enter Address' 
                value={data.address} 
                name='address'
                onChange={handleOnChange}
                className='p-2 bg bg-slate-100 border rounded'
                required
                />


            <label htmlFor='otherNotes' className='flex'>Other Notes : <p className='text-slate-500'>(Optional)</p></label>
            <textarea 
                type='text' 
                id='otherNotes' 
                placeholder='Enter Any Other Notes' 
                value={data.otherNotes} 
                name='otherNotes'
                onChange={handleOnChange}
                className='h-28 bg-slate-100 border rounded resize-none' rows={4}
      
                />

        
        <button className='px-3 py-2 bg-green-600 text-white hover:bg-green-800 mt-10 rounded-full'>Done</button>

        </form>


         
       </div>
    </div>
  )
}


export default UserEditHomeVisitAppointment
