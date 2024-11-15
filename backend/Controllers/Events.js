const Event = require("../Schema/Events");
const cloudinary = require("../config/Cloudinary_config.js");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Events", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

const createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path);

    const newEvent = new Event({
      title,
      description,
      date,
      imageLink: result.secure_url, // Cloudinary link
    });

    await newEvent.save();

    res
      .status(200)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from the database
    res.status(200).json({ events });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};

module.exports = { createEvent, upload, getAllEvents };
