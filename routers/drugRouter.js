const express  = require("express");
const { getAllDrugs, getDrugByName, updateDrug, createDrug ,deleteDrugById} = require("../controlers/drugController");
const router = express.Router();


router.get("/:name",getDrugByName);
router.post("/",createDrug);
router.put("/:id",updateDrug);
router.delete("/:email",deleteDrugById);
router.get("/",getAllDrugs);


module.exports = router;