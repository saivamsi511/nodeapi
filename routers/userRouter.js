const express  = require("express");
const { getAllUsers, createUser, updateUser, getUserById ,deleteUserById,login} = require("../controlers/userController");
const router = express.Router();
const { verifyToken } = require("../validators/validators")


router.get("/:name",getUserById);
router.post("/singup",createUser);
router.put("/:id",updateUser);
router.delete("/:email",deleteUserById);
router.get("/",verifyToken,getAllUsers);
router.post("/login",login)


module.exports = router;