const mongoose = require("mongoose");
const leaveRequestSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    type: { type: String, enum: ["sick", "casual", "earned"], required: true },

    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
