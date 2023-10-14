const StudentsModel = require("../Models/StudentsModel");
const OtpModel = require("../Models/OtpModel")
const jwt = require("jsonwebtoken");
const sendEmailHelper = require("../Helpers/sendEmailHelper");

//create a new Student Profile
exports.createStudent = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await StudentsModel.create(reqBody);
    res.status(201).json({ status: "success", message: result });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error });
  }
};

//logining in and creating jwt token
exports.studentLogin = async (req, res) => {
  try {
    let reqBody = req.body;
    let email = reqBody.email;
    let result = await StudentsModel.find(reqBody).count();
    if (result === 1) {
      let payLoad = {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        data: email,
      };
      let token = jwt.sign(payLoad, "secret1234");
      res
        .status(200)
        .json({ status: "Successfully Logged In", message: token });
    }
  } catch (error) {
    res.status(400).json({ status: "Failed to Logged In", message: error });
  }
};

//updating a student profile
exports.updateStudentProfile = async (req, res) => {
  try {
    let email = req.headers.email;
    let reqBody = req.body;
    let result = await StudentsModel.updateOne({ email: email }, reqBody);
    res.status(200).json({ status: "Successfully Logged In", message: result });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error });
  }
};

//finding a student's details
exports.studentDetails = async (req, res) => {
  try {
    let email = req.headers.email;
    let result = await StudentsModel.findOne({ email: email });
    res.status(200).json({ status: "Successfull", message: result });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error });
  }
};

//Remove a student Profile
exports.removeStudentProfile = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await StudentsModel.deleteOne({ _id: id });
    res.status(200).json({ status: "Successfull", message: result });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error });
  }
};

//create OTP and send it To Email Address
exports.createOtpforPasswordReset = async (req, res) => {
  try {
    let email = req.params.email;
    let otpCode = Math.floor(100000 + Math.random() * 900000);
    let EmailText = "Your OTP Code for Reset Password is:" + " " + otpCode;
    let EmailSubject = "Otp for Reset Password";
    let result = await StudentsModel.find({ email: email }).count();

    if (result === 1) {
      await sendEmailHelper(email,EmailText, EmailSubject);
      await OtpModel.create({email:email , otp:otpCode});
      res.status(200).json({ status: "Successfull Sent", message:"6 digit Otp code has been sent" });
    }else{
        res.status(400).json({ status: "Failed", message: "Failed to sent" });
    }
  } catch (error) {
    res.status(400).json({ status: "Fail", message: error });
  }
};

//verify Otp
exports.verifyOtp = async(req,res) =>{
    let email = req.params.email;
    let otp = req.params.otp;
    let status= 0;
    let updatedStatus=1 ;
    try {
        let result = await OtpModel.find({email:email,status:status,otp:otp}).count();
        if(result === 1){
            await OtpModel.updateOne({email:email,status:status,otp:otp},{status:updatedStatus});
            res.status(200).json({ status: "Successfull", message:"Otp verified successfully" });
        }
    } catch (error) {
        res.status(400).json({ status: "Fail", message: error });
    }
}

//set a new password 
exports.setPassword = async(req,res) =>{
   let email = req.body.email ;
   let newPass = req.body.password ;
   let otp= req.body.otp;
   let updatedStatus=1
   try {
    let result = await OtpModel.find({ email:email , status:updatedStatus, otp:otp}).count();
    if(result === 1){
        await StudentsModel.updateOne({email:email},{password:newPass});
        res.status(200).json({ status: "Successfull", message:"New Password has been set" });
    }
   } catch (error) {
    res.status(400).json({ status: "Fail", message: error });
   }
}
