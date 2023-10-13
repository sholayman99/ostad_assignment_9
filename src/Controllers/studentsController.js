const StudentsModel = require("../Models/StudentsModel");
const jwt = require("jsonwebtoken")

//create a new Student Profile
exports.createStudent = async(req,res) =>{
    try {
       let reqBody = req.body;
       let result = await StudentsModel.create(reqBody);
       res.status(201).json({"status":"success" , message:result});

    } catch (error) {
        res.status(400).json({"status":"Failed" , message:error});
    }
};

//logining in and creating jwt token
exports.studentLogin = async(req,res) =>{
    try {
       let reqBody = req.body ;
       let email = reqBody.email
       let result = await StudentsModel.find(reqBody).count();
       if(result === 1){
        let payLoad = {exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), data:email} ;
        let token = jwt.sign(payLoad,"secret1234");
        res.status(200).json({status:"Successfully Logged In" , message:token});
       } 
    } catch (error) {
        res.status(400).json({status:"Failed to Logged In" , message:error});
    }
};

//updating a student profile
exports.updateStudentProfile = async(req,res) =>{
    try {
     let email = req.headers.email ;
     let reqBody = req.body ;
     let result = await StudentsModel.updateOne({email:email},reqBody);
     res.status(200).json({status:"Successfully Logged In" , message:result});

    } catch (error) {
        res.status(400).json({"status":"Failed" , message:error});
    }
};

//finding a student's details
exports.studentDetails = async(req,res) =>{
   try {
    let email = req.headers.email ;
    let result = await StudentsModel.findOne({email: email})
    res.status(200).json({status:"Successfull" , message:result});
   } catch (error) {
    res.status(400).json({"status":"Failed" , message:error});
   }
};
 
//Remove a student Profile
exports.removeStudentProfile = async(req,res) =>{
    try {
       let id = req.params.id;
       let result = await StudentsModel.deleteOne({_id:id}); 
       res.status(200).json({status:"Successfull" , message:result});
    } catch (error) {
        res.status(400).json({"status":"Failed" , message:error}); 
    }
}

