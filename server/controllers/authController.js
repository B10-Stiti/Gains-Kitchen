import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      return res.status(400).json({
        code: "API.signup.Failed",
        message: "Passwords do not match",
      });
    }
    const check_user = await User.findOne({ email: email });
    if (check_user) {
      return res.status(400).json({
        code: "API.signup.Failed",
        message: "User Already Exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    if (user) {
      return res.status(201).json({
        code: "API.signup.success",
        message: "user added successfully",
        data: {
          user: user,
        },
      });
    } else {
      return res.status(400).json({ message: "Failed to add User" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during Register" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const check_user = await User.findOne({ email: email });
    if (!check_user) {
      return res.status(400).json({
        code: "API.Login.Failed",
        message: "Invalid User",
      });
    }
    if (await bcrypt.compare(password, check_user.password)) {
      res.json({
        code: "API.login.success",
        message: "user logged successFully",
        data: {
          user: check_user,
        },
      });
    } else {
      return res.status(400).json({
        code: "API.Login.Failed",
        message: "Wrong Password",
      });
    }
  } catch {
    res.status(500).json({ message: "Error during login" });
  }
};
