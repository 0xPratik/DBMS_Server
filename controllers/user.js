const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

//Student Controllers

exports.signup = async (req, res) => {
  const { fname, lname, mob_no, dept, year_of_study, password, email } =
    req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(password, salt);
    const signup = await pool.query(
      `INSERT INTO student(fname,lname,mob_no,dept,year_of_study,password,email) VALUES($1,$2,$3,$4,$5,$6,$7)`,
      [fname, lname, mob_no, dept, year_of_study, hashedpassword, email]
    );
    console.log("All GOOD------");
    res.status(200).send(signup);
  } catch (error) {
    console.log(`There is an ERROR ${error.stack}`);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query(`SELECT * FROM student WHERE email=$1 `, [
      email,
    ]);
    const checkpassword = bcrypt.compare(password, user.rows[0].password);
    if (!checkpassword) {
      return res.status(201).send("Wrong Password");
    }
    const token = jwt.sign({ id: user.rows[0].student_id }, "pratik");
    res.status(200).send({ auth: true, token: token });
  } catch (err) {
    console.log(err.stack);
  }
};

exports.logout = async (req, res) => {
  try {
    res.removeHeader("auth-token").send("LoggedOut");
  } catch (error) {
    console.log(error);
  }
};

exports.getusers = async (req, res) => {
  try {
    const allusers = await pool.query(`SELECT * FROM student`);
    res.send(allusers.rows);
  } catch (error) {
    console.log(error);
  }
};

exports.getuser = async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT * FROM student WHERE student_id = $1`,
      [req.paramas.id]
    );
    res.send(user.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.postQueries = async (req, res) => {
  const { email, subject, message, hostel_id } = req.body;
  try {
    const h_id = Number(hostel_id);
    const contact = await pool.query(
      "INSERT INTO queries(hostel_id,email,subject,message) VALUES($1,$2,$3,$4)",
      [h_id, email, subject, message]
    );
    res.send(contact);
  } catch (error) {
    console.log(error);
  }
};

exports.addApplication = async (req, res) => {
  const { hostel_id, email, mob_no, message } = req.body;
  try {
    const putApplication = pool.query(
      "INSERT INTO application(email,mob_no,message,hostel_id) VALUES($1,$2,$3,$4)",
      [email, mob_no, message, hostel_id]
    );
    res.status(200).send(putApplication);
  } catch (error) {
    console.log(error);
  }
};

exports.getApplication = async (req, res) => {
  try {
    const applications = await pool.query("SELECT * FROM application");
    res.status(200).send(applications.rows);
  } catch (error) {
    console.log(error);
  }
};
