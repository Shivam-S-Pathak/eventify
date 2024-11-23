const { Router } = require("express");
const router = Router();
const {createEnrollment,upload,getallpendingrequest} = require("../Controllers/Enrollemt")

router.post("/enroll", upload.single("ReciptImage"), createEnrollment);
router.get("/enroll_pending", getallpendingrequest);

module.exports = router;
