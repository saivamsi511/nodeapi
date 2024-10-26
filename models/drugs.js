const mongoose = require("mongoose")


const drugsSchema = new mongoose.Schema({
    drugName:{type:String,required:true},
    location:{type:String,required:true},
    dosage:{type:String,required:true},
    drugType:{type:String,required:true},
    createdDate :{type:Date,default:Date.now()}
})


const Drug = mongoose.model("drugs",drugsSchema)

module.exports= Drug