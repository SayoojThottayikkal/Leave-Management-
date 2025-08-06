import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import LeaveTable from "../components/Admin/LeaveTable";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    type: "",
    status: "",
  });

  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1 className="text-center font-bold text-white">Admin Dashboard</h1>

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Types</option>
            <option value="Sick">Sick</option>
            <option value="Casual">Casual</option>
            <option value="Earned">Earned</option>
          </select>

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Sort By</option>
            <option value="fromDate">From Date</option>
            <option value="status">Status</option>
          </select>

          <input
            type="text"
            placeholder="Search by Employee Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <LeaveTable
          filters={filters}
          sortOption={sortOption}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
