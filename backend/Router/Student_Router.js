const {Router} = require('express')
const {studentsignup,studentlogin}=require("../Controllers/Student.js")
const router = Router()

router.post('/signup',studentsignup)
router.post('/signin',studentlogin)




module.exports=router