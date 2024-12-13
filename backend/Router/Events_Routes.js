const { Router } = require("express");
const router = Router();
const {
  upload,
  createEvent,
  getAllEvents,
  closeevent,
  allParticipents,
} = require("../Controllers/Events.js");

router.post("/event/create", upload.single("image"), createEvent);
router.get("/event/show", getAllEvents);
router.patch("/event/close/:id", closeevent);
router.post("/participent-data", allParticipents);

module.exports = router;
