import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const addUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const response = await user.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateUser = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, salt);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("User not found");

    const { password, ...otherDetails } = user._doc;
    res.status(200).json({ otherDetails });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { _id: 1, email: 1, phone: 1, img: 1, username: 1 }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
};
