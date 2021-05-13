const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

//MiddleWares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

//Routes
const studentRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

app.use("/", studentRoutes);
app.use("/", adminRoutes);

console.log(process.env.PORT);
const MPORT = 8000;
app.listen(MPORT, () => {
  console.log(`RUNNING ON PORT ${MPORT}`);
});
