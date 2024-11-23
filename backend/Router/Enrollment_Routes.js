const { Router } = require("express");
const router = Router();
const {createEnrollment,upload,getallpendingrequest,notificationcount} = require("../Controllers/Enrollemt")

router.post("/enroll", upload.single("ReciptImage"), createEnrollment);
router.get("/enroll_pending", getallpendingrequest);
router.get("/enroll_notificationcount", notificationcount);
module.exports = router;
