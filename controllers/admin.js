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

//******************************************* */ Allot*****************************************

// **************************************Roooms**********************************************

// exports.createRoom = async (req, res) => {
//   const hostel_id = req.body;
//   try {
//     switch (hostel_id) {
//       case 1:
//         const currentRoom1 = await pool.query(
//           `SELECT room_id FROM room WHERE hostel_id = 1`
//         );
//         const roomNo1 = currentRoom1 + 1;
//         const makeRoom1 = await pool.query(
//           `INSERT INTO(hostel_id,room_id) VALUES(1,$1)`,
//           [roomNo]
//         );
//         res.send(makeRoom1);
//         const updateRooms1 = await pool.query(
//           `UPDATE hostel SET no_of_rooms = no_of_rooms-1 WHERE hostel_id = $1`,
//           [hostel_id]
//         );

//         break;
//       case 2:
//         const currentRoom2 = await pool.query(
//           `SELECT room_id FROM room WHERE hostel_id = 2`
//         );
//         const roomNo2 = currentRoom2 + 1;
//         const makeRoom = await pool.query(
//           `INSERT INTO(hostel_id,room_id) VALUES(2,$1)`,
//           [roomNo]
//         );
//         const updateRooms = await pool.query(
//           `UPDATE hostel SET no_of_rooms = no_of_rooms-1 WHERE hostel_id = $1`,
//           [hostel_id]
//         );

//         res.send(makeRoom);
//         break;
//       case 3:
//         const currentRoom = await pool.query(
//           `SELECT room_id FROM room WHERE hostel_id = 3`
//         );
//         const roomNo = currentRoom + 1;
//         const makeRoom = await pool.query(
//           `INSERT INTO(hostel_id,room_id) VALUES(3,$1)`,
//           [roomNo]
//         );
//         res.send(makeRoom);
//         const updateRooms = await pool.query(
//           `UPDATE hostel SET no_of_rooms = no_of_rooms-1 WHERE hostel_id = $1`,
//           [hostel_id]
//         );

//         break;
//       case 4:
//         const currentRoom = await pool.query(
//           `SELECT room_id FROM room WHERE hostel_id = 4`
//         );
//         const roomNo = currentRoom + 1;
//         const makeRoom = await pool.query(
//           `INSERT INTO(hostel_id,room_id) VALUES(4,$1)`,
//           [roomNo]
//         );
//         const updateRooms = await pool.query(
//           `UPDATE hostel SET no_of_rooms = no_of_rooms-1 WHERE hostel_id = $1`,
//           [hostel_id]
//         );
//         res.send(makeRoom);
//         break;
//       case 5:
//         const currentRoom = await pool.query(
//           `SELECT room_id FROM room WHERE hostel_id = 5`
//         );
//         const roomNo = currentRoom + 1;
//         const makeRoom = await pool.query(
//           `INSERT INTO(hostel_id,room_id) VALUES(5,$1)`,
//           [roomNo]
//         );
//         res.send(makeRoom);
//         const updateRooms = await pool.query(
//           `UPDATE hostel SET no_of_rooms = no_of_rooms-1 WHERE hostel_id = $1`,
//           [hostel_id]
//         );

//         break;
//       default:
//         res.send("Wrong Hostel ID");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.createMyRoom = async (req, res) => {
  const { hostel_id, phone } = req.body;
  console.log(phone);
  try {
    const id = Number(hostel_id);
    const getcurrentRoom = await pool.query(
      `SELECT MAX(room_id) FROM room WHERE hostel_id = $1`,
      [id]
    );
    const incrementRoomNo = getcurrentRoom.rows[0].max + 1;
    const makeRoom = await pool.query(
      `INSERT INTO room(hostel_id,room_id) VALUES($1,$2)`,
      [id, incrementRoomNo]
    );

    const updateRooms = await pool.query(
      `UPDATE hostel SET no_of_rooms = no_of_rooms-1 WHERE hostel_id = $1`,
      [id]
    );

    console.log("INFORMATION", id, incrementRoomNo, phone);

    const student = await pool.query(
      "SELECT * FROM STUDENT where mob_no = $1",
      [phone]
    );
    console.log(student);
    const updateStudent = await pool.query(
      `UPDATE student SET hostel_id = $1,room_id = $2 WHERE mob_no = $3 `,
      [id, incrementRoomNo, phone]
    );
    res.send(updateStudent);
  } catch (error) {
    console.log(error);
  }
};

exports.getRoom = async (req, res) => {
  try {
    const rooms = pool.query(`SELECT * FROM room`);
  } catch (error) {
    console.log(error);
  }
};
