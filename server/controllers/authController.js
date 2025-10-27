import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createAndSetToken from "../utils/createAndSetToken.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      return res.status(400).json({
        code: "API.signup.Failed",
        message: "Passwords do not match !",
      });
    }
    const check_user = await User.findOne({ email: email });
    if (check_user) {
      return res.status(400).json({
        code: "API.signup.Failed",
        message: "Email already used !",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    if (user) {
      createAndSetToken(user._id, res);
      return res.status(201).json({
        code: "API.signup.success",
        message: "user added successfully",
        data: {
          userId: user._id,
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
      createAndSetToken(check_user._id, res);
      res.json({
        code: "API.login.success",
        message: "user logged successFully",
        data: {
          userId: check_user._id,
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

export const getCurrentUserId = (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Not authorized" });
      res.json({
        code: "API.me.success",
        message: "user is logged in",
        userId: req.userId,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    expires: new Date(0),
  });
  return res.json({
    code: "API.logout.success",
    message: "User logged out successfully",
  });
};
