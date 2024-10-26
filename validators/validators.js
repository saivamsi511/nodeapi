
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();



const  verifyToken =async (req,res,next) => {
    let token = req.headers['authorization']?.split(" ")[1];
    const isverified = await jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
    if(err) res.status(401).json({message:"Invaalid Token"})
    else{
        req.user = user
        next();
    }
})
};

module.exports ={
    verifyToken
}