const express = require("express");
const connection = require("./DB_cannection");
const cors = require("cors");
const STUDENT_ROUTES = require("./Router/Student_Router");

const app = express();
const Db_URI =
  "mongodb+srv://shivampathak2100:F9oUD0VPNY356Cdf@cluster0.zbsnz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

connection(Db_URI)
  .then(() => console.log("DB CONNECTED ........"))
  .catch((e) => console.log("ERROR: ", e));


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    msg: "HELLO CODER! SERVER IS RUNNING FINE......",
  });
});


app.use("/api/student", STUDENT_ROUTES);

module.exports = app;
