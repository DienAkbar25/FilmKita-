const express = require("express");
const router = express.Router();

const execController = require("../../controllers/dashboard/dashboard.exec.controller");
const mktController = require("../../controllers/dashboard/dashboard.mkt.controller");

// EXEC DASHBOARD
router.get("/executive", execController.getExecutiveDashboard);

// DASHBOARD MARKETING
router.get("/marketing", mktController.getMarketingDashboard);

module.exports = router;
