const { Router } = require("express");
const router = Router();
const { Adminsignin, Adminsignup } = require("../Controllers/Admin.js");

router.post("/organiser/signup", Adminsignup);
router.post("/organiser/singin", Adminsignin);

module.exports = router;
