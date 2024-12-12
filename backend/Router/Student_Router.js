const { Router } = require("express");
const { studentsignup, studentlogin ,sosmail,generateIdCard} = require("../Controllers/Student.js");
const router = Router();

router.post("/student/signup", studentsignup);
router.post("/student/signin", studentlogin);
router.post("/student/sendsosmail", sosmail);
router.post("/student/generateIdCard", generateIdCard);



// router.post("/organiser/signup", organiserSignup);
// router.post("/organiser/signin", organiserLogin);

module.exports = router;
