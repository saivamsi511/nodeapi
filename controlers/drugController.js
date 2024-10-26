const Drug = require("../models/drugs")
const bcrypt = require("bcrypt")



const getAllDrugs = async(req,res) =>{
    try{
        let drugs =await Drug.find();
        if(drugs && drugs.length>0){
            return res.send(drugs).status(200);
        }else{
            return res.send({message:"No users"}).status(204);
        }
    }catch(err){
        return res.send(err).status(500);
    }
}


const getDrugByName = async(req,res) =>{
    let drugName = req.params.drugName;
    try{
        const drugs = Drug.findOne({drugName})
        if (!drugs){
            res.send({message:`No Drug with id: ${drugName}`}).status(404)
        }else{
            res.send(drugs).status(200)
        }
    }catch(err){
        return res.send(err).status(500);
    }
}



const deleteDrugById = async(req,res) =>{
    let id = req.params.id;
    try{
        const drugs =await  Drug.deleteOne({id})
        res.send({message:`Not found with username: ${id}`}).status(404)

    }catch(err){
        return res.send(err).status(500);
    }
}



const updateDrug = async(req,res) =>{
    let id = req.params.id;
    const body = req.body;
    try{
        const drugs = await Drug.findByIdAndUpdate(id,body, {new:true,runvalidators: true});
        if(drugs){
            res.send(user).status(202);
        }else{
            res.send({message:"Not found"}).status(404);
        }
    }catch(err){
        res.send(err).satus(500);
    }
}

const createDrug = async (req,res)=>{
    const body = req.body;
    try{
        const {drugName,location,dosage,drugType} = body;
        // const hashPassword =await bcrypt.hash(password,1);
        const drugs = new Drug({
            drugName:drugName,
            location:location,
            dosage:dosage,
            drugType:drugType
        });
        const result = await drugs.save();
        res.send(result).status(201);
    }catch(err){
        res.send(err).satus(500);
    }
}


module.exports ={
    getAllDrugs,
    getDrugByName,
    updateDrug,
    createDrug,
    deleteDrugById
}