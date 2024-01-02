import userModel from "../Modals/UserModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, role, password } = req.body.userData;
    if ((!name || !email || !role, !password)) {
      return res
        .status(404)
        .json({ success: false, message: "Fill all fields" });
    }
    const isEmailExist = await userModel.find({ email: email });
    if (isEmailExist.length) {
      return res
        .status(404)
        .json({ success: false, message: "Email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      role,
      password: hashPassword,
    });
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "User registeration successfull" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body.userData;
    if (!email || !password) {
      return res
        .status(404)
        .json({ success: false, message: "Fill all fields" });
    }
    const logUSer = await userModel.findOne({ email: email });
    if (!logUSer)
      return res.json({ success: false, message: "User not Found" });
    const isPasswordCorrect = await bcrypt.compare(password, logUSer.password);
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "Enter correct password" });
    }
    const token = jwt.sign({ userId: logUSer._id }, process.env.JWT_SECRET);
    const userObject = {
      name: logUSer.name,
      email: logUSer.email,
      role: logUSer.role,
      token: token,
      id: logUSer._id,
    };
    return res
      .status(200)
      .json({
        success: true,
        message: "Logged in Successfully",
        userObject: userObject,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { token } = req.body;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedData) {
      return res
        .status(404)
        .json({ success: false, message: "Token not valid" });
    }
    const userId = decodedData.userId;
    const loggedUser = await userModel.findOne({ _id: userId });
    const userDetails = {
      name: loggedUser.name,
      email: loggedUser.email,
      role: loggedUser.role,
      id: loggedUser._id,
    };
    return res.status(200).json({ success: true, user: userDetails });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};