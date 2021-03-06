const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getHostels,
  createHostel,
  getAdmin,
  getQueries,
  createMyRoom,
} = require("../controllers/admin");

router.post("/adminregister", register);
router.post("/adminLogin", login);
router.get("/admins", getAdmin);
router.get("/hostels", getHostels);
router.post("/hostels", createHostel);
router.get("/queries", getQueries);
router.post("/createrooms", createMyRoom);

module.exports = router;
