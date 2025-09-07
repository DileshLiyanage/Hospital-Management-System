import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const LaboratoryTestForm = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [testDate, setTestDate] = useState("");
    const [testData, setTestData] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const testDataPayload = { name, age, address, mobile, gender, testDate, testData };

        try {
            const response = await fetch("http://localhost:8080/api/add-test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(testDataPayload),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Laboratory Test added successfully!");
                setTimeout(() => navigate('/all-tests'), 1000);
                setName("");
                setAge("");
                setAddress("");
                setMobile("");
                setGender("");
                setTestDate("");
                setTestData("");
            } else {
                toast.error(result.message || "Validation failed.");
            }
        } catch (error) {
            toast.error("Failed to add laboratory test. Please try again.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
            <Toaster />
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Laboratory Test</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Age</label>
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Address</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Mobile</label>
                        <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Gender</label>
                        <div className="flex items-center space-x-6">
                            <label className="flex items-center">
                                <input type="radio" value="Male" checked={gender === "Male"} onChange={() => setGender("Male")}
                                    className="mr-2" />
                                Male
                            </label>
                            <label className="flex items-center">
                                <input type="radio" value="Female" checked={gender === "Female"} onChange={() => setGender("Female")}
                                    className="mr-2" />
                                Female
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Test Date</label>
                        <input type="date" value={testDate} onChange={(e) => setTestDate(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Test Data</label>
                        <textarea value={testData} onChange={(e) => setTestData(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div className="text-center">
                        <button type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                            Add Laboratory Test
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LaboratoryTestForm;
