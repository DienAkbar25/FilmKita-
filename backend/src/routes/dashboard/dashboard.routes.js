const express = require("express");
const router = express.Router();

const requireRole = require("../../middleware/mid.requireRole");
const execController = require("../../controllers/dashboard/dashboard.exec.controller");
const mktController = require("../../controllers/dashboard/dashboard.mkt.controller");

// EXEC DASHBOARD
router.get(
  "/exec",
  requireRole("role_exec"),
  execController.getDashboard
);

// DASHBOARD MARKETING
router.get(
  "/mkt",
  requireRole("role_mkt"),
  mktController.getDashboard
);


module.exports = router;
