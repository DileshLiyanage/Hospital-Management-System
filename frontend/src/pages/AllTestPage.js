import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common/index";

const AllTestPage = () => {
  const [tests, setTests] = useState([]);
  const [deleteTestId, setDeleteTestId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(SummaryApi.getAllTests.url, {
          method: SummaryApi.getAllTests.method,
        });
        const result = await response.json();
        if (response.ok) {
          setTests(result.data);
        } else {
          toast.error(result.message || "Failed to fetch tests.");
        }
      } catch (error) {
        toast.error("Error fetching tests. Please try again.");
      }
    };
    fetchTests();
  }, []);

  const handleDeleteTest = async (testId) => {
    setDeleteTestId(testId);
  };

  const confirmDeleteTest = async () => {
    if (!deleteTestId) return;
    try {
      const response = await fetch(`${SummaryApi.deleteTest.url}/${deleteTestId}`, {
        method: SummaryApi.deleteTest.method,
      });
      const result = await response.json();
      if (response.ok) {
        setTests(tests.filter((test) => test._id !== deleteTestId));
        toast.success("Test deleted successfully!");
      } else {
        toast.error(result.message || "Failed to delete test.");
      }
    } catch (error) {
      toast.error("Error deleting the test. Please try again.");
    }
    setDeleteTestId(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">All Laboratory Tests</h2>
        <table className="w-full table-auto border-collapse mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Age</th>
              <th className="px-4 py-2 border-b text-left">Gender</th>
              <th className="px-4 py-2 border-b text-left">Address</th>
              <th className="px-4 py-2 border-b text-left">Test Date</th>
              <th className="px-4 py-2 border-b text-left">Test Data</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">No tests available.</td>
              </tr>
            ) : (
              tests.map((test) => (
                <tr key={test._id}>
                  <td className="px-4 py-2 border-b">{test.name}</td>
                  <td className="px-4 py-2 border-b">{test.age}</td>
                  <td className="px-4 py-2 border-b">{test.gender}</td>
                  <td className="px-4 py-2 border-b">{test.address}</td>
                  <td className="px-4 py-2 border-b">{new Date(test.testDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b">{test.testData}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => navigate(`/view-test/${test._id}`)}
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/edit-test/${test._id}`)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTest(test._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="text-center">
          <button
            onClick={() => navigate("/lab-testform")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Add New Test
          </button>
        </div>
      </div>

      {deleteTestId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this test?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setDeleteTestId(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteTest}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTestPage;
