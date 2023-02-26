import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

export const addUser = async (req, res) => {
  const user = new User(req.body);
  try {
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json("Email not valid");
    }
    const user = await User.findOne({ username: req.body.username });
    const email = await User.findOne({ email: req.body.email });
    const pass = req.body.password;
    if (user) {
      return res
        .status(400)
        .json(`Username ${req.body.username} all ready in use!`);
    }
    if (email) {
      return res.status(400).json(`Email ${req.body.email} all ready in use!`);
    }
    if (pass !== req.body.confirmPassword) {
      return res.status(400).json("Confirm password not match!");
    }
    if (pass.length < 6) {
      return res.status(400).json("Password must +6 character");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    const savedUser = await newUser.save();
    const { password, ...otherDetails } = savedUser._doc;
    res.status(200).send({ details: { ...otherDetails } });
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
      { _id: 1, email: 1, phone: 1, img: 1, username: 1, role: 1, createdAt: 1 }
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
export const userStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },

      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
