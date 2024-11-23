const Students = require("../Schema/Student.js"); // Student model
const cloudinary = require("../config/Cloudinary_config.js");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const sendmail = require("../Services/Email_Sending.js");
const Enrollment = require("../Schema/Enrollment.js");

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Receipt_image", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed image formats
  },
});

// Multer middleware for handling file uploads
const upload = multer({ storage });

const createEnrollment = async (req, res) => {
  try {
    // Validate required fields
    
    const { EventName, email, createdBy, status = 'pending',Ticket_No=0} = req.body;

    

    if (!EventName || !email || !createdBy) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Check if the student exists
    const student = await Students.findById(createdBy);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Handle file upload (assumes multer middleware processed the file)
    const result = await cloudinary.uploader.upload(req.file.path);
    
    // if (!receiptImage) {
    //   return res.status(400).json({ message: "Receipt image is required" });
    // }

    // Create a new enrollment document
    const newEnrollment = new Enrollment({
      EventName,
      email,
      status,
      ReciptImage: result.secure_url,
      createdBy,
      Ticket_No
    });

    // Save the enrollment to the database
    const savedEnrollment = await newEnrollment.save();
    await sendmail(email)

    res.status(201).json({
      message: "Enrollment created successfully",
      enrollment: savedEnrollment,
    });
  } catch (error) {
    console.error("Error creating enrollment:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getallpendingrequest= async(req,res)=>{
 
  try {
    
    const data=await Enrollment.find({status:"pending"})
    res.status(200).json({ data });
  } catch (error) {
    res
    .status(500)
    .json({ message: "Error fetching enrollment", error: error.message });
  }
}

const notificationcount=async (req,res)=>{
  try {
    
    const data=await Enrollment.find({status:"pending"})
    const notification_Count=data.length
    res.status(200).json({ count:notification_Count});
  } catch (error) {
    res
    .status(500)
    .json({ message: "Error fetching enrollment", error: error.message });
  }
}



module.exports = { createEnrollment, upload ,getallpendingrequest,notificationcount};
