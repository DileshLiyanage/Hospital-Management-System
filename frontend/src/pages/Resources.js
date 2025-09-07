import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdModeEdit, MdOutlineDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { motion } from "framer-motion";
import SummaryApi from "../common";

const ResourceManager = () => {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({ name: "", type: "", availability: "Available" });

  // Fetch all resources
  const fetchResources = async () => {
    try {
      const response = await fetch(SummaryApi.getResources.url, {
        method: SummaryApi.getResources.method,
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setResources(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching resources");
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Add a new resource
  const handleAddResource = async () => {
    try {
      const response = await fetch(SummaryApi.addResource.url, {
        method: SummaryApi.addResource.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newResource),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Resource added successfully!");
        fetchResources();
        setNewResource({ name: "", type: "", availability: "Available" });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error adding resource");
    }
  };

  // Update resource availability
const handleUpdateAvailability = async (id, availability) => {
  try {
    const response = await fetch(`${SummaryApi.updateResource.url}/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ availability }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success("Availability updated!");
      fetchResources();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Error updating availability");
  }
};

// Delete a resource
const handleDeleteResource = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this resource?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${SummaryApi.deleteResource.url}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    if (data.success) {
      toast.success("Resource deleted!");
      fetchResources();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Error deleting resource");
  }
};


  return (
    <div className="bg-white p-4">
      <h2 className="font-bold text-lg mb-4">Manage Resources</h2>

      {/* Add Resource Form */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Resource Name"
          className="border p-2"
          value={newResource.name}
          onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type"
          className="border p-2"
          value={newResource.type}
          onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
        />
        <motion.button
          className="border p-2 bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-800"
          onClick={handleAddResource}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoMdAdd className="text-white" />
          Add
        </motion.button>
      </div>

      {/* Resource List */}
      <table className="w-full">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th>Name</th>
            <th>Type</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {resources.map((resource) => (
            <tr key={resource._id}>
              <td>{resource.name}</td>
              <td>{resource.type}</td>
              <td>
                <button
                  className={`p-1 rounded ${resource.availability === "Available" ? "bg-green-500" : "bg-red-500"} text-white`}
                  onClick={() => handleUpdateAvailability(resource._id, resource.availability === "Available" ? "Not Available" : "Available")}
                >
                  {resource.availability}
                </button>
              </td>
              <td>
                <button className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white ml-2" onClick={() => handleDeleteResource(resource._id)}>
                  <MdOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceManager;
