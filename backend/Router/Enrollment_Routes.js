const { Router } = require("express");
const router = Router();
const {createEnrollment,upload} = require("../Controllers/Enrollemt")

router.post("/enroll", upload.single("ReciptImage"), createEnrollment);
// router.get("/event/show", getAllEvents);

module.exports = router;
