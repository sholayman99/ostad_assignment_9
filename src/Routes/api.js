const express = require('express');
const { createStudent, studentLogin, updateStudentProfile, studentDetails, removeStudentProfile } = require('../Controllers/studentsController');
const AuthVerifyMiddleware = require('../Middlewares/AuthVerifyMiddleware');
const router = express.Router();


//students request
router.post("/createStudent" , createStudent);
router.post("/login" , studentLogin);
router.put("/updateProfile" , AuthVerifyMiddleware , updateStudentProfile);
router.get("/getDetails" , AuthVerifyMiddleware , studentDetails);
router.delete("/removeStudent/:id" , AuthVerifyMiddleware , removeStudentProfile)


module.exports = router