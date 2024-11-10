const { Router } = require("express");
const router = Router();
const {Adminsignin,Adminsignup}= require("../Controllers/Admin.js")


router.post("/admin/signup",Adminsignup);
router.post("/admin/signin",Adminsignin);


module.exports = router;
