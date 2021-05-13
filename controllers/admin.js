const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Registration

exports.register = async (req, res) => {
  const { fname, lname, mob_no, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const encryptPassword = await bcrypt.hash(password, salt);
    const createAdmin = await pool.query(
      `INSERT INTO admin_h(fname,lname,mob_no,email,password) VALUES($1,$2,$3,$4,$5)`,
      [fname, lname, mob_no, email, encryptPassword]
    );
    res.send(createAdmin);
  } catch (error) {
    console.log(error.stack);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await pool.query(`SELECT * FROM admin_h WHERE email=$1`, [
      email,
    ]);
    const checkPassword = bcrypt.compare(password, admin.rows[0].password);
    if (!checkPassword) {
      return res.status(201).send("Wrong Password");
    }
    const token = jwt.sign({ id: admin.rows[0].admin_id }, "pratik");
    res.status(200).send({ auth: true, token: token });
  } catch (error) {
    console.log(error.stack);
  }
};

exports.getAdmin = async (req, res) => {
  try {
    const allusers = await pool.query(`SELECT * FROM admin_h`);
    res.send(allusers.rows);
  } catch (error) {
    console.log(error);
  }
};
//Hostel Controllers

exports.getHostels = async (req, res) => {
  try {
    const hostels = await pool.query(`SELECT * FROM hostel`);
    res.send(hostels.rows);
  } catch (error) {
    console.log(error.stack);
  }
};

exports.createHostel = async (req, res) => {
  const { name, no_of_rooms, no_of_students } = req.body;
  try {
    const createhostel = await pool.query(
      "INSERT INTO hostel(hosel_name,no_of_rooms,no_of_students) VALUES($1,$2,$3)",
      [name, no_of_rooms, no_of_students]
    );
    if (createhostel.rowCount == 1) {
      res.send("Inserted Successfully in Hostel Database");
    }
  } catch (error) {
    console.log(error);
  }
};

// ***********************************************************************************************
//Furniture Controllers

exports.getAllFurniture = async (req, res) => {
  try {
    const allfurnitures = await pool.query(
      `SELECT furniture_id,furniture_type FROM furniture`
    );
    res.send(allfurnitures.rows);
    console.log("Sent All Furnitures");
  } catch (error) {
    console.log(error);
  }
};

exports.addFurniture = async (req, res) => {
  const { furniture_type } = req.body;
  try {
    console.log(furniture_type);
    const addfurniture = await pool.query(
      `INSERT INTO furniture(furniture_type) VALUES($1)`,
      [furniture_type]
    );
    res.send(addfurniture);
  } catch (error) {
    console.log(error);
  }
};

// ***********************************************************************************************
//Visitor Routes

exports.getAllVisitors = async (req, res) => {
  try {
    const getallvisitors = await pool.query(
      `SELECT visitor_name,in_time,out_time FROM visitor`
    );
    res.send(getallvisitors.rows);
  } catch (error) {
    console.log(error);
  }
};

exports.addVisitors = async (req, res) => {
  const { visitor_name, in_time, out_time } = req.body;
  try {
    const addvisitor = await pool.query(
      `INSERT INTO visitor(visitor_name,in_time,out_time) VALUES($1,$2,$3)`,
      [visitor_name, in_time, out_time]
    );
    res.send(addvisitor);
  } catch (error) {
    console.log(error);
  }
};

//*********************QUERIES*************************************************************

exports.getQueries = async (req, res) => {
  try {
    const queries = await pool.query("SELECT * FROM queries");
    res.send(queries.rows);
  } catch (error) {
    console.log(error);
  }
};
