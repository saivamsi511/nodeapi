const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config();

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    if (users && users.length > 0) {
      return res.send(users).status(200);
    } else {
      return res.send({ message: "No users" }).status(204);
    }
  } catch (err) {
    return res.send(err).status(500);
  }
};

const getUserById = async (req, res) => {
  let name = req.params.name;
  try {
    const user = User.findOne({ username });
    if (!user) {
      res.send({ message: `Deleted successfully: ${username}` }).status(404);
    } else {
      res.send(user).status(200);
    }
  } catch (err) {
    return res.send(err).status(500);
  }
};

const deleteUserById = async (req, res) => {
  let email = req.params.email;
  try {
    const user = await User.deleteOne({ email });
    res.send({ message: `Not found with username: ${email}` }).status(404);
  } catch (err) {
    return res.send(err).status(500);
  }
};

const updateUser = async (req, res) => {
  let id = req.params.id;
  const body = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, body, {
      new: true,
      runvalidators: true,
    });
    if (user) {
      res.send(user).status(202);
    } else {
      res.send({ message: "Not found" }).status(404);
    }
  } catch (err) {
    res.send(err).satus(500);
  }
};

const createUser = async (req, res) => {
  const body = req.body;
  try {
    const { username, password, email } = body;
    const hashPassword = await bcrypt.hash(password, 1);
    const user = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    const result = await user.save();
    res.send(result).status(201);
  } catch (err) {
    res.send(err).satus(500);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    delete user.password;
    delete user._id;
    delete user.__v;
    delete user.createdAt;
    if (isMatch) {
        const token  = await jwt.sign({user},process.env.SECRET_KEY,{expiresIn:'1h',algorithm:'HS512'})
      res.send({
        email:user.email,
        username:user.username,
        token:token,
        message:"Login is successful",
        status:'200'
      }).status(200);
    } else {
      res.send({
        message:
          "Invalid credantials enter by the user please enter correct details",
      });
    }
  } catch (err) {
    res.send(err).status(500);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUserById,
  login
};
