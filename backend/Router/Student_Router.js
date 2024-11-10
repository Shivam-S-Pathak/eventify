const { Router } = require("express");
const { studentsignup, studentlogin } = require("../Controllers/Student.js");
const router = Router();

router.post("/student/signup", studentsignup);
router.post("/student/signin", studentlogin);

module.exports = router;