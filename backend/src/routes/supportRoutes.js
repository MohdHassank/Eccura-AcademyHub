const express = require("express");

const router = express.Router();

const {
  createTicket,
  getSupportConfig
} = require("../controllers/supportController");

router.post(
  "/create",
  createTicket
);

router.get(
  "/config",
  getSupportConfig
);

module.exports = router;