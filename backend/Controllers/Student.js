// THIS FILE CONTROLLERS THE STUDENTS API ROUTES
const Student = require("../Schema/Student");
const alertmail=require("../Services/alertmail.js")
const bcrypt = require("bcryptjs");
const Enrollment = require("../Schema/Enrollment.js")
const jwt = require("jsonwebtoken");
JWT_SECRET = "SAIT@MAJORPROJECT";

const studentsignup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const newStud = new Student({
      fullname,
      email,
      password,
    });
    await newStud.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const studentlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const sosmail=async(req,res)=>{
  try {
    const {msg}=req.body
    const stud = await Student.find()

    // console.log(msg)
    // console.log(typeof(stud));
    const emailIds = stud.map((e)=>e.email)
    // console.log(emailIds);
    for (let i = 0; i < emailIds.length; i++) {
      
      // console.log(emailIds[i],msg);
      await alertmail(emailIds[i],msg)
      
    }
    
    res.status(200).json({"MSG":"MAIL DELIVERED TO ALL THE USER SUCESSFULLY"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

const generateIdCard=async(req,res)=>{
  try {
    const {tokenNumber} = req.body
    
    const Idcard= await Enrollment.find({Ticket_No:tokenNumber}).populate("createdBy")
    
    
    if ((Idcard.length>0)){
      res.status(200).send({"msg":"sucess",Idcard})
    }
    else{
      res.status(404).send({"msg":"INVALID TOKEN NUMBER"})
    }
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Server error","e":error });
  }
}
module.exports = {
  studentsignup,
  studentlogin,
  sosmail,
  generateIdCard
};
