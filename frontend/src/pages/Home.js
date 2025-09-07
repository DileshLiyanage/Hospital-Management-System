import React from "react";
import { FaUserMd, FaCalendarCheck, FaHospitalSymbol, FaAmbulance } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center text-center">
      {/* Hero Section */}
      <motion.div 
        className="w-full h-[500px] bg-blue-600 text-white flex flex-col justify-center items-center p-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold">Welcome to PRABODHA Hospital</h1>
        <p className="text-lg mt-4 max-w-2xl">
          Comprehensive healthcare services with expert medical professionals.
        </p>
        <div>
          <Link to="/book-appointment">
            <button className="mt-6 hover:scale-105 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-slate-100 transition">
              Book an Appointment
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 p-6">
        <motion.div 
          className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center" 
          whileHover={{ scale: 1.05 }}
        >
          <FaUserMd className="text-blue-600 text-4xl" />
          <h2 className="text-xl font-semibold mt-2">Expert Doctors</h2>
          <p className="text-gray-600 mt-2">Highly skilled specialists in multiple medical fields.</p>
        </motion.div>

        <motion.div 
          className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center" 
          whileHover={{ scale: 1.05 }}
        >
          <FaCalendarCheck className="text-blue-600 text-4xl" />
          <h2 className="text-xl font-semibold mt-2">Easy Appointments</h2>
          <p className="text-gray-600 mt-2">Book your doctor consultations with just a few clicks.</p>
        </motion.div>

        <motion.div 
          className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center" 
          whileHover={{ scale: 1.05 }}
        >
          <FaHospitalSymbol className="text-blue-600 text-4xl" />
          <h2 className="text-xl font-semibold mt-2">Advanced Facilities</h2>
          <p className="text-gray-600 mt-2">State-of-the-art medical infrastructure and care.</p>
        </motion.div>
      </div>

    </div>
  );
};

export default Homepage;
