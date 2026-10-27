import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"

async function registerUser(req, res) {
      const { username, email, password } = req.body;


   // Creates a document that is saved in mongodb
  const user = await userModel.create({
  username, email, password,
  })

  const token = jwt.sign({
    id: user._id
  }, process.env.JWT_SECRET)

  res.cookie("token", token)

  res.status(201).json({
    message: "User registered successfully",
    user,

  })
}

export default {registerUser};
