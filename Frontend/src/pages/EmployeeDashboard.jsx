import React, { useEffect } from "react";
import LeaveForm from "../components/Dashboard/LeaveForm";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { fetchLeaveHistory } from "../features/leaves/leaveSlice";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { leaveRequests } = useSelector((state) => state.leaves);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchLeaveHistory());
  }, [dispatch]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text("Leave Summary", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [["From", "To", "Type", "Reason", "Status"]],
      body: leaveRequests.map((leave) => [
        leave.fromDate,
        leave.toDate,
        leave.type,
        leave.reason,
        leave.status,
      ]),
    });

    doc.save("leave_summary.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-center text-3xl font-bold text-black mb-6">
        Employee Dashboard
      </h1>

      <div className="max-w-2xl mx-auto mb-8 p-6 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Apply for Leave</h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <LeaveForm />
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">My Leave Requests</h2>
          <button
            onClick={downloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download PDF
          </button>
        </div>
        <table className="w-full text-left table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">From</th>
              <th className="p-2 border">To</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Reason</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leave) => (
              <tr key={leave._id}>
                <td className="p-2 border">{leave.fromDate}</td>
                <td className="p-2 border">{leave.toDate}</td>
                <td className="p-2 border">{leave.type}</td>
                <td className="p-2 border">{leave.reason}</td>
                <td className="p-2 border">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
