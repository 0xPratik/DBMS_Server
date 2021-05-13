const express = require("express");
const router = express.Router();
const pool = require("../db");

const {
  signup,
  login,
  getusers,
  getuser,
  logout,
  postQueries,
  getApplication,
  addApplication,
} = require("../controllers/user");
const {
  createHostel,
  getAllFurniture,
  getHostels,
  addFurniture,
} = require("../controllers/admin");
const { auth } = require("../controllers/verifyToken");

router.post("/signup", signup);
router.get("/users", getusers);
router.get("/users/:id", async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT * FROM student WHERE student_id = $1`,
      [req.params.id]
    );
    res.send(user.rows[0]);
  } catch (error) {
    console.log(error);
  }
});
router.post("/login", login);
router.post("/logout", logout);
router.get("/hostels", getHostels);
router.post("/hostels", createHostel);
router.get("/furnitures", getAllFurniture);
router.post("/furnitures", addFurniture);
router.post("/queries", postQueries);
router.get("/applications", getApplication);
router.post("/applications", addApplication);

module.exports = router;
