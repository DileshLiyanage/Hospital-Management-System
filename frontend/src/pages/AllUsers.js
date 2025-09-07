import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit, MdOutlineDelete } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";
import AddUser from "../components/AddUser";
import { motion } from "framer-motion";
import { IoMdAdd } from "react-icons/io";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });
  const [openAddUser, setOpenAddUser] = useState(false);

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: "include",
      });
      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Delete User
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${SummaryApi.deleteUser.url}/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        toast.success("User deleted successfully!");
        fetchAllUsers(); // Refresh user list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md"> 
      <div className="bg-white py-4 px-6 flex justify-between items-center rounded-lg shadow-md">
        <h2 className="font-bold text-xl text-gray-700">All Users</h2>
        <motion.button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition-all shadow-md"
          onClick={() => setOpenAddUser(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoMdAdd className="text-white text-lg" /> Add User
        </motion.button>
      </div>

      <div className="overflow-x-auto mt-4 bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-gray-700">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-6">Sr.</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Created Date</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((el, index) => (
              <tr key={el._id || index} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-center">{index + 1}</td>
                <td className="py-3 px-6 text-center">{el?.name}</td>
                <td className="py-3 px-6 text-center">{el?.email}</td>
                <td className="py-3 px-6 text-center">{el?.role}</td>
                <td className="py-3 px-6 text-center">{moment(el?.createdAt).format("LL")}</td>
                <td className="py-3 px-6 text-center flex justify-center gap-3">
                  <button
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700 transition-all shadow-md"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 transition-all shadow-md"
                    onClick={() => handleDeleteUser(el._id)}
                  >
                    <MdOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openAddUser && <AddUser onClose={() => setOpenAddUser(false)} />}
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;