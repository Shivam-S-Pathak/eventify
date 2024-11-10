const express = require("express");
const connection = require("./DB_cannection");
const cors = require("cors");
require("dotenv").config();
const STUDENT_ROUTES = require("./Router/Student_Router");

const app = express();
const PORT = process.env.PORT || 8005;

connection(process.env.DB_URL)
  .then(() => console.log("DB CONNECTED ........"))
  .catch((e) => console.log("ERROR: ", e));
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    msg: "HEELO CODER DO NOT WORRY SERVER IS RUNNING FINE......",
  });
});
app.use("/", STUDENT_ROUTES);
app.listen(PORT, () => {
  console.log("SERVOR IS UP AT PORT NUMBER 8005");
});
