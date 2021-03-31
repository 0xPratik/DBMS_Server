const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");

const PORT = process.env.PORT || 8000;

//MiddleWares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const app = express();

app.get("/", (req, res) => {
  res.send("Waiting for Yogesh Kumar");
});

app.listen(PORT, () => {
  console.log(`App is Runing on PORT ${PORT}`);
});
