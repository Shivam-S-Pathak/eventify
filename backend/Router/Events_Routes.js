const { Router } = require("express");
const router = Router();
const {upload,createEvent,getAllEvents} = require("../Controllers/Events")

router.post("/event/create", upload.single('image'), createEvent);
router.get("/event/show", getAllEvents);



module.exports = router;