const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/dashboard/:id", studentController.getDashboard);
router.get("/notes/:id", studentController.getNotes);
router.get("/assignments/:id", studentController.getAssignments);
router.get("/previousPapers/:id",studentController.getpreviousPapers);
router.get("/recordedLectures/:id",studentController.getRecordedLectures);
router.get("/syllabusTracker/:id", studentController.getSyllabusTracker);
router.get("/notifications/:id", studentController.getNotifications);


module.exports = router;