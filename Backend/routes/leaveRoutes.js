import express from "express";
import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateStatus,
} from "../controllers/leaveController.js";

import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", auth, role("employee"), applyLeave);
router.get("/:id", auth, getMyLeaves);
router.get("/", auth, role("admin"), getAllLeaves);
router.put("/:id/status", auth, role("admin"), updateStatus);

export default router;
