import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import SummaryApi from "../common/index"; // Import your common API

const EditTestPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        address: "",
        mobile: "",
        gender: "",
        testDate: "",
        testData: "",
    });

    // Fetch test data on component mount
    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await fetch(`${SummaryApi.getTestById.url}/${id}`, {
                    method: SummaryApi.getTestById.method,
                });

                const result = await response.json();

                if (response.ok && result.data) {
                    setFormData(result.data); // Assuming the data is in result.data
                } else {
                    toast.error(result.message || "Failed to fetch test data.");
                }
            } catch (error) {
                toast.error("Error fetching test. Please try again.");
            }
        };

        fetchTest();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${SummaryApi.updateTest.url.replace(":id", id)}`, {
                method: "POST", // Use PUT or PATCH depending on API
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                toast.success("Test Updated Successfully!");
                setTimeout(() => navigate('/all-tests'), 1000);
            } else {
                toast.error(result.message || "Failed to update test.");
            }
        } catch (error) {
            toast.error("Error: " + error.message);
        }
    };
    

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit Laboratory Test</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className="text-gray-600">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter Name"
                            className="input-field"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="age" className="text-gray-600">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder="Enter Age"
                            className="input-field"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="address" className="text-gray-600">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter Address"
                            className="input-field"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="mobile" className="text-gray-600">Mobile</label>
                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            placeholder="Enter Mobile"
                            className="input-field"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="gender" className="text-gray-600">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            className="input-field"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="testDate" className="text-gray-600">Test Date</label>
                        <input
                            type="date"
                            id="testDate"
                            name="testDate"
                            className="input-field"
                            value={formData.testDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="testData" className="text-gray-600">Test Data</label>
                        <textarea
                            id="testData"
                            name="testData"
                            placeholder="Enter Test Data"
                            className="input-field h-32"
                            value={formData.testData}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Update Test
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTestPage;
