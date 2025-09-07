import React, { useState } from "react";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import UserEditChannelingAppointment from "./UserEditChannelingAppointment";
import SummaryApi from "../common"; // API endpoints

const ChannelingAppointment = ({ data, fetchData }) => {
    const [editChannelingAppointment, setEditChannelingAppointment] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle Delete Appointment
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(SummaryApi.deleteChannelingAppointment.url, {
                method: SummaryApi.deleteChannelingAppointment.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: data._id }) // Send ID for deletion
            });

            const result = await response.json();
            if (result.success) {
                fetchData(); // Refresh the list after deletion
            } else {
                alert("Failed to delete appointment!");
            }
        } catch (error) {
            alert("Error deleting appointment!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white pt-3 pb-3 customShadow gap-4 pl-4 mt-2 mr-96 ml-96 rounded">
            <h1 className="font-bold">Appointment</h1>
            <div className="flex"><h2 className="font-semibold">Patient Name: </h2><p>{data.patientName}</p></div>
            <div className="flex"><h2 className="font-semibold">Channeled Doctor: </h2><p>{data.doctorName}</p></div>
            <div className="flex"><h2 className="font-semibold">Date: </h2><p>{new Date(data.date).toLocaleDateString()}</p></div>
            <div className="flex"><h2 className="font-semibold">Patient Mobile: </h2><p>{data.contactNo}</p></div>
            <div className="flex"><h2 className="font-semibold">Email: </h2><p>{data.email}</p></div>
            <div className="flex"><h2 className="font-semibold">Other Notes: </h2><p>{data.otherNotes}</p></div>

            <div className="flex justify-end space-x-3 mt-2">
                <button 
                    className="bg-green-300 hover:bg-green-600 p-2 rounded-full text-white cursor-pointer"
                    onClick={() => setEditChannelingAppointment(true)}
                >
                    <MdEdit />
                </button>

                <button 
                    className="bg-red-300 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-md"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    {loading ? "Deleting..." : <MdOutlineDelete />}
                </button>
            </div>

            {editChannelingAppointment && (
                <UserEditChannelingAppointment 
                    channelingAppointmentData={data} 
                    onClose={() => setEditChannelingAppointment(false)}
                    fetchData={fetchData}
                />
            )}
        </div>
    );
};

export default ChannelingAppointment;
