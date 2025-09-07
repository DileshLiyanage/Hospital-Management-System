import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common/index';

const EditStockPage = () => {
  const { id } = useParams();
  const [stock, setStock] = useState({
    stockId: '',
    stockName: '',
    stockCount: 1,
    exDate: '',
    mfDate: '',
    company: '',
    contact: '',
  });

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await fetch(`${SummaryApi.getStockById.url}/${id}`);
        const data = await response.json();
        setStock(data);
      } catch (error) {
        console.error("Failed to fetch stock", error);
      }
    };
    fetchStock();
  }, [id]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.updateStock.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stock),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Stock updated successfully');
        setTimeout(() => navigate('/all-stocks'), 1000); // Redirect after 1 second
      } else {
        toast.error('Failed to update stock');
      }
    } catch (error) {
      console.error("Failed to update stock", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Edit Stock Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-2">Stock ID:</label>
          <input
            type="text"
            value={stock.stockId}
            onChange={(e) => setStock({ ...stock, stockId: e.target.value })}
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-2">Item Name:</label>
          <input
            type="text"
            value={stock.stockName}
            onChange={(e) => setStock({ ...stock, stockName: e.target.value })}
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-2">Item Quantity:</label>
          <input
            type="number"
            value={stock.stockCount}
            onChange={(e) => setStock({ ...stock, stockCount: e.target.value })}
            min="1"
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-2">Expiry Date:</label>
          <input
            type="date"
            value={stock.exDate}
            onChange={(e) => setStock({ ...stock, exDate: e.target.value })}
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-2">Manufacture Date:</label>
          <input
            type="date"
            value={stock.mfDate}
            onChange={(e) => setStock({ ...stock, mfDate: e.target.value })}
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-2">Company:</label>
          <input
            type="text"
            value={stock.company}
            onChange={(e) => setStock({ ...stock, company: e.target.value })}
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-2">Contact:</label>
          <input
            type="number"
            value={stock.contact}
            onChange={(e) => setStock({ ...stock, contact: e.target.value })}
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Stock
        </button>
      </form>
    </div>
  );
};

export default EditStockPage;
