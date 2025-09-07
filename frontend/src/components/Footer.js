import React from 'react'
import { motion } from "framer-motion"
import { FaHospitalSymbol, FaUserMd, FaCalendarCheck, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-slate-200 h-10'>
       {/* Contact Section */}
      <motion.div 
        className="bg-blue-600 text-white p-6 mt-10 w-full text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold">Need Assistance? Contact Us!</h2>
        <p className="mt-2">Call us anytime at <strong>+1 234 567 890</strong></p>
        <button className="bg-white text-blue-600 px-6 py-2 mt-4 rounded-full font-semibold hover:bg-gray-200">
          <FaPhoneAlt className="inline-block mr-2" /> Contact Now
        </button>
      </motion.div>
    </footer>
  )
}

export default Footer
