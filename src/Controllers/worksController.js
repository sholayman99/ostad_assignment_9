const WorksModel = require("../Models/WorksModel");


//create works
exports.createWrok = async(req,res) =>{
    try {
       let reqBody = req.body;
       let email = req.headers.email ;
       reqBody.email = email;
       let result = await WroksModel.create(reqBody);
       res.status(201).json({"status":"success" , message:result}); 
    } catch (error) {
        res.status(400).json({"status":"Failed" , message:error});
    }
};


//finding work details for a specicic user
exports.findWrokDetails = async(req,res) =>{
    try {
        let email = req.headers.email ;
        let result = await WorksModel.find({ email:email});
        res.status(201).json({"status":"success" , message:result});
    } catch (error) {
        res.status(400).json({"status":"Failed" , message:error}); 
    }
};

//update work
exports.updateWorkDetails = async(req,res) =>{
    try {
        let id = req.params.id;
        let status = req.params.status;
        let reqBody = req.body ;
        reqBody.status = status;
        let result = await WorksModel.updateOne({_id:id},reqBody);
        res.status(200).json({"status":"success" , message:result});
    } catch (error) {
        res.status(400).json({"status":"Failed" , message:error});
    }
};

//remove work details
exports.removeWorkDetails = async(req,res) =>{
    try {
        let id = req.params.id;
        let result = await WorksModel.deleteOne({_id:id});
        res.status(200).json({"status":"success" , message:result});
    } catch (error) {
        res.status(400).json({"status":"Failed" , message:error}); 
    }
}