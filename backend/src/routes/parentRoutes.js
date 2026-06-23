const express = require("express");
const router = express.Router();

const {
  getParentDashboard
  , getChildPerformance
    , getLinkedChildren
    , getAcademicTracking
    , getFeesSummary
    , getParentProfile
    , getParentNotifications
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

router.get(
  "/profile/:parentId",
  getParentProfile
);

router.get(
  "/notifications/:studentId",
  getParentNotifications
);

module.exports = router;