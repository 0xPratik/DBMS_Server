const jwt = require("jsonwebtoken");
const pool = require("../db");

exports.auth = (req, res, next) => {
  // const token = req.token;
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }
  try {
    const verified = jwt.verify(token, "pratik");
    const user = pool.query(
      "SELECT fname,lname,mob_no,year_of_study,hostel_id,room_id,email FROM student WHERE student_id = $1",
      [verified.id]
    );

    res.status(200).send(user.rows[0]);
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};
