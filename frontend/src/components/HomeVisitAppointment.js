import React, { useState } from "react"
import { MdEdit } from "react-icons/md";
import UserEditHomeVisitAppointment from "./UserEditHomeVisitAppointment";


const HomeVisitAppointment = ({
    data,
    fetchData

}) => {
    const [editHomeVisitAppointment,setEditHomeVisitAppointment] = useState(false)
    

    return (
        <div className='bg-white pt-3 pb-3 customShadow gap-4 pl-4 mt-2 mr-96 ml-96 rounded '>
                    <h1 className='font-bold'>Appointment</h1>
                    <div className="flex"><h2 className="font-semibold">Patient Name     : </h2><p>{data.patientName}</p></div>
                    <div className="flex"><h2 className="font-semibold">Channeled Doctor : </h2><p>{data.doctorName}</p></div>
                    <div className="flex"><h2 className="font-semibold">Date     : </h2><p>{data.date}</p></div>
                    <div className="flex"><h2 className="font-semibold">Patient Mobile : </h2><p>{data.contactNo}</p></div>
                    <div className="flex"><h2 className="font-semibold">Address : </h2><p>{data.address}</p></div>
                    <div className="flex"><h2 className="font-semibold">Other Notes : </h2><p>{data.otherNotes}</p></div>


                    <div className='w-fit ml-auto p-2 mr-2 bg-green-300 hover:bg-green-600 rounded-full text-white cursor-pointer' onClick={()=>setEditHomeVisitAppointment(true)}>
                        <MdEdit />
                    </div>


                    {
                        editHomeVisitAppointment && (
                            <UserEditHomeVisitAppointment 
                               homeVisitAppointmentData={data} 
                                onClose={() => setEditHomeVisitAppointment(false)}
                                fetchData={fetchData} 
                            />
                        )
                    }

                    
        </div>
    )
}

export default HomeVisitAppointment