import LeaveRequest from "../models/LeaveRequest.js";

export const applyLeave = async (req, res) => {
  const { fromDate, toDate, reason, type } = req.body;

  if (!fromDate || !toDate || !reason || !type) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const leave = new LeaveRequest({
      employee: req.userId,
      fromDate,
      toDate,
      reason,
      type,
    });

    await leave.save();
    res.status(201).json({ msg: "Leave applied successfully", leave });
  } catch (error) {
    console.error("Apply Leave Error:", error);
    res.status(500).json({ error: "Server error while applying for leave." });
  }
};

export const getMyLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ employee: req.userId });
    res.json(leaves);
  } catch (error) {
    console.error("Get My Leaves Error:", error);
    res.status(500).json({ error: "Server error while fetching your leaves." });
  }
};

export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find().populate("employee", "name email");
    res.json(leaves);
  } catch (error) {
    console.error("Get All Leaves Error:", error);
    res.status(500).json({ error: "Server error while fetching all leaves." });
  }
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["Pending", "Approved", "Rejected"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid leave status." });
  }

  try {
    const updatedLeave = await LeaveRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ error: "Leave request not found." });
    }

    res.json({ msg: "Leave status updated successfully", leave: updatedLeave });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ error: "Server error while updating status." });
  }
};
