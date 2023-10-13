const jwt = require("jsonwebtoken") ;

const AuthVerifyMiddleware = async(req,res,next) =>{
   let token = req.headers.token ;
   jwt.verify(token,"secret1234",(err,decoded)=>{
    if(err){
        console.log(token);
        res.status(403).json({status:"UnAuthorized Access" , message:err});
    }else{
        let email = decoded.data;
        req.headers.email = email
        next();
    }
   })
};

module.exports = AuthVerifyMiddleware ;