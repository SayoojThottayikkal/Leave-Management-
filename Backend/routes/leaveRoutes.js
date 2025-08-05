const express = require("express");
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateStatus,
} = require("../controllers/leaveController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", auth, role("employee"), applyLeave);
router.get("/:id", auth, getMyLeaves);
router.get("/", auth, role("admin"), getAllLeaves);
router.put("/:id/status", auth, role("admin"), updateStatus);

module.exports = router;
