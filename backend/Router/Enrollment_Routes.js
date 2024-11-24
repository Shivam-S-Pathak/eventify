const { Router } = require("express");
const router = Router();
const {createEnrollment,
       upload,
       getallpendingrequest,
       notificationcount,
       accept_enroll } = require("../Controllers/Enrollemt")

router.post("/enroll", upload.single("ReciptImage"), createEnrollment);
router.get("/enroll_pending", getallpendingrequest);
router.get("/enroll_notificationcount", notificationcount);
router.patch("/accept_enroll_status/:id", accept_enroll);
router.patch("/decline_enroll_status/:id", decline_enroll);
module.exports = router;
