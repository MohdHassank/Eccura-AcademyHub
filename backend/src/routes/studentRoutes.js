const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/dashboard/:id", studentController.getDashboard);
router.get("/notes/:id", studentController.getNotes);


module.exports = router;