import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PharmacyStockFormPage = () => {
    const [stockId, setStockId] = useState("");
    const [stockName, setStockName] = useState("");
    const [stockCount, setStockCount] = useState("");
    const [exDate, setExDate] = useState("");
    const [mfDate, setMfDate] = useState("");
    const [company, setCompany] = useState("");
    const [contact, setContact] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const pharmacyItemData = { stockId, stockName, stockCount, exDate, mfDate, company, contact };

        try {
            const response = await fetch("http://localhost:8080/api/add-stock", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pharmacyItemData),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Pharmacy item added successfully!");
                setTimeout(() => navigate("/all-stocks"), 1000);
                setStockId("");
                setStockName("");
                setStockCount("");
                setExDate("");
                setMfDate("");
                setCompany("");
                setContact("");
            } else {
                toast.error(result.message || "Validation failed.");
            }
        } catch (error) {
            toast.error("Failed to add pharmacy item. Please try again.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
            <Toaster />
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Pharmacy Item</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Item ID</label>
                        <input type="text" value={stockId} onChange={(e) => setStockId(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Item Name</label>
                        <input type="text" value={stockName} onChange={(e) => setStockName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Item Quantity</label>
                        <input type="number" value={stockCount} onChange={(e) => setStockCount(e.target.value)} min="1"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Expiry Date</label>
                        <input type="date" value={exDate} onChange={(e) => setExDate(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Manufacturing Date</label>
                        <input type="date" value={mfDate} onChange={(e) => setMfDate(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Company</label>
                        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Contact Number</label>
                        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}
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

export default PharmacyStockFormPage;
