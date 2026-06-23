const express = require("express");
const router = express.Router();

const {
  getParentDashboard
  , getChildPerformance
    , getLinkedChildren
    , getAcademicTracking
    , getFeesSummary
} = require("../controllers/parentController");

router.get(
  "/dashboard/:studentId",
  getParentDashboard
);

router.get(
  "/child-performance/:studentId",
  getChildPerformance
);

router.get(
  "/children/:parentId",
  getLinkedChildren
);

router.get(
  "/academic-tracking/:studentId",
  getAcademicTracking
);

router.get(
  "/fees/:studentId",
  getFeesSummary
);

module.exports = router;