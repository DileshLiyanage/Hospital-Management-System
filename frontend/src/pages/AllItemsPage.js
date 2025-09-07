import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';

const AllItemsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchData = await fetch(SummaryApi.getAllItems.url, {
          method: SummaryApi.getAllItems.method,
          credentials: 'include',
        });

        if (!fetchData.ok) {
          throw new Error(`HTTP error! status: ${fetchData.status}`);
        }

        const data = await fetchData.json();

        if (data.success) {
          setItems(data.data);
        }

        if (data.error) {
          toast.error(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch items', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDeleteConfirmation = (id) => {
    toast.info(
      <div>
        <p className="text-gray-800">Are you sure you want to delete this item?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => {
              handleDelete(id);
              toast.dismiss();
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              toast.dismiss();
              toast.info('Deletion canceled');
            }}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${SummaryApi.deleteItem.url}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
        toast.success('Item deleted successfully');
      } else {
        toast.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Failed to delete item', error);
      toast.error('Error deleting item');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Laboratory Items</h2>
      <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Item ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Item Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Item Count</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-t border-gray-200">
              <td className="px-4 py-2 text-sm text-gray-700">{item.itemId}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{item.itemName}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{item.itemCount}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/edit-item/${item._id}`}
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteConfirmation(item._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllItemsPage;
