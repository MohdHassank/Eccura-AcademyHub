const express = require("express");
const router = express.Router();

const {
  getParentDashboard
  , getChildPerformance
} = require("../controllers/parentController");

router.get(
  "/dashboard/:parentId",
  getParentDashboard
);

router.get(
  "/child-performance/:parentId",
  getChildPerformance
);

module.exports = router;