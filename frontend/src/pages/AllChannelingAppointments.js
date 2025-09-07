import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import AddChannelingAppointment from '../components/AddChannelingAppointment';
import SummaryApi from '../common';
import ChannelingAppointment from '../components/ChannelingAppointment';
import ROLE from '../common/role';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import moment from 'moment';

const AllChannelingAppointments = () => {
    const [openAddChanneling, setOpenAddChanneling] = useState(false);
    const [allChannelingAppointments, setAllChannelingAppointments] = useState([]);
    const user = useSelector(state => state?.user?.user);

    const fetchAllChannelingAppointments = async () => {
        const response = await fetch(SummaryApi.allChannelingAppointments.url);
        const dataResponse = await response.json();
        setAllChannelingAppointments(dataResponse?.data || []);
    };

    useEffect(() => {
        fetchAllChannelingAppointments();
    }, []);

    // Filtering appointments based on user role
    const filteredAppointments = (() => {
        if (!user?.role) return [];

        if (user.role === ROLE.ADMIN) {
            // Admin sees all appointments
            return allChannelingAppointments;
        } else if (user.role === ROLE.DOCTOR) {
            // Doctor sees only their own appointments
            return allChannelingAppointments.filter(appointment => appointment.doctorName === user.name);
        } else {
            // Patients see only their own appointments
            return allChannelingAppointments.filter(appointment => appointment.email === user.email);
        }
    })();

    // Grouping appointments by date
    const groupedAppointments = filteredAppointments.reduce((acc, appointment) => {
        const dateKey = moment(appointment.date).format('YYYY-MM-DD');
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(appointment);
        return acc;
    }, {});

    // Sorting dates in ascending order
    const sortedDates = Object.keys(groupedAppointments).sort((a, b) => new Date(a) - new Date(b));

    return (
        <div className='bg-white p-6 rounded-lg shadow-md mt-4'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-semibold text-gray-700'>All Channeling Appointments</h2>
                <motion.button 
                    className='flex items-center gap-2 bg-blue-600 text-white py-3 px-5 rounded-lg shadow-md hover:bg-blue-800 transition-all' 
                    onClick={() => setOpenAddChanneling(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <IoMdAdd className='text-xl' />
                    New Appointment
                </motion.button>
            </div>
            
            {/* Grouped Appointments by Date */}
            <div className='space-y-6'>
                {sortedDates.map(date => (
                    <div key={date} className='p-4 border border-gray-300 rounded-lg shadow-sm'>
                        <h3 className='text-lg font-bold text-gray-800 border-b pb-2 mb-3'>{moment(date).format('LL')}</h3>
                        <div className='space-y-4'>
                            {groupedAppointments[date].map((appointment, index) => (
                                <ChannelingAppointment 
                                    data={appointment} 
                                    key={index} 
                                    fetchData={fetchAllChannelingAppointments} 
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            {openAddChanneling && <AddChannelingAppointment onClose={() => setOpenAddChanneling(false)} />}
        </div>
    );
};

export default AllChannelingAppointments;
