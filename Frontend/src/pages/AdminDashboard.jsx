import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import LeaveTable from "../components/Admin/LeaveTable";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <h1 className="text-center font-bold text-white ">Admin Dashboard</h1>

      <div className="max-w-5xl mx-auto bg-gray-200 mt-10 p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Manage Leave Requests</h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <LeaveTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
