import LeaveRequest from "../models/LeaveRequest.js";

export const applyLeave = async (req, res) => {
  const { fromDate, toDate, reason, type } = req.body;
  const leave = new LeaveRequest({
    employee: req.userId,
    fromDate,
    toDate,
    reason,
    type,
  });
  await leave.save();
  res.status(201).json({ msg: "Leave applied" });
};

export const getMyLeaves = async (req, res) => {
  const leaves = await LeaveRequest.find({ employee: req.params.id });
  res.json(leaves);
};

export const getAllLeaves = async (req, res) => {
  const leaves = await LeaveRequest.find().populate("employee", "name email");
  res.json(leaves);
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await LeaveRequest.findByIdAndUpdate(id, { status });
  res.json({ msg: "Leave status updated" });
};
