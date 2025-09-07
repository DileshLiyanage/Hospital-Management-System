import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link,useNavigate } from 'react-router-dom';


const LaboratoryItemFormPage = () => {
    const [itemId, setItemId] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemCount, setItemCount] = useState(1);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const labitemdata = { itemId, itemName, itemCount };
    
        try {
            const response = await fetch("http://localhost:8080/api/add-item", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(labitemdata),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                toast.success("Item added successfully!");
                setTimeout(() => navigate('/all-items'), 1000);
                setItemId("");
                setItemName("");
                setItemCount(1);
            } else {
                toast.error(result.message || "Validation failed.");
            }
        } catch (error) {
            toast.error("Failed to add item. Please try again.");
        }
    };
    
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
            <Toaster />
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Laboratory Item</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Item ID</label>
                        <input type="text" value={itemId} onChange={(e) => setItemId(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Item Name</label>
                        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Item Count</label>
                        <input type="number" value={itemCount} onChange={(e) => setItemCount(e.target.value)} min="1"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div className="text-center">
                        <button type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LaboratoryItemFormPage;
