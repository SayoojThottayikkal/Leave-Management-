import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllLeaves,
  updateLeaveStatus,
} from "../../features/leaves/leaveSlice";

const LeaveTable = ({ filters, sortOption, searchQuery }) => {
  const dispatch = useDispatch();
  const { leaveRequests, status } = useSelector((state) => state.leaves);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) dispatch(fetchAllLeaves());
  }, [dispatch, token]);

  const handleStatusChange = (id, status) => {
    dispatch(updateLeaveStatus({ id, status }));
  };

  const filteredLeaves = leaveRequests
    .filter((leave) => {
      const typeMatch = filters.type ? leave.type === filters.type : true;
      const statusMatch = filters.status
        ? leave.status === filters.status
        : true;
      const searchMatch = searchQuery
        ? leave.employee?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true;
      return typeMatch && statusMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortOption === "fromDate") {
        return new Date(a.fromDate) - new Date(b.fromDate);
      } else if (sortOption === "status") {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Employee</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">From</th>
            <th className="p-2 border">To</th>
            <th className="p-2 border">Reason</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {status === "loading" ? (
            <tr>
              <td colSpan="7" className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : filteredLeaves.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No leave requests found.
              </td>
            </tr>
          ) : (
            filteredLeaves.map((leave) => (
              <tr key={leave._id}>
                <td className="p-2 border">{leave.employee?.name || "N/A"}</td>
                <td className="p-2 border">{leave.type}</td>
                <td className="p-2 border">{leave.fromDate?.slice(0, 10)}</td>
                <td className="p-2 border">{leave.toDate?.slice(0, 10)}</td>
                <td className="p-2 border">{leave.reason}</td>
                <td
                  className={`p-2 border ${
                    leave.status === "Pending"
                      ? "text-yellow-600"
                      : leave.status === "Approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {leave.status}
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => handleStatusChange(leave._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleStatusChange(leave._id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;
