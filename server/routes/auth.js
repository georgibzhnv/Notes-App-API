import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.post("/register", async (req, resp) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return resp
        .status(401)
        .json({ success: false, message: "User already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return resp
      .status(200)
      .json({ success: true, message: "Account Created Successfully" });
  } catch (error) {
    console.log(error.message);
    return resp
      .status(500)
      .json({ success: false, message: "Error in adding user " });
  }
});

router.post("/login", async (req, resp) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return resp
        .status(401)
        .json({ success: false, message: "User does not exist" });
    }

    const checkpassword = await bcrypt.compare(password, user.password);

    if (!checkpassword) {
      return resp
        .status(401)
        .json({ success: false, message: "Wrong Credentials" });
    }

    const token = jwt.sign({ id: user._id }, "secretkeyofnoteapp123@#", {
      expiresIn: "5h",
    });

    return resp.status(200).json({
      success: true,
      token,
      user: { name: user.name },
      message: "Logged in Successfully",
    });
  } catch (error) {
    return resp
      .status(500)
      .json({ success: false, message: "Error in login server" });
  }
});

router.get("/verify", middleware, async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

export default router;
